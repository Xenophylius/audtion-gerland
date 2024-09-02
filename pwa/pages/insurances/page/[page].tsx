import { GetStaticPaths, GetStaticProps } from "next";
import { dehydrate, QueryClient } from "react-query";

import {
  PageList,
  getInsurances,
  getInsurancesPath,
} from "../../../components/insurance/PageList";
import { PagedCollection } from "../../../types/collection";
import { Insurance } from "../../../types/Insurance";
import { fetch, getCollectionPaths } from "../../../utils/dataAccess";

export const getStaticProps: GetStaticProps = async ({
  params: { page } = {},
}) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(getInsurancesPath(page), getInsurances(page));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch<PagedCollection<Insurance>>("/insurances");
  const paths = await getCollectionPaths(
    response,
    "insurances",
    "/insurances/page/[page]"
  );

  return {
    paths,
    fallback: true,
  };
};

export default PageList;
