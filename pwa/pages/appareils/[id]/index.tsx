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

import { Show } from "../../../components/appareil/Show";
import { PagedCollection } from "../../../types/collection";
import { Appareil } from "../../../types/Appareil";
import { fetch, FetchResponse, getItemPaths } from "../../../utils/dataAccess";
import { useMercure } from "../../../utils/mercure";

const getAppareil = async (id: string | string[] | undefined) =>
  id ? await fetch<Appareil>(`/appareils/${id}`) : Promise.resolve(undefined);

const Page: NextComponentType<NextPageContext> = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: { data: appareil, hubURL, text } = { hubURL: null, text: "" },
  } = useQuery<FetchResponse<Appareil> | undefined>(["appareil", id], () =>
    getAppareil(id)
  );
  const appareilData = useMercure(appareil, hubURL);

  if (!appareilData) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <div>
      <div>
        <Head>
          <title>{`Show Appareil ${appareilData["@id"]}`}</title>
        </Head>
      </div>
      <Show appareil={appareilData} text={text} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({
  params: { id } = {},
}) => {
  if (!id) throw new Error("id not in query param");
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["appareil", id], () => getAppareil(id));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch<PagedCollection<Appareil>>("/appareils");
  const paths = await getItemPaths(response, "appareils", "/appareils/[id]");

  return {
    paths,
    fallback: true,
  };
};

export default Page;
