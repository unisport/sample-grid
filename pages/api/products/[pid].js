/**
 * We use Next.js API as an API Middleware. This ensures we return the correct JSON structure and only the required data.
 * See: https://nextjs.org/docs/api-routes/introduction
 * @example /api/products/200776,200777
 */
export default async (req, res) => {
  const { pid } = req.query;

  /**
   * We ensure that the request method is GET. If not we return a 405 HTTP Status Code.
   * See: https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
   */
  if (req.method === "GET") {
    fetch(process.env.API_ENDPOINT + pid)
      .then((response) => {
        if (!response.ok) {
          res.status(400).end();
          throw new Error("Fatal Error: Network Response Code was not OK.");
        }
        return response.json();
      })
      .then((result) => {
        /** We manipulate the result here using map() to create a new Array only containing the data we need. */
        const data = result.products.map((product) => ({
          pid: product.id,
          name: product.name,
          productImage: product.product_main_image,
          prices: product.prices,
          shopUrl: product.url,
        }));
        res.status(200).json(data);
      })
      .catch((error) => {
        res.status(400).end();
        console.error("Fatal Error: The fetch() operation has failed: ", error);
      });
  } else {
    res.status(405).end();
  }
};
