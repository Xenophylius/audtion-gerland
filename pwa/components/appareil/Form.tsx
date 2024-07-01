import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Formik } from "formik";
import { useMutation } from "react-query";

import { fetch, FetchError, FetchResponse } from "../../utils/dataAccess";
import { Appareil } from "../../types/Appareil";

interface Props {
  appareil?: Appareil;
}

interface SaveParams {
  values: Appareil;
}

interface DeleteParams {
  id: string;
}

const saveAppareil = async ({ values }: SaveParams) =>
  await fetch<Appareil>(!values["@id"] ? "/appareils" : values["@id"], {
    method: !values["@id"] ? "POST" : "PUT",
    body: JSON.stringify(values),
  });

const deleteAppareil = async (id: string) =>
  await fetch<Appareil>(id, { method: "DELETE" });

export const Form: FunctionComponent<Props> = ({ appareil }) => {
  const [, setError] = useState<string | null>(null);
  const router = useRouter();

  const saveMutation = useMutation<
    FetchResponse<Appareil> | undefined,
    Error | FetchError,
    SaveParams
  >((saveParams) => saveAppareil(saveParams));

  const deleteMutation = useMutation<
    FetchResponse<Appareil> | undefined,
    Error | FetchError,
    DeleteParams
  >(({ id }) => deleteAppareil(id), {
    onSuccess: () => {
      router.push("/appareils");
    },
    onError: (error) => {
      setError(`Error when deleting the resource: ${error}`);
      console.error(error);
    },
  });

  const handleDelete = () => {
    if (!appareil || !appareil["@id"]) return;
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    deleteMutation.mutate({ id: appareil["@id"] });
  };

  return (
    <div className="container mx-auto px-4 max-w-2xl mt-4">
      <Link
        href="/appareils"
        className="text-sm text-cyan-500 font-bold hover:text-cyan-700"
      >
        {`< Back to list`}
      </Link>
      <h1 className="text-3xl my-2">
        {appareil ? `Edit Appareil ${appareil["@id"]}` : `Create Appareil`}
      </h1>
      <Formik
        initialValues={
          appareil
            ? {
                ...appareil,
              }
            : new Appareil()
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
                  msg: `Element ${isCreation ? "created" : "updated"}.`,
                });
                router.push("/appareils");
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
                htmlFor="appareil_nom"
              >
                nom
              </label>
              <input
                name="nom"
                id="appareil_nom"
                value={values.nom ?? ""}
                type="text"
                placeholder=""
                className={`mt-1 block w-full ${
                  errors.nom && touched.nom ? "border-red-500" : ""
                }`}
                aria-invalid={errors.nom && touched.nom ? "true" : undefined}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="nom"
              />
            </div>
            <div className="mb-2">
              <label
                className="text-gray-700 block text-sm font-bold"
                htmlFor="appareil_marque"
              >
                marque
              </label>
              <input
                name="marque"
                id="appareil_marque"
                value={values.marque ?? ""}
                type="text"
                placeholder=""
                className={`mt-1 block w-full ${
                  errors.marque && touched.marque ? "border-red-500" : ""
                }`}
                aria-invalid={
                  errors.marque && touched.marque ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="marque"
              />
            </div>
            <div className="mb-2">
              <label
                className="text-gray-700 block text-sm font-bold"
                htmlFor="appareil_prix"
              >
                prix
              </label>
              <input
                name="prix"
                id="appareil_prix"
                value={values.prix ?? ""}
                type="number"
                step="0.1"
                placeholder=""
                className={`mt-1 block w-full ${
                  errors.prix && touched.prix ? "border-red-500" : ""
                }`}
                aria-invalid={errors.prix && touched.prix ? "true" : undefined}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="prix"
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
              Submit
            </button>
          </form>
        )}
      </Formik>
      <div className="flex space-x-2 mt-4 justify-end">
        {appareil && (
          <button
            className="inline-block mt-2 border-2 border-red-400 hover:border-red-700 hover:text-red-700 text-sm text-red-400 font-bold py-2 px-4 rounded"
            onClick={handleDelete}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};
