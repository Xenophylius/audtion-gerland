import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Formik } from "formik";
import { useMutation } from "react-query";

import { fetch, FetchError, FetchResponse } from "../../utils/dataAccess";
import { Paiement } from "../../types/Paiement";

interface Props {
  paiement?: Paiement;
}

interface SaveParams {
  values: Paiement;
}

interface DeleteParams {
  id: string;
}

const savePaiement = async ({ values }: SaveParams) =>
  await fetch<Paiement>(!values["@id"] ? "/paiements" : values["@id"], {
    method: !values["@id"] ? "POST" : "PUT",
    body: JSON.stringify(values),
  });

const deletePaiement = async (id: string) =>
  await fetch<Paiement>(id, { method: "DELETE" });

export const Form: FunctionComponent<Props> = ({ paiement }) => {
  const [, setError] = useState<string | null>(null);
  const router = useRouter();

  const saveMutation = useMutation<
    FetchResponse<Paiement> | undefined,
    Error | FetchError,
    SaveParams
  >((saveParams) => savePaiement(saveParams));

  const deleteMutation = useMutation<
    FetchResponse<Paiement> | undefined,
    Error | FetchError,
    DeleteParams
  >(({ id }) => deletePaiement(id), {
    onSuccess: () => {
      router.push("/paiements");
    },
    onError: (error) => {
      setError(`Erreur lors de la suppression du paiement: ${error}`);
      console.error(error);
    },
  });

  const handleDelete = () => {
    if (!paiement || !paiement["@id"]) return;
    if (!window.confirm("Êtes vous sur de vouloir supprimer ce paiement ?")) return;
    deleteMutation.mutate({ id: paiement["@id"] });
  };

  return (
    <div className="container mx-auto px-4 max-w-2xl mt-4">
      <Link
        href="/paiements"
        className="text-sm text-cyan-500 font-bold hover:text-cyan-700"
      >
        {`< Retour à la liste des paiements`}
      </Link>
      <h1 className="text-3xl my-2">
        {paiement ? `Modifier le paiement ${paiement["@id"]}` : `Ajouter un paiement`}
      </h1>
      <Formik
        initialValues={
          paiement
            ? {
                ...paiement,
              }
            : new Paiement()
        }
        validate={() => {
          const errors = {};
          // add your validation logic here
          return errors;
        }}
        onSubmit={(values, { setSubmitting, setStatus, setErrors }) => {
          const isCreation = !values["@id"];
          saveMutation.mutate(
            { values },
            {
              onSuccess: () => {
                setStatus({
                  isValid: true,
                  msg: `Paiement ${isCreation ? "créé" : "modifié"}.`,
                });
                router.push("/paiements");
              },
              onError: (error) => {
                setStatus({
                  isValid: false,
                  msg: `${error.message}`,
                });
                if ("fields" in error) {
                  setErrors(error.fields);
                }
              },
              onSettled: () => {
                setSubmitting(false);
              },
            }
          );
        }}
      >
        {({
          values,
          status,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form className="shadow-md p-4" onSubmit={handleSubmit}>
            <div className="mb-2">
              <label
                className="text-gray-700 block text-sm font-bold"
                htmlFor="paiement_RAC"
              >
                RAC
              </label>
              <input
                name="RAC"
                id="paiement_RAC"
                value={values.RAC ?? ""}
                type="number"
                step="0.1"
                placeholder=""
                className={`mt-1 block w-full ${
                  errors.RAC && touched.RAC ? "border-red-500" : ""
                }`}
                aria-invalid={errors.RAC && touched.RAC ? "true" : undefined}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="RAC"
              />
            </div>
            <div className="mb-2">
              <label
                className="text-gray-700 block text-sm font-bold"
                htmlFor="paiement_RO"
              >
                RO
              </label>
              <input
                name="RO"
                id="paiement_RO"
                value={values.RO ?? ""}
                type="number"
                step="0.1"
                placeholder=""
                className={`mt-1 block w-full ${
                  errors.RO && touched.RO ? "border-red-500" : ""
                }`}
                aria-invalid={errors.RO && touched.RO ? "true" : undefined}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="RO"
              />
            </div>
            <div className="mb-2">
              <label
                className="text-gray-700 block text-sm font-bold"
                htmlFor="paiement_RC"
              >
                RC
              </label>
              <input
                name="RC"
                id="paiement_RC"
                value={values.RC ?? ""}
                type="number"
                step="0.1"
                placeholder=""
                className={`mt-1 block w-full ${
                  errors.RC && touched.RC ? "border-red-500" : ""
                }`}
                aria-invalid={errors.RC && touched.RC ? "true" : undefined}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="RC"
              />
            </div>
            <div className="mb-2">
              <label
                className="text-gray-700 block text-sm font-bold"
                htmlFor="paiement_credit"
              >
                Credit
              </label>
              <input
                name="credit"
                id="paiement_credit"
                value={values.credit ?? ""}
                type="number"
                step="0.1"
                placeholder=""
                className={`mt-1 block w-full ${
                  errors.credit && touched.credit ? "border-red-500" : ""
                }`}
                aria-invalid={
                  errors.credit && touched.credit ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="credit"
              />
            </div>
            {status && status.msg && (
              <div
                className={`border px-4 py-3 my-4 rounded ${
                  status.isValid
                    ? "text-cyan-700 border-cyan-500 bg-cyan-200/50"
                    : "text-red-700 border-red-400 bg-red-100"
                }`}
                role="alert"
              >
                {status.msg}
              </div>
            )}
            <button
              type="submit"
              className="inline-block mt-2 bg-cyan-500 hover:bg-cyan-700 text-sm text-white font-bold py-2 px-4 rounded"
              disabled={isSubmitting}
            >
              Envoyer
            </button>
          </form>
        )}
      </Formik>
      <div className="flex space-x-2 mt-4 justify-end">
        {paiement && (
          <button
            className="inline-block mt-2 border-2 border-red-400 hover:border-red-700 hover:text-red-700 text-sm text-red-400 font-bold py-2 px-4 rounded"
            onClick={handleDelete}
          >
            Supprimer
          </button>
        )}
      </div>
    </div>
  );
};
