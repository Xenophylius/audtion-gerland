import { NextComponentType, NextPageContext } from "next";
import Head from "next/head";

import { Form } from "../../components/center/Form";

const Page: NextComponentType<NextPageContext> = () => (
  <div>
    <div>
      <Head>
        <title>Create Center</title>
      </Head>
    </div>
    <Form />
  </div>
);

export default Page;
