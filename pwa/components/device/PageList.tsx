import { NextComponentType, NextPageContext } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { useQuery } from "react-query";

import Pagination from "../common/Pagination";
import { List } from "./List";
import { PagedCollection } from "../../types/collection";
import { Device } from "../../types/Device";
import { fetch, FetchResponse, parsePage } from "../../utils/dataAccess";
import { useMercure } from "../../utils/mercure";

export const getDevicesPath = (page?: string | string[] | undefined) =>
  `/devices${typeof page === "string" ? `?page=${page}` : ""}`;
export const getDevices = (page?: string | string[] | undefined) => async () =>
  await fetch<PagedCollection<Device>>(getDevicesPath(page));
const getPagePath = (path: string) =>
  `/devices/page/${parsePage("devices", path)}`;

export const PageList: NextComponentType<NextPageContext> = () => {
  const {
    query: { page },
  } = useRouter();
  const { data: { data: devices, hubURL } = { hubURL: null } } = useQuery<
    FetchResponse<PagedCollection<Device>> | undefined
  >(getDevicesPath(page), getDevices(page));
  const collection = useMercure(devices, hubURL);

  if (!collection || !collection["hydra:member"]) return null;

  return (
    <div>
      <div>
        <Head>
          <title>Liste des équipements</title>
        </Head>
      </div>
      <List devices={collection["hydra:member"]} />
      <Pagination collection={collection} getPagePath={getPagePath} />
    </div>
  );
};
