const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const InvoiceModal = require('../Models/invoice');
const MerchantModal = require('../Models/merchant');
const CustomerModal = require('../Models/customer');
const OrderModal = require('../Models/order');
const User = require('../Models/user');
const RefundModal = require('../Models/refunds')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {});
    console.log(`MongoDB Connected:`);
    // await updateDb();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Function to update the rating field for all merchants
const updateDb = async () => {
  try {

   //const res = await RefundModal.collection.getIndexes();

// const newPassword = '12345';  
// const newpass =await bcrypt.hash(newPassword, 10);
// const result = await User.updateOne({email: "test@test.com"}, { $set: { userName: "Super Admin" } });
    const result = await OrderModal.updateMany({}, { $set: { 
      isOrderUpdated: false
    } }); 
    console.log(`All updated with.`, result.modifiedCount);
  } catch (error) {
    console.error(`Error updating invoice: ${error.message}`);
  }
};

module.exports = connectDB;
