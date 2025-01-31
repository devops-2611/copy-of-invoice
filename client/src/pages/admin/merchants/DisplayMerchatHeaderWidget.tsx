import { Badge, Container, Divider, Group, Text } from "@mantine/core";
import { useParams } from "react-router-dom";
import { useGetMerchantDetailsbyId } from "./hooks/useGetMerchantDetailsbyId";
export function DisplayMerchatHeaderWidget() {
  const { merchantId } = useParams();

  const { data, error, isLoading, isFetching } = useGetMerchantDetailsbyId(
    merchantId.toString() ?? "",
  );

  if (!merchantId) {
    return (
      <Container size="lg" mt={30} className="fallback-ui">
        <Text size="xl" fw={500}>
          Merchant ID is not provided in the URL.
        </Text>
      </Container>
    );
  }

  return (
    <>
      <Group>
        <Badge size="lg" variant="dot">
          Merchant ID : {merchantId}
        </Badge>
        <Badge size="lg">{data?.data?.merchant?.merchantName}</Badge>
      </Group>
      <Divider mb={"md"} mt={"md"} />
    </>
  );
}
