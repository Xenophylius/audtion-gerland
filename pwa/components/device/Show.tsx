import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

import ReferenceLinks from "../common/ReferenceLinks";
import { fetch, getItemPath } from "../../utils/dataAccess";
import { Device } from "../../types/Device";

interface Props {
  device: Device;
  text: string;
}

export const Show: FunctionComponent<Props> = ({ device, text }) => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!device["@id"]) return;
    if (!window.confirm("Êtes vous sur de vouloir supprimer cet équipement ?")) return;

    try {
      await fetch(device["@id"], { method: "DELETE" });
      router.push("/devices");
    } catch (error) {
      setError("Erreur lors de la suppression de l'équipement.");
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <Head>
        <title>{`Fiche de ${device["name"]}`}</title>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </Head>
      <Link
        href="/devices"
        className="text-sm text-cyan-500 font-bold hover:text-cyan-700"
      >
        {"< Retour à la liste des équipements"}
      </Link>
      <h1 className="text-3xl mb-2">{`Fiche de ${device["name"]}`}</h1>
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
            <th scope="row">Nom</th>
            <td>{device["name"]}</td>
          </tr>
          <tr>
            <th scope="row">Constructeur</th>
            <td>{device["company"]}</td>
          </tr>
          <tr>
            <th scope="row">TVA</th>
            <td>{device["tva"]}</td>
          </tr>
          <tr>
            <th scope="row">Prix TTC</th>
            <td>{device["price_ttc"]}</td>
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
          href={getItemPath(device["@id"], "/devices/[id]/edit")}
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
