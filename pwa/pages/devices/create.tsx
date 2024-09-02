import { NextComponentType, NextPageContext } from "next";
import Head from "next/head";

import { Form } from "../../components/device/Form";

const Page: NextComponentType<NextPageContext> = () => (
  <div>
    <div>
      <Head>
        <title>Create Device</title>
      </Head>
    </div>
    <Form />
  </div>
);

export default Page;
