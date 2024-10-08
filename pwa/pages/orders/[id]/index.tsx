import {
  GetStaticPaths,
  GetStaticProps,
  NextComponentType,
  NextPageContext,
} from "next";
import DefaultErrorPage from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";
import { dehydrate, QueryClient, useQuery } from "react-query";

import { Show } from "../../../components/order/Show";
import { PagedCollection } from "../../../types/collection";
import { Order } from "../../../types/Order";
import { fetch, FetchResponse, getItemPaths } from "../../../utils/dataAccess";
import { useMercure } from "../../../utils/mercure";

const getOrder = async (id: string | string[] | undefined) =>
  id ? await fetch<Order>(`/orders/${id}`) : Promise.resolve(undefined);

const Page: NextComponentType<NextPageContext> = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: { data: order, hubURL, text } = { hubURL: null, text: "" } } =
    useQuery<FetchResponse<Order> | undefined>(["order", id], () =>
      getOrder(id)
    );
  const orderData = useMercure(order, hubURL);

  if (!orderData) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <div>
      <div>
        <Head>
          <title>{`Show Order ${orderData["@id"]}`}</title>
        </Head>
      </div>
      <Show order={orderData} text={text} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({
  params: { id } = {},
}) => {
  if (!id) throw new Error("id not in query param");
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["order", id], () => getOrder(id));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch<PagedCollection<Order>>("/orders");
  const paths = await getItemPaths(response, "orders", "/orders/[id]");

  return {
    paths,
    fallback: true,
  };
};

export default Page;
