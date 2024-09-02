import { GetStaticPaths, GetStaticProps } from "next";
import { dehydrate, QueryClient } from "react-query";

import {
  PageList,
  getCenters,
  getCentersPath,
} from "../../../components/center/PageList";
import { PagedCollection } from "../../../types/collection";
import { Center } from "../../../types/Center";
import { fetch, getCollectionPaths } from "../../../utils/dataAccess";

export const getStaticProps: GetStaticProps = async ({
  params: { page } = {},
}) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(getCentersPath(page), getCenters(page));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch<PagedCollection<Center>>("/centers");
  const paths = await getCollectionPaths(
    response,
    "centers",
    "/centers/page/[page]"
  );

  return {
    paths,
    fallback: true,
  };
};

export default PageList;
