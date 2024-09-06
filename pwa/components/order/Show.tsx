import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

import ReferenceLinks from "../common/ReferenceLinks";
import { fetch, getItemPath } from "../../utils/dataAccess";
import { Order } from "../../types/Order";

interface Props {
  order: Order;
  text: string;
}

export const Show: FunctionComponent<Props> = ({ order, text }) => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!order["@id"]) return;
    if (!window.confirm("Êtes vous sur de vouloir supprimer la vente ?")) return;

    try {
      await fetch(order["@id"], { method: "DELETE" });
      router.push("/orders");
    } catch (error) {
      setError("Erreur lors de la suppression de la vente.");
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <Head>
        <title>{`Fiche de ${order["id_customer"]["firstname"] + " " + order["id_customer"]["lastname"]}`}</title>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </Head>
      <Link
        href="/orders"
        className="text-sm text-cyan-500 font-bold hover:text-cyan-700"
      >
        {"< Retour à la liste des ventes"}
      </Link>
      <h1 className="text-3xl mb-2">{`Fiche de ${order["id_customer"]["firstname"] + " " + order["id_customer"]["lastname"]}`}</h1>
      <table
        cellPadding={10}
        className="shadow-md table border-collapse min-w-full leading-normal table-auto text-left my-3"
      >
        <thead className="w-full text-xs uppercase font-light text-gray-700 bg-gray-200 py-2 px-4">
          <tr>
            <th>Champ</th>
            <th>Valeur</th>
          </tr>
        </thead>
        <tbody className="text-sm divide-y divide-gray-200">
          <tr>
            <th scope="row">Paiement</th>
            <td>
              <ReferenceLinks
                items={{
                  href: getItemPath(
                    order["id_paiement"]["@id"],
                    "/paiements/[id]"
                  ),
                  name: order["id_paiement"]["@id"],
                }}
              />
            </td>
          </tr>
          <tr>
            <th scope="row">Patient</th>
            <td>
              <ReferenceLinks
                items={{
                  href: getItemPath(
                    order["id_customer"]["@id"],
                    "/customers/[id]"
                  ),
                  name: order["id_customer"]["firstname"],
                }}
              />
            </td>
          </tr>
          <tr>
            <th scope="row">Mutuelle</th>
            <td>{order["mutual"]}</td>
          </tr>
          <tr>
            <th scope="row">Audioprothésiste</th>
            <td>
              <ReferenceLinks
                items={{
                  href: getItemPath(
                    order["id_name_audio"]["@id"],
                    "/users/[id]"
                  ),
                  name: order["id_name_audio"]["firstname"],
                }}
              />
            </td>
          </tr>
          <tr>
            <th scope="row">Assurance</th>
            <td>
              <ReferenceLinks
                items={{
                  href: getItemPath(
                    order["id_insurance"]["@id"],
                    "/insurances/[id]"
                  ),
                  name: order["id_insurance"]["name"],
                }}
              />
            </td>
          </tr>
          <tr>
            <th scope="row">Centre de PEC</th>
            <td>
              <ReferenceLinks
                items={{
                  href: getItemPath(
                    order["id_center_pec"]["@id"],
                    "/centers/[id]"
                  ),
                  name: order["id_center_pec"]["name"],
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
          href={getItemPath(order["@id"], "/orders/[id]/edit")}
          className="inline-block mt-2 border-2 border-cyan-500 bg-cyan-500 hover:border-cyan-700 hover:bg-cyan-700 text-xs text-white font-bold py-2 px-4 rounded"
        >
          Modifier
        </Link>
        <button
          className="inline-block mt-2 border-2 border-red-400 hover:border-red-700 hover:text-red-700 text-xs text-red-400 font-bold py-2 px-4 rounded"
          onClick={handleDelete}
        >
          Supprimer
        </button>
      </div>
    </div>
  );
};
