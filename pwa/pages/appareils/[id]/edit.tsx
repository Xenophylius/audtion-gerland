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

import { Form } from "../../../components/appareil/Form";
import { PagedCollection } from "../../../types/collection";
import { Appareil } from "../../../types/Appareil";
import { fetch, FetchResponse, getItemPaths } from "../../../utils/dataAccess";

const getAppareil = async (id: string | string[] | undefined) =>
  id ? await fetch<Appareil>(`/appareils/${id}`) : Promise.resolve(undefined);

const Page: NextComponentType<NextPageContext> = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: { data: appareil } = {} } = useQuery<
    FetchResponse<Appareil> | undefined
  >(["appareil", id], () => getAppareil(id));

  if (!appareil) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <div>
      <div>
        <Head>
          <title>{appareil && `Edit Appareil ${appareil["@id"]}`}</title>
        </Head>
      </div>
      <Form appareil={appareil} />
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
  const paths = await getItemPaths(
    response,
    "appareils",
    "/appareils/[id]/edit"
  );

  return {
    paths,
    fallback: true,
  };
};

export default Page;
