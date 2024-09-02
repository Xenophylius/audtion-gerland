import { NextComponentType, NextPageContext } from "next";
import Head from "next/head";

import { Form } from "../../components/paiement/Form";

const Page: NextComponentType<NextPageContext> = () => (
  <div>
    <div>
      <Head>
        <title>Create Paiement</title>
      </Head>
    </div>
    <Form />
  </div>
);

export default Page;
