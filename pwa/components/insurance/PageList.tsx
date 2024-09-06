import { NextComponentType, NextPageContext } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { useQuery } from "react-query";

import Pagination from "../common/Pagination";
import { List } from "./List";
import { PagedCollection } from "../../types/collection";
import { Insurance } from "../../types/Insurance";
import { fetch, FetchResponse, parsePage } from "../../utils/dataAccess";
import { useMercure } from "../../utils/mercure";

export const getInsurancesPath = (page?: string | string[] | undefined) =>
  `/insurances${typeof page === "string" ? `?page=${page}` : ""}`;
export const getInsurances =
  (page?: string | string[] | undefined) => async () =>
    await fetch<PagedCollection<Insurance>>(getInsurancesPath(page));
const getPagePath = (path: string) =>
  `/insurances/page/${parsePage("insurances", path)}`;

export const PageList: NextComponentType<NextPageContext> = () => {
  const {
    query: { page },
  } = useRouter();
  const { data: { data: insurances, hubURL } = { hubURL: null } } = useQuery<
    FetchResponse<PagedCollection<Insurance>> | undefined
  >(getInsurancesPath(page), getInsurances(page));
  const collection = useMercure(insurances, hubURL);

  if (!collection || !collection["hydra:member"]) return null;

  return (
    <div>
      <div>
        <Head>
          <title>Liste des assurances</title>
        </Head>
      </div>
      <List insurances={collection["hydra:member"]} />
      <Pagination collection={collection} getPagePath={getPagePath} />
    </div>
  );
};
