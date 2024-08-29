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

import { Form } from "../../../components/customer/Form";
import { PagedCollection } from "../../../types/collection";
import { Customer } from "../../../types/Customer";
import { fetch, FetchResponse, getItemPaths } from "../../../utils/dataAccess";

const getCustomer = async (id: string | string[] | undefined) =>
  id ? await fetch<Customer>(`/customers/${id}`) : Promise.resolve(undefined);

const Page: NextComponentType<NextPageContext> = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: { data: customer } = {} } = useQuery<
    FetchResponse<Customer> | undefined
  >(["customer", id], () => getCustomer(id));

  if (!customer) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <div>
      <div>
        <Head>
          <title>{customer && `Edit Customer ${customer["@id"]}`}</title>
        </Head>
      </div>
      <Form customer={customer} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({
  params: { id } = {},
}) => {
  if (!id) throw new Error("id not in query param");
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["customer", id], () => getCustomer(id));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch<PagedCollection<Customer>>("/customers");
  const paths = await getItemPaths(
    response,
    "customers",
    "/customers/[id]/edit"
  );

  return {
    paths,
    fallback: true,
  };
};

export default Page;
