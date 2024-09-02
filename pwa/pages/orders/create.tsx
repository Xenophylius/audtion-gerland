import { NextComponentType, NextPageContext } from "next";
import Head from "next/head";

import { Form } from "../../components/order/Form";

const Page: NextComponentType<NextPageContext> = () => (
  <div>
    <div>
      <Head>
        <title>Create Order</title>
      </Head>
    </div>
    <Form />
  </div>
);

export default Page;
