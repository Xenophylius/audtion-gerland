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

import { Show } from "../../../components/customer/Show";
import { PagedCollection } from "../../../types/collection";
import { Customer } from "../../../types/Customer";
import { fetch, FetchResponse, getItemPaths } from "../../../utils/dataAccess";
import { useMercure } from "../../../utils/mercure";

const getCustomer = async (id: string | string[] | undefined) =>
  id ? await fetch<Customer>(`/customers/${id}`) : Promise.resolve(undefined);

const Page: NextComponentType<NextPageContext> = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: { data: customer, hubURL, text } = { hubURL: null, text: "" },
  } = useQuery<FetchResponse<Customer> | undefined>(["customer", id], () =>
    getCustomer(id)
  );
  const customerData = useMercure(customer, hubURL);

  if (!customerData) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <div>
      <div>
        <Head>
          <title>{`Show Customer ${customerData["@id"]}`}</title>
        </Head>
      </div>
      <Show customer={customerData} text={text} />
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
  const paths = await getItemPaths(response, "customers", "/customers/[id]");

  return {
    paths,
    fallback: true,
  };
};

export default Page;
