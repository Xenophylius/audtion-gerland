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

import { Form } from "../../../components/order/Form";
import { PagedCollection } from "../../../types/collection";
import { Order } from "../../../types/Order";
import { fetch, FetchResponse, getItemPaths } from "../../../utils/dataAccess";

const getOrder = async (id: string | string[] | undefined) =>
  id ? await fetch<Order>(`/orders/${id}`) : Promise.resolve(undefined);

const Page: NextComponentType<NextPageContext> = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: { data: order } = {} } = useQuery<
    FetchResponse<Order> | undefined
  >(["order", id], () => getOrder(id));

  if (!order) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <div>
      <div>
        <Head>
          <title>{order && `Edit Order ${order["@id"]}`}</title>
        </Head>
      </div>
      <Form order={order} />
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
  const paths = await getItemPaths(response, "orders", "/orders/[id]/edit");

  return {
    paths,
    fallback: true,
  };
};

export default Page;
