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

import { Show } from "../../../components/center/Show";
import { PagedCollection } from "../../../types/collection";
import { Center } from "../../../types/Center";
import { fetch, FetchResponse, getItemPaths } from "../../../utils/dataAccess";
import { useMercure } from "../../../utils/mercure";

const getCenter = async (id: string | string[] | undefined) =>
  id ? await fetch<Center>(`/centers/${id}`) : Promise.resolve(undefined);

const Page: NextComponentType<NextPageContext> = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: { data: center, hubURL, text } = { hubURL: null, text: "" } } =
    useQuery<FetchResponse<Center> | undefined>(["center", id], () =>
      getCenter(id)
    );
  const centerData = useMercure(center, hubURL);

  if (!centerData) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <div>
      <div>
        <Head>
          <title>{`Show Center ${centerData["@id"]}`}</title>
        </Head>
      </div>
      <Show center={centerData} text={text} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({
  params: { id } = {},
}) => {
  if (!id) throw new Error("id not in query param");
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["center", id], () => getCenter(id));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch<PagedCollection<Center>>("/centers");
  const paths = await getItemPaths(response, "centers", "/centers/[id]");

  return {
    paths,
    fallback: true,
  };
};

export default Page;
