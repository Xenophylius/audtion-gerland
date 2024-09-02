import { GetStaticPaths, GetStaticProps } from "next";
import { dehydrate, QueryClient } from "react-query";

import {
  PageList,
  getPaiements,
  getPaiementsPath,
} from "../../../components/paiement/PageList";
import { PagedCollection } from "../../../types/collection";
import { Paiement } from "../../../types/Paiement";
import { fetch, getCollectionPaths } from "../../../utils/dataAccess";

export const getStaticProps: GetStaticProps = async ({
  params: { page } = {},
}) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(getPaiementsPath(page), getPaiements(page));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch<PagedCollection<Paiement>>("/paiements");
  const paths = await getCollectionPaths(
    response,
    "paiements",
    "/paiements/page/[page]"
  );

  return {
    paths,
    fallback: true,
  };
};

export default PageList;
