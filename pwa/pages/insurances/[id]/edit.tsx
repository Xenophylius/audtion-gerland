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

import { Form } from "../../../components/insurance/Form";
import { PagedCollection } from "../../../types/collection";
import { Insurance } from "../../../types/Insurance";
import { fetch, FetchResponse, getItemPaths } from "../../../utils/dataAccess";

const getInsurance = async (id: string | string[] | undefined) =>
  id ? await fetch<Insurance>(`/insurances/${id}`) : Promise.resolve(undefined);

const Page: NextComponentType<NextPageContext> = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: { data: insurance } = {} } = useQuery<
    FetchResponse<Insurance> | undefined
  >(["insurance", id], () => getInsurance(id));

  if (!insurance) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <div>
      <div>
        <Head>
          <title>{insurance && `Edit Insurance ${insurance["@id"]}`}</title>
        </Head>
      </div>
      <Form insurance={insurance} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({
  params: { id } = {},
}) => {
  if (!id) throw new Error("id not in query param");
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["insurance", id], () => getInsurance(id));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch<PagedCollection<Insurance>>("/insurances");
  const paths = await getItemPaths(
    response,
    "insurances",
    "/insurances/[id]/edit"
  );

  return {
    paths,
    fallback: true,
  };
};

export default Page;
