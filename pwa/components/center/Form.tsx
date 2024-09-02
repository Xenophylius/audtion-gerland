import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Field, FieldArray, Formik } from "formik";
import { useMutation } from "react-query";

import { fetch, FetchError, FetchResponse } from "../../utils/dataAccess";
import { Center } from "../../types/Center";

interface Props {
  center?: Center;
}

interface SaveParams {
  values: Center;
}

interface DeleteParams {
  id: string;
}

const saveCenter = async ({ values }: SaveParams) =>
  await fetch<Center>(!values["@id"] ? "/centers" : values["@id"], {
    method: !values["@id"] ? "POST" : "PUT",
    body: JSON.stringify(values),
  });

const deleteCenter = async (id: string) =>
  await fetch<Center>(id, { method: "DELETE" });

export const Form: FunctionComponent<Props> = ({ center }) => {
  const [, setError] = useState<string | null>(null);
  const router = useRouter();

  const saveMutation = useMutation<
    FetchResponse<Center> | undefined,
    Error | FetchError,
    SaveParams
  >((saveParams) => saveCenter(saveParams));

  const deleteMutation = useMutation<
    FetchResponse<Center> | undefined,
    Error | FetchError,
    DeleteParams
  >(({ id }) => deleteCenter(id), {
    onSuccess: () => {
      router.push("/centers");
    },
    onError: (error) => {
      setError(`Erreur lors de la suppression : ${error}`);
      console.error(error);
    },
  });

  const handleDelete = () => {
    if (!center || !center["@id"]) return;
    if (!window.confirm("Êtes vous sur de vouloir supprimer ce centre ?")) return;
    deleteMutation.mutate({ id: center["@id"] });
  };

  return (
    <div className="container mx-auto px-4 max-w-2xl mt-4">
      <Link
        href="/centers"
        className="text-sm text-cyan-500 font-bold hover:text-cyan-700"
      >
        {`< Retour à la liste des centres`}
      </Link>
      <h1 className="text-3xl my-2">
        {center ? `Modifier le centre ${center["name"]}` : `Créer un centre`}
      </h1>
      <Formik
        initialValues={
          center
            ? {
                ...center,
              }
            : new Center()
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
                  msg: `Centre ${isCreation ? "créé" : "mis à jour"}.`,
                });
                router.push("/centers");
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
                htmlFor="center_name"
              >
                Nom
              </label>
              <input
                name="name"
                id="center_name"
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
                htmlFor="center_address"
              >
                Adresse
              </label>
              <input
                name="address"
                id="center_address"
                value={values.address ?? ""}
                type="text"
                placeholder=""
                className={`mt-1 block w-full ${
                  errors.address && touched.address ? "border-red-500" : ""
                }`}
                aria-invalid={
                  errors.address && touched.address ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="address"
              />
            </div>
            <div className="mb-2">
              <label
                className="text-gray-700 block text-sm font-bold"
                htmlFor="center_city"
              >
                Ville
              </label>
              <input
                name="city"
                id="center_city"
                value={values.city ?? ""}
                type="text"
                placeholder=""
                className={`mt-1 block w-full ${
                  errors.city && touched.city ? "border-red-500" : ""
                }`}
                aria-invalid={errors.city && touched.city ? "true" : undefined}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="city"
              />
            </div>
            <div className="mb-2">
              <label
                className="text-gray-700 block text-sm font-bold"
                htmlFor="center_postal_code"
              >
                Code postal
              </label>
              <input
                name="postal_code"
                id="center_postal_code"
                value={values.postal_code ?? ""}
                type="number"
                placeholder=""
                className={`mt-1 block w-full ${
                  errors.postal_code && touched.postal_code
                    ? "border-red-500"
                    : ""
                }`}
                aria-invalid={
                  errors.postal_code && touched.postal_code ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="postal_code"
              />
            </div>
            <div className="mb-2">
              <label
                className="text-gray-700 block text-sm font-bold"
                htmlFor="center_phone"
              >
                Téléphone
              </label>
              <input
                name="phone"
                id="center_phone"
                value={values.phone ?? ""}
                type="text"
                placeholder=""
                className={`mt-1 block w-full ${
                  errors.phone && touched.phone ? "border-red-500" : ""
                }`}
                aria-invalid={
                  errors.phone && touched.phone ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="phone"
              />
            </div>
            <div className="mb-2">
              <label
                className="text-gray-700 block text-sm font-bold"
                htmlFor="center_mail"
              >
                Mail
              </label>
              <input
                name="mail"
                id="center_mail"
                value={values.mail ?? ""}
                type="text"
                placeholder=""
                className={`mt-1 block w-full ${
                  errors.mail && touched.mail ? "border-red-500" : ""
                }`}
                aria-invalid={errors.mail && touched.mail ? "true" : undefined}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="mail"
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
              Modifier
            </button>
          </form>
        )}
      </Formik>
      <div className="flex space-x-2 mt-4 justify-end">
        {center && (
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
