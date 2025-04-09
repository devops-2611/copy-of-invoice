const IdGenerator = require('../Models/idGenerator');
const EmailLog = require('../Models/emailLogs');
const MerchantModal = require('../Models/merchant');
const OrderModal = require('../Models/order');
const moment = require('moment-timezone');
const merchant = require('../Models/merchant');
const timeZone = 'Europe/London';

const getNextId = async (name, start = 1) => {
  const counter = await IdGenerator.findOneAndUpdate(
    { name },                            // Find the counter by name (e.g., "customerId")
    { $inc: { seq: 1 } },                // Increment the sequence
    { new: true, upsert: true }          // Create the counter if it doesn't exist
  );

  // If the counter was newly created, initialize the sequence to the start value
  if (counter.seq < start) {
    counter.seq = start;
    await counter.save();
  }

  return counter.seq;
};

const updateEmailLog = async (logId, updates) => {
  await EmailLog.findByIdAndUpdate(logId, {
    ...updates,
    updatedAt: moment.tz(timeZone).toDate()
  });
};

const merchantCache = new Map();
const getMerchant = async (merchantId) => {
  if (merchantCache.has(merchantId)) return merchantCache.get(merchantId);
  const parsedMerchantId = [merchantId, Number(merchantId)];
  const merchantData = await MerchantModal.findOne({ merchantId: { $in: parsedMerchantId } });
  merchantCache.set(merchantId, merchantData);
  return merchantData;
};

const calculateOrderValue = async (order, merchantDetails) => {

  if (!order.isOrderUpdated && order.orderValue !== undefined) {
    return order.orderValue;
  }

  let orderValue = order.subTotal;

  // Deduct order discount first (common for all types)
  if (order.orderDiscount) {
    orderValue -= order.orderDiscount;
  }
  if (order.promoDiscountMerchant) {
    orderValue -= order.promoDiscountMerchant;
  }
  if (order.promoDiscountSwishr) {
    orderValue -= order.promoDiscountSwishr;
  }
  // If specific merchant, use their settings
  if (merchantDetails) {
    if (merchantDetails.serviceFeeApplicable && order.serviceFee) {
      orderValue += order.serviceFee;
    } else if (!merchantDetails.serviceFeeApplicable && order.paymentType?.toUpperCase() === 'CASH' && order.serviceFee) {
      orderValue += order.serviceFee;
    }

    if (merchantDetails.isInHouseType && order.deliveryCharge) {
      orderValue += order.deliveryCharge;
    } else if (!merchantDetails.isInHouseType && order.deliveryChargeApplicable && order.deliveryCharge) {
      orderValue += order.deliveryCharge;
    }

  } else {
    // If no specific merchant, fetch merchant details for this order
    const orderMerchant = await getMerchant(order.merchantId);
    if (orderMerchant.serviceFeeApplicable && order.serviceFee) {
      orderValue += order.serviceFee;
    } else if (!orderMerchant.serviceFeeApplicable && order.paymentType.toUpperCase() === 'CASH' && order.serviceFee) {
      orderValue += order.serviceFee;
    }

    if (orderMerchant.isInHouseType && order.deliveryCharge) {
      orderValue += order.deliveryCharge;
    } else if (!orderMerchant.isInHouseType && order.deliveryChargeApplicable && order.deliveryCharge) {
      orderValue += order.deliveryCharge;
    }
  }
  const calculatedValue = Number(orderValue?.toFixed(2));
  await OrderModal.findByIdAndUpdate(order._id, {
    orderValue: calculatedValue,
    isOrderUpdated: false
  });

  return calculatedValue;
};

const calculateNetCommission = async (order, merchantDetails, orderType) => {
  if (!order.isOrderUpdated && order.netCommission !== undefined) {
    return order.netCommission;
  }

  let netSubTotal = order.subTotal;
  let commissionRate = 0;

  if (order.orderDiscount) {
    netSubTotal -= order.orderDiscount;
  }
  if (order.promoDiscountMerchant) {
    netSubTotal -= order.promoDiscountMerchant;
  }
  if (order.promoDiscountSwishr) {
    netSubTotal -= order.promoDiscountSwishr;
  }
  // If specific merchant, use their settings
  if (merchantDetails) {

    if (merchantDetails.isInHouseType && order.deliveryCharge) {
      netSubTotal += order.deliveryCharge;
    } else if (!merchantDetails.isInHouseType && order.deliveryChargeApplicable && order.deliveryCharge) {
      netSubTotal += order.deliveryCharge;
    }

    if (orderType === 'delivery') {
      commissionRate = merchantDetails.deliveryOrdersComission
    } else if (orderType === 'collection') {
      commissionRate = merchantDetails.collectionOrdersComission
    }

  } else {
    // If no specific merchant, fetch merchant details for this order
    const orderMerchant = await getMerchant(order.merchantId);
    if (orderMerchant.isInHouseType && order.deliveryCharge) {
      netSubTotal += order.deliveryCharge;
    } else if (!orderMerchant.isInHouseType && order.deliveryChargeApplicable && order.deliveryCharge) {
      netSubTotal += order.deliveryCharge;
    }

    if (orderType === 'delivery') {
      commissionRate = orderMerchant.deliveryOrdersComission
    } else if (orderType === 'collection') {
      commissionRate = orderMerchant.collectionOrdersComission
    }

  }

  const commission = (netSubTotal * commissionRate) / 100
  const calculatedValue = Number(commission.toFixed(2));

  await OrderModal.findByIdAndUpdate(order._id, {
    netCommission: calculatedValue,
    isOrderUpdated: false
  });

  return calculatedValue;

};

