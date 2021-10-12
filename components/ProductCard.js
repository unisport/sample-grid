import { Box, Heading, LinkBox, LinkOverlay } from "@chakra-ui/react";
import Image from "next/image";
import PriceTag from "@/components/PriceTag";

const ProductCard = ({ product }) => {
  return (
    <LinkBox
      as="article"
      backgroundColor="white"
      borderWidth={1}
      borderRadius="md"
      borderColor="white"
      overflow="hidden"
      p={4}
      cursor="pointer"
      role="group"
      _hover={{
        borderColor: "green.500",
      }}
      transition=".15s"
    >
      <Image
        src={product.productImage}
        alt={product.name}
        width={600}
        height={600}
      />
      <LinkOverlay href={product.shopUrl} rel="noopener" isExternal>
        <Box my={4}>
          <Heading
            as="h3"
            color="gray.600"
            fontWeight="medium"
            fontSize="xs"
            letterSpacing="wide"
            textTransform="uppercase"
            isTruncated
          >
            {product.name}
          </Heading>
        </Box>
        <PriceTag prices={product.prices} />
      </LinkOverlay>
    </LinkBox>
  );
};

export default ProductCard;
