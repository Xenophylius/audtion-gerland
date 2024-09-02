import { GetStaticPaths, GetStaticProps } from "next";
import { dehydrate, QueryClient } from "react-query";

import {
  PageList,
  getDevices,
  getDevicesPath,
} from "../../../components/device/PageList";
import { PagedCollection } from "../../../types/collection";
import { Device } from "../../../types/Device";
import { fetch, getCollectionPaths } from "../../../utils/dataAccess";

export const getStaticProps: GetStaticProps = async ({
  params: { page } = {},
}) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(getDevicesPath(page), getDevices(page));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch<PagedCollection<Device>>("/devices");
  const paths = await getCollectionPaths(
    response,
    "devices",
    "/devices/page/[page]"
  );

  return {
    paths,
    fallback: true,
  };
};

export default PageList;