const calculateServiceFeeCommission = async (order, merchantDetails, orderType) => {
  if (!order.isOrderUpdated && order.netServiceFee !== undefined) {
    return order.netServiceFee;
  }

  let serviceFee = 0;

  if (merchantDetails) {
    if (merchantDetails.serviceFeeApplicable && order.serviceFee) {
      serviceFee = order.serviceFee
    } else if (!merchantDetails.serviceFeeApplicable && order.paymentType.toUpperCase() !== 'CASH' && order.serviceFee) {
      serviceFee = (order.serviceFee)/1.2
    } else if (!merchantDetails.serviceFeeApplicable && order.paymentType.toUpperCase() === 'CASH' && order.serviceFee){
      serviceFee = order.serviceFee
    }
    
  } else {
    const orderMerchant = await getMerchant(order.merchantId);
    if (orderMerchant.serviceFeeApplicable && order.serviceFee) {
      serviceFee = order.serviceFee
    } else if (!orderMerchant.serviceFeeApplicable && order.paymentType.toUpperCase() !== 'CASH' && order.serviceFee) {
      serviceFee = (order.serviceFee)/1.2
    } else if (!orderMerchant.serviceFeeApplicable && order.paymentType.toUpperCase() === 'CASH' && order.serviceFee){
      serviceFee = order.serviceFee
    }
  }

  const netService = Number(serviceFee.toFixed(2));
  await OrderModal.findByIdAndUpdate(order._id, {
    netServiceFee: netService,
    isOrderUpdated: false
  });

  return netService;

}

const calculateDeliveryFeeCommission = async (order, merchantDetails, orderType) => {
  if (!order.isOrderUpdated && order.netDeliveryCharge !== undefined) {
    return order.netDeliveryCharge;
  }

  let deliveryFee = 0;

  if (merchantDetails) {
    if (!merchantDetails.isInHouseType && merchantDetails.deliveryFeeApplicable && order.deliveryCharge) {
      deliveryFee = order.deliveryCharge

    } else if (!merchantDetails.isInHouseType && !merchantDetails.deliveryFeeApplicable && order.paymentType.toUpperCase() !== 'CASH' && order.deliveryCharge) {
      deliveryFee = (order.deliveryCharge)/1.2
    } else if (!merchantDetails.isInHouseType && !merchantDetails.deliveryFeeApplicable && order.paymentType.toUpperCase() === 'CASH' && order.deliveryCharge){
      deliveryFee = order.deliveryCharge
    } 
    
  } else {
    const orderMerchant = await getMerchant(order.merchantId);
    if (!orderMerchant.isInHouseType && orderMerchant.deliveryFeeApplicable && order.deliveryCharge) {
      deliveryFee = order.deliveryCharge
    } else if (!orderMerchant.isInHouseType && !orderMerchant.deliveryFeeApplicable && order.paymentType.toUpperCase() !== 'CASH' && order.deliveryCharge) {
      deliveryFee = (order.deliveryCharge)/1.2
    } else if (!orderMerchant.isInHouseType && !orderMerchant.deliveryFeeApplicable && order.paymentType.toUpperCase() === 'CASH' && order.deliveryCharge){
      deliveryFee = order.deliveryCharge
    }
  }

  const netDeliveryFee = Number(deliveryFee.toFixed(2));
  await OrderModal.findByIdAndUpdate(order._id, {
    netDeliveryCharge: netDeliveryFee,
    isOrderUpdated: false
  });

  return netDeliveryFee;
}

module.exports = { getNextId, updateEmailLog, calculateOrderValue, calculateNetCommission, calculateServiceFeeCommission, calculateDeliveryFeeCommission };
