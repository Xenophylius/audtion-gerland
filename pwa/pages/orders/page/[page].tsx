import { GetStaticPaths, GetStaticProps } from "next";
import { dehydrate, QueryClient } from "react-query";

import {
  PageList,
  getOrders,
  getOrdersPath,
} from "../../../components/order/PageList";
import { PagedCollection } from "../../../types/collection";
import { Order } from "../../../types/Order";
import { fetch, getCollectionPaths } from "../../../utils/dataAccess";

export const getStaticProps: GetStaticProps = async ({
  params: { page } = {},
}) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(getOrdersPath(page), getOrders(page));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch<PagedCollection<Order>>("/orders");
  const paths = await getCollectionPaths(
    response,
    "orders",
    "/orders/page/[page]"
  );

  return {
    paths,
    fallback: true,
  };
};

export default PageList;
