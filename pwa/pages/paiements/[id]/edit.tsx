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

import { Form } from "../../../components/paiement/Form";
import { PagedCollection } from "../../../types/collection";
import { Paiement } from "../../../types/Paiement";
import { fetch, FetchResponse, getItemPaths } from "../../../utils/dataAccess";

const getPaiement = async (id: string | string[] | undefined) =>
  id ? await fetch<Paiement>(`/paiements/${id}`) : Promise.resolve(undefined);

const Page: NextComponentType<NextPageContext> = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: { data: paiement } = {} } = useQuery<
    FetchResponse<Paiement> | undefined
  >(["paiement", id], () => getPaiement(id));

  if (!paiement) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <div>
      <div>
        <Head>
          <title>{paiement && `Edit Paiement ${paiement["@id"]}`}</title>
        </Head>
      </div>
      <Form paiement={paiement} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({
  params: { id } = {},
}) => {
  if (!id) throw new Error("id not in query param");
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["paiement", id], () => getPaiement(id));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch<PagedCollection<Paiement>>("/paiements");
  const paths = await getItemPaths(
    response,
    "paiements",
    "/paiements/[id]/edit"
  );

  return {
    paths,
    fallback: true,
  };
};

export default Page;
