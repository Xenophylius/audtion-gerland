import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

import ReferenceLinks from "../common/ReferenceLinks";
import { fetch, getItemPath } from "../../utils/dataAccess";
import { Customer } from "../../types/Customer";

interface Props {
  customer: Customer;
  text: string;
}

export const Show: FunctionComponent<Props> = ({ customer, text }) => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!customer["@id"]) return;
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(customer["@id"], { method: "DELETE" });
      router.push("/customers");
    } catch (error) {
      setError("Error when deleting the resource.");
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <Head>
        <title>{`Show Customer ${customer["@id"]}`}</title>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </Head>
      <Link
        href="/customers"
        className="text-sm text-cyan-500 font-bold hover:text-cyan-700"
      >
        {"< Back to list"}
      </Link>
      <h1 className="text-3xl mb-2">{`Show Customer ${customer["@id"]}`}</h1>
      <table
        cellPadding={10}
        className="shadow-md table border-collapse min-w-full leading-normal table-auto text-left my-3"
      >
        <thead className="w-full text-xs uppercase font-light text-gray-700 bg-gray-200 py-2 px-4">
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody className="text-sm divide-y divide-gray-200">
          <tr>
            <th scope="row">firstname</th>
            <td>{customer["firstname"]}</td>
          </tr>
          <tr>
            <th scope="row">lastname</th>
            <td>{customer["lastname"]}</td>
          </tr>
          <tr>
            <th scope="row">birth</th>
            <td>{customer["birth"]?.toLocaleString()}</td>
          </tr>
          <tr>
            <th scope="row">sex</th>
            <td>{customer["sex"]}</td>
          </tr>
          <tr>
            <th scope="row">city</th>
            <td>{customer["city"]}</td>
          </tr>
          <tr>
            <th scope="row">id_user</th>
            <td>
              <ReferenceLinks
                items={{
                  href: getItemPath(customer.id_user["@id"], "/users/[id]"),
                  name: customer.id_user["firstname"],
                }}
              />
            </td>
          </tr>
          <tr>
            <th scope="row">id_center</th>
            <td>
              <ReferenceLinks
                items={{
                  href: getItemPath(customer.id_center["@id"], "/centers/[id]"),
                  name: customer.id_center["name"],
                }}
              />
            </td>
          </tr>
        </tbody>
      </table>
      {error && (
        <div
          className="border px-4 py-3 my-4 rounded text-red-700 border-red-400 bg-red-100"
          role="alert"
        >
          {error}
        </div>
      )}
      <div className="flex space-x-2 mt-4 items-center justify-end">
        <Link
          href={getItemPath(customer["@id"], "/customers/[id]/edit")}
          className="inline-block mt-2 border-2 border-cyan-500 bg-cyan-500 hover:border-cyan-700 hover:bg-cyan-700 text-xs text-white font-bold py-2 px-4 rounded"
        >
          Edit
        </Link>
        <button
          className="inline-block mt-2 border-2 border-red-400 hover:border-red-700 hover:text-red-700 text-xs text-red-400 font-bold py-2 px-4 rounded"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};
