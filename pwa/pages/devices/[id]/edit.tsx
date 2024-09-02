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

import { Form } from "../../../components/device/Form";
import { PagedCollection } from "../../../types/collection";
import { Device } from "../../../types/Device";
import { fetch, FetchResponse, getItemPaths } from "../../../utils/dataAccess";

const getDevice = async (id: string | string[] | undefined) =>
  id ? await fetch<Device>(`/devices/${id}`) : Promise.resolve(undefined);

const Page: NextComponentType<NextPageContext> = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: { data: device } = {} } = useQuery<
    FetchResponse<Device> | undefined
  >(["device", id], () => getDevice(id));

  if (!device) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <div>
      <div>
        <Head>
          <title>{device && `Edit Device ${device["@id"]}`}</title>
        </Head>
      </div>
      <Form device={device} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({
  params: { id } = {},
}) => {
  if (!id) throw new Error("id not in query param");
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["device", id], () => getDevice(id));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch<PagedCollection<Device>>("/devices");
  const paths = await getItemPaths(response, "devices", "/devices/[id]/edit");

  return {
    paths,
    fallback: true,
  };
};

export default Page;
