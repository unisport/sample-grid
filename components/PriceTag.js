import { Badge, HStack, Text } from "@chakra-ui/react";

const PriceTag = ({ prices }) => {
  if (prices.discount_percentage > 0) {
    return (
      <>
        <HStack spacing={2}>
          <Text fontWeight="bold" letterSpacing="wider">
            DKK
          </Text>
          <Text as="s" fontWeight="bold" letterSpacing="wider" color="gray.400">
            {prices.recommended_retail_price.toFixed(2)}
          </Text>
          <Text fontWeight="bold" letterSpacing="wider">
            {Math.floor(
              prices.recommended_retail_price -
                (prices.recommended_retail_price * prices.discount_percentage) /
                  100
            ).toFixed(2)}
          </Text>
        </HStack>
        <Badge variant="outline" colorScheme="green">
          Tilbud
        </Badge>
      </>
    );
  } else {
    return (
      <Text fontWeight="bold" letterSpacing="wider">
        DKK {prices.recommended_retail_price.toFixed(2)}
      </Text>
    );
  }
};

export default PriceTag;
