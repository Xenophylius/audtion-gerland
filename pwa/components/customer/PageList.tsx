import { NextComponentType, NextPageContext } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { useQuery } from "react-query";

import Pagination from "../common/Pagination";
import { List } from "./List";
import { PagedCollection } from "../../types/collection";
import { Customer } from "../../types/Customer";
import { fetch, FetchResponse, parsePage } from "../../utils/dataAccess";
import { useMercure } from "../../utils/mercure";

export const getCustomersPath = (page?: string | string[] | undefined) =>
  `/customers${typeof page === "string" ? `?page=${page}` : ""}`;
export const getCustomers =
  (page?: string | string[] | undefined) => async () =>
    await fetch<PagedCollection<Customer>>(getCustomersPath(page));
const getPagePath = (path: string) =>
  `/customers/page/${parsePage("customers", path)}`;

export const PageList: NextComponentType<NextPageContext> = () => {
  const {
    query: { page },
  } = useRouter();
  const { data: { data: customers, hubURL } = { hubURL: null } } = useQuery<
    FetchResponse<PagedCollection<Customer>> | undefined
  >(getCustomersPath(page), getCustomers(page));
  const collection = useMercure(customers, hubURL);

  if (!collection || !collection["hydra:member"]) return null;

  return (
    <div>
      <div>
        <Head>
          <title>Liste des patients</title>
        </Head>
      </div>
      <List customers={collection["hydra:member"]} />
      <Pagination collection={collection} getPagePath={getPagePath} />
    </div>
  );
};
