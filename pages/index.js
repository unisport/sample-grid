import Layout from "@/components/Layout";
import Products from "@/components/Products";
import { SWRConfig } from "swr";

const Index = ({ fallback }) => {
  return (
    <Layout>
      <SWRConfig value={{ fallback }}>
        <Products />
      </SWRConfig>
    </Layout>
  );
};

export default Index;

/**
 * We use getServerSideProps to pre-fetch the data from the API and use it as a fallback for SWR. This ensures a SEO friendly site.
 * See: https://swr.vercel.app/docs/with-nextjs
 */
export const getServerSideProps = async () => {
  const results = await fetch(process.env.SITE_URL + "/api/products/");
  const data = await results.json();

  return {
    props: {
      fallback: {
        "/api/products": data,
      },
    },
  };
};
