import { NextComponentType, NextPageContext } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { useQuery } from "react-query";

import Pagination from "../common/Pagination";
import { List } from "./List";
import { PagedCollection } from "../../types/collection";
import { Center } from "../../types/Center";
import { fetch, FetchResponse, parsePage } from "../../utils/dataAccess";
import { useMercure } from "../../utils/mercure";

export const getCentersPath = (page?: string | string[] | undefined) =>
  `/centers${typeof page === "string" ? `?page=${page}` : ""}`;
export const getCenters = (page?: string | string[] | undefined) => async () =>
  await fetch<PagedCollection<Center>>(getCentersPath(page));
const getPagePath = (path: string) =>
  `/centers/page/${parsePage("centers", path)}`;

export const PageList: NextComponentType<NextPageContext> = () => {
  const {
    query: { page },
  } = useRouter();
  const { data: { data: centers, hubURL } = { hubURL: null } } = useQuery<
    FetchResponse<PagedCollection<Center>> | undefined
  >(getCentersPath(page), getCenters(page));
  const collection = useMercure(centers, hubURL);

  if (!collection || !collection["hydra:member"]) return null;

  return (
    <div>
      <div>
        <Head>
          <title>Liste des centres</title>
        </Head>
      </div>
      <List centers={collection["hydra:member"]} />
      <Pagination collection={collection} getPagePath={getPagePath} />
    </div>
  );
};
