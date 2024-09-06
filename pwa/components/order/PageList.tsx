import { NextComponentType, NextPageContext } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { useQuery } from "react-query";

import Pagination from "../common/Pagination";
import { List } from "./List";
import { PagedCollection } from "../../types/collection";
import { Order } from "../../types/Order";
import { fetch, FetchResponse, parsePage } from "../../utils/dataAccess";
import { useMercure } from "../../utils/mercure";

export const getOrdersPath = (page?: string | string[] | undefined) =>
  `/orders${typeof page === "string" ? `?page=${page}` : ""}`;
export const getOrders = (page?: string | string[] | undefined) => async () =>
  await fetch<PagedCollection<Order>>(getOrdersPath(page));
const getPagePath = (path: string) =>
  `/orders/page/${parsePage("orders", path)}`;

export const PageList: NextComponentType<NextPageContext> = () => {
  const {
    query: { page },
  } = useRouter();
  const { data: { data: orders, hubURL } = { hubURL: null } } = useQuery<
    FetchResponse<PagedCollection<Order>> | undefined
  >(getOrdersPath(page), getOrders(page));
  const collection = useMercure(orders, hubURL);

  if (!collection || !collection["hydra:member"]) return null;

  return (
    <div>
      <div>
        <Head>
          <title>Liste des ventes</title>
        </Head>
      </div>
      <List orders={collection["hydra:member"]} />
      <Pagination collection={collection} getPagePath={getPagePath} />
    </div>
  );
};
