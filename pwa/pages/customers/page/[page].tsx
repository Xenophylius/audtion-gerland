import { GetStaticPaths, GetStaticProps } from "next";
import { dehydrate, QueryClient } from "react-query";

import {
  PageList,
  getCustomers,
  getCustomersPath,
} from "../../../components/customer/PageList";
import { PagedCollection } from "../../../types/collection";
import { Customer } from "../../../types/Customer";
import { fetch, getCollectionPaths } from "../../../utils/dataAccess";

export const getStaticProps: GetStaticProps = async ({
  params: { page } = {},
}) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(getCustomersPath(page), getCustomers(page));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch<PagedCollection<Customer>>("/customers");
  const paths = await getCollectionPaths(
    response,
    "customers",
    "/customers/page/[page]"
  );

  return {
    paths,
    fallback: true,
  };
};

export default PageList;
