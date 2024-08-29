import { FunctionComponent } from "react";
import Link from "next/link";

import { getItemPath } from "../../utils/dataAccess";
import { Center } from "../../types/Center";

interface Props {
  centers: Center[];
}

export const List: FunctionComponent<Props> = ({ centers }) => (
  <div className="p-4">
    <div className="flex justify-between items-center">
      <h1 className="text-3xl mb-2">Liste des centres</h1>
      <Link
        href="/centers/create"
        className="bg-cyan-500 hover:bg-primary-300 text-white text-sm font-bold py-2 px-4 rounded"
      >
        Créer un centre
      </Link>
    </div>
    <table
      cellPadding={10}
      className="shadow-md table border-collapse min-w-full leading-normal table-auto text-left my-3"
    >
      <thead className="w-full text-xs uppercase font-light text-gray-700 bg-gray-200 py-2 px-4">
        <tr>
          <th>Nom</th>
          <th>Adresse</th>
          <th>Ville</th>
          <th>Code postal</th>
          <th>Téléphone</th>
          <th>Mail</th>
          <th colSpan={2} />
        </tr>
      </thead>
      <tbody className="text-sm divide-y divide-gray-200">
        {centers &&
          centers.length !== 0 &&
          centers.map(
            (center) =>
              center["@id"] && (
                <tr className="py-2" key={center["@id"]}>
                  <td>{center["name"]}</td>
                  <td>{center["address"]}</td>
                  <td>{center["city"]}</td>
                  <td>{center["postal_code"]}</td>
                  <td>{center["phone"]}</td>
                  <td>{center["mail"]}</td>
                  <td className="w-8">
                    <Link
                      href={getItemPath(center["@id"], "/centers/[id]")}
                      className="text-cyan-500"
                    >
                      Voir
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                        <path
                          fillRule="evenodd"
                          d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Link>
                  </td>
                  <td className="w-8">
                    <Link
                      href={getItemPath(center["@id"], "/centers/[id]/edit")}
                      className="text-cyan-500"
                    >
                      Modifier
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6 mx-auto"
                      >
                        <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                        <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                      </svg>
                    </Link>
                  </td>
                </tr>
              )
          )}
      </tbody>
    </table>
  </div>
);
