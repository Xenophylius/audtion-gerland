import { NextComponentType, NextPageContext } from "next";
import Head from "next/head";

import { Form } from "../../components/insurance/Form";

const Page: NextComponentType<NextPageContext> = () => (
  <div>
    <div>
      <Head>
        <title>Create Insurance</title>
      </Head>
    </div>
    <Form />
  </div>
);

export default Page;
