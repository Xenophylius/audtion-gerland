import { NextComponentType, NextPageContext } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { useQuery } from "react-query";

import Pagination from "../common/Pagination";
import { List } from "./List";
import { PagedCollection } from "../../types/collection";
import { Paiement } from "../../types/Paiement";
import { fetch, FetchResponse, parsePage } from "../../utils/dataAccess";
import { useMercure } from "../../utils/mercure";

export const getPaiementsPath = (page?: string | string[] | undefined) =>
  `/paiements${typeof page === "string" ? `?page=${page}` : ""}`;
export const getPaiements =
  (page?: string | string[] | undefined) => async () =>
    await fetch<PagedCollection<Paiement>>(getPaiementsPath(page));
const getPagePath = (path: string) =>
  `/paiements/page/${parsePage("paiements", path)}`;

export const PageList: NextComponentType<NextPageContext> = () => {
  const {
    query: { page },
  } = useRouter();
  const { data: { data: paiements, hubURL } = { hubURL: null } } = useQuery<
    FetchResponse<PagedCollection<Paiement>> | undefined
  >(getPaiementsPath(page), getPaiements(page));
  const collection = useMercure(paiements, hubURL);

  if (!collection || !collection["hydra:member"]) return null;

  return (
    <div>
      <div>
        <Head>
          <title>Paiement List</title>
        </Head>
      </div>
      <List paiements={collection["hydra:member"]} />
      <Pagination collection={collection} getPagePath={getPagePath} />
    </div>
  );
};
