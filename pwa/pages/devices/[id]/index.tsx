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

import { Show } from "../../../components/device/Show";
import { PagedCollection } from "../../../types/collection";
import { Device } from "../../../types/Device";
import { fetch, FetchResponse, getItemPaths } from "../../../utils/dataAccess";
import { useMercure } from "../../../utils/mercure";

const getDevice = async (id: string | string[] | undefined) =>
  id ? await fetch<Device>(`/devices/${id}`) : Promise.resolve(undefined);

const Page: NextComponentType<NextPageContext> = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: { data: device, hubURL, text } = { hubURL: null, text: "" } } =
    useQuery<FetchResponse<Device> | undefined>(["device", id], () =>
      getDevice(id)
    );
  const deviceData = useMercure(device, hubURL);

  if (!deviceData) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <div>
      <div>
        <Head>
          <title>{`Show Device ${deviceData["@id"]}`}</title>
        </Head>
      </div>
      <Show device={deviceData} text={text} />
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
  const paths = await getItemPaths(response, "devices", "/devices/[id]");

  return {
    paths,
    fallback: true,
  };
};

export default Page;
