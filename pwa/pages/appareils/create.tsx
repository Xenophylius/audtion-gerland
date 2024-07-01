import { NextComponentType, NextPageContext } from "next";
import Head from "next/head";

import { Form } from "../../components/appareil/Form";

const Page: NextComponentType<NextPageContext> = () => (
  <div>
    <div>
      <Head>
        <title>Create Appareil</title>
      </Head>
    </div>
    <Form />
  </div>
);

export default Page;
