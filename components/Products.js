import { Box, Grid } from "@chakra-ui/react";
import useSWR from "swr";
import ProductCard from "./ProductCard";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Products = () => {
  const { data } = useSWR("/api/products", fetcher);

  /**
   * We sort the products based on the Discount Percentage. The lowest discount at the top.
   */
  data.sort(
    (a, b) =>
      parseFloat(a.prices.discount_percentage) -
      parseFloat(b.prices.discount_percentage)
  );

  return (
    <Box as="section">
      <Grid
        templateColumns={[
          "1fr",
          "repeat(2, 1fr)",
          "repeat(3, 1fr)",
          "repeat(4, 1fr)",
        ]}
        gap={4}
      >
        {data.map((product) => (
          <ProductCard product={product} key={product.pid} />
        ))}
      </Grid>
    </Box>
  );
};

export default Products;
