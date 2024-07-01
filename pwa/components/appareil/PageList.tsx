import { NextComponentType, NextPageContext } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { useQuery } from "react-query";

import Pagination from "../common/Pagination";
import { List } from "./List";
import { PagedCollection } from "../../types/collection";
import { Appareil } from "../../types/Appareil";
import { fetch, FetchResponse, parsePage } from "../../utils/dataAccess";
import { useMercure } from "../../utils/mercure";

export const getAppareilsPath = (page?: string | string[] | undefined) =>
  `/appareils${typeof page === "string" ? `?page=${page}` : ""}`;
export const getAppareils =
  (page?: string | string[] | undefined) => async () =>
    await fetch<PagedCollection<Appareil>>(getAppareilsPath(page));
const getPagePath = (path: string) =>
  `/appareils/page/${parsePage("appareils", path)}`;

export const PageList: NextComponentType<NextPageContext> = () => {
  const {
    query: { page },
  } = useRouter();
  const { data: { data: appareils, hubURL } = { hubURL: null } } = useQuery<
    FetchResponse<PagedCollection<Appareil>> | undefined
  >(getAppareilsPath(page), getAppareils(page));
  const collection = useMercure(appareils, hubURL);

  if (!collection || !collection["hydra:member"]) return null;

  return (
    <div>
      <div>
        <Head>
          <title>Appareil List</title>
        </Head>
      </div>
      <List appareils={collection["hydra:member"]} />
      <Pagination collection={collection} getPagePath={getPagePath} />
    </div>
  );
};
