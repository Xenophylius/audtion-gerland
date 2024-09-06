import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

import { fetch, getItemPath } from "../../utils/dataAccess";
import { Insurance } from "../../types/Insurance";

interface Props {
  insurance: Insurance;
  text: string;
}

export const Show: FunctionComponent<Props> = ({ insurance, text }) => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!insurance["@id"]) return;
    if (!window.confirm("Êtes vous sur de vouloir supprimer cet assurance?")) return;

    try {
      await fetch(insurance["@id"], { method: "DELETE" });
      router.push("/insurances");
    } catch (error) {
      setError("Erreur lors de la suppression de l'assurance.");
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <Head>
        <title>{`Fiche de ${insurance["name"]}`}</title>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </Head>
      <Link
        href="/insurances"
        className="text-sm text-cyan-500 font-bold hover:text-cyan-700"
      >
        {"< Retour à la liste des assurances"}
      </Link>
      <h1 className="text-3xl mb-2">{`Fiche de ${insurance["name"]}`}</h1>
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
            <td>{insurance["name"]}</td>
          </tr>
          <tr>
            <th scope="row">Prix TTC</th>
            <td>{insurance["price_ttc"]}</td>
          </tr>
          <tr>
            <th scope="row">TVA</th>
            <td>{insurance["tva"]}</td>
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
          href={getItemPath(insurance["@id"], "/insurances/[id]/edit")}
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
