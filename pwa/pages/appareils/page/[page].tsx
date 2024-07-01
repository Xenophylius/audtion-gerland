import { GetStaticPaths, GetStaticProps } from "next";
import { dehydrate, QueryClient } from "react-query";

import {
  PageList,
  getAppareils,
  getAppareilsPath,
} from "../../../components/appareil/PageList";
import { PagedCollection } from "../../../types/collection";
import { Appareil } from "../../../types/Appareil";
import { fetch, getCollectionPaths } from "../../../utils/dataAccess";

export const getStaticProps: GetStaticProps = async ({
  params: { page } = {},
}) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(getAppareilsPath(page), getAppareils(page));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch<PagedCollection<Appareil>>("/appareils");
  const paths = await getCollectionPaths(
    response,
    "appareils",
    "/appareils/page/[page]"
  );

  return {
    paths,
    fallback: true,
  };
};

export default PageList;
