import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Formik } from "formik";
import { useMutation } from "react-query";

import { fetch, FetchError, FetchResponse } from "../../utils/dataAccess";
import { Insurance } from "../../types/Insurance";

interface Props {
  insurance?: Insurance;
}

interface SaveParams {
  values: Insurance;
}

interface DeleteParams {
  id: string;
}

const saveInsurance = async ({ values }: SaveParams) =>
  await fetch<Insurance>(!values["@id"] ? "/insurances" : values["@id"], {
    method: !values["@id"] ? "POST" : "PUT",
    body: JSON.stringify(values),
  });

const deleteInsurance = async (id: string) =>
  await fetch<Insurance>(id, { method: "DELETE" });

export const Form: FunctionComponent<Props> = ({ insurance }) => {
  const [, setError] = useState<string | null>(null);
  const router = useRouter();

  const saveMutation = useMutation<
    FetchResponse<Insurance> | undefined,
    Error | FetchError,
    SaveParams
  >((saveParams) => saveInsurance(saveParams));

  const deleteMutation = useMutation<
    FetchResponse<Insurance> | undefined,
    Error | FetchError,
    DeleteParams
  >(({ id }) => deleteInsurance(id), {
    onSuccess: () => {
      router.push("/insurances");
    },
    onError: (error) => {
      setError(`Erreur lors de la suppression de l'assurance: ${error}`);
      console.error(error);
    },
  });

  const handleDelete = () => {
    if (!insurance || !insurance["@id"]) return;
    if (!window.confirm("Êtes vous sur de vouloir supprimer cet assurance ?")) return;
    deleteMutation.mutate({ id: insurance["@id"] });
  };

  return (
    <div className="container mx-auto px-4 max-w-2xl mt-4">
      <Link
        href="/insurances"
        className="text-sm text-cyan-500 font-bold hover:text-cyan-700"
      >
        {`< Retour à la liste des assurances`}
      </Link>
      <h1 className="text-3xl my-2">
        {insurance ? `Modifier l'assurance ${insurance["name"]}` : `Créer une assurance`}
      </h1>
      <Formik
        initialValues={
          insurance
            ? {
                ...insurance,
              }
            : new Insurance()
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
                  msg: `Assurance ${isCreation ? "créer" : "modifiée"}.`,
                });
                router.push("/insurances");
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
                htmlFor="insurance_name"
              >
                Nom
              </label>
              <input
                name="name"
                id="insurance_name"
                value={values.name ?? ""}
                type="text"
                placeholder=""
                className={`mt-1 block w-full ${
                  errors.name && touched.name ? "border-red-500" : ""
                }`}
                aria-invalid={errors.name && touched.name ? "true" : undefined}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="name"
              />
            </div>
            <div className="mb-2">
              <label
                className="text-gray-700 block text-sm font-bold"
                htmlFor="insurance_price_ttc"
              >
                Prix TTC
              </label>
              <input
                name="price_ttc"
                id="insurance_price_ttc"
                value={values.price_ttc ?? ""}
                type="number"
                step="0.1"
                placeholder=""
                className={`mt-1 block w-full ${
                  errors.price_ttc && touched.price_ttc ? "border-red-500" : ""
                }`}
                aria-invalid={
                  errors.price_ttc && touched.price_ttc ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="price_ttc"
              />
            </div>
            <div className="mb-2">
              <label
                className="text-gray-700 block text-sm font-bold"
                htmlFor="insurance_tva"
              >
                TVA
              </label>
              <input
                name="tva"
                id="insurance_tva"
                value={values.tva ?? ""}
                type="number"
                step="0.1"
                placeholder=""
                className={`mt-1 block w-full ${
                  errors.tva && touched.tva ? "border-red-500" : ""
                }`}
                aria-invalid={errors.tva && touched.tva ? "true" : undefined}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="tva"
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
        {insurance && (
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
