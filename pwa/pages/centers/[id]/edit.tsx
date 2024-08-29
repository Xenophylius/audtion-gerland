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

import { Form } from "../../../components/center/Form";
import { PagedCollection } from "../../../types/collection";
import { Center } from "../../../types/Center";
import { fetch, FetchResponse, getItemPaths } from "../../../utils/dataAccess";

const getCenter = async (id: string | string[] | undefined) =>
  id ? await fetch<Center>(`/centers/${id}`) : Promise.resolve(undefined);

const Page: NextComponentType<NextPageContext> = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: { data: center } = {} } = useQuery<
    FetchResponse<Center> | undefined
  >(["center", id], () => getCenter(id));

  if (!center) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <div>
      <div>
        <Head>
          <title>{center && `Edit Center ${center["@id"]}`}</title>
        </Head>
      </div>
      <Form center={center} />
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
  const paths = await getItemPaths(response, "centers", "/centers/[id]/edit");

  return {
    paths,
    fallback: true,
  };
};

export default Page;
