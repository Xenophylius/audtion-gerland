import { NextComponentType, NextPageContext } from "next";
import Head from "next/head";

import { Form } from "../../components/customer/Form";

const Page: NextComponentType<NextPageContext> = () => (
  <div>
    <div>
      <Head>
        <title>Create Customer</title>
      </Head>
    </div>
    <Form />
  </div>
);

export default Page;
