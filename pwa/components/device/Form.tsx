import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Field, FieldArray, Formik } from "formik";
import { useMutation } from "react-query";

import { fetch, FetchError, FetchResponse } from "../../utils/dataAccess";
import { Device } from "../../types/Device";

interface Props {
  device?: Device;
}

interface SaveParams {
  values: Device;
}

interface DeleteParams {
  id: string;
}

const saveDevice = async ({ values }: SaveParams) =>
  await fetch<Device>(!values["@id"] ? "/devices" : values["@id"], {
    method: !values["@id"] ? "POST" : "PUT",
    body: JSON.stringify(values),
  });

const deleteDevice = async (id: string) =>
  await fetch<Device>(id, { method: "DELETE" });

export const Form: FunctionComponent<Props> = ({ device }) => {
  const [, setError] = useState<string | null>(null);
  const router = useRouter();

  const saveMutation = useMutation<
    FetchResponse<Device> | undefined,
    Error | FetchError,
    SaveParams
  >((saveParams) => saveDevice(saveParams));

  const deleteMutation = useMutation<
    FetchResponse<Device> | undefined,
    Error | FetchError,
    DeleteParams
  >(({ id }) => deleteDevice(id), {
    onSuccess: () => {
      router.push("/devices");
    },
    onError: (error) => {
      setError(`Erreur lors de la suppression de l'équipement: ${error}`);
      console.error(error);
    },
  });

  const handleDelete = () => {
    if (!device || !device["@id"]) return;
    if (!window.confirm("Êtes vous sur de vouloir supprimer cet équipement ?")) return;
    deleteMutation.mutate({ id: device["@id"] });
  };

  return (
    <div className="container mx-auto px-4 max-w-2xl mt-4">
      <Link
        href="/devices"
        className="text-sm text-cyan-500 font-bold hover:text-cyan-700"
      >
        {`< Retour à la liste des équipements`}
      </Link>
      <h1 className="text-3xl my-2">
        {device ? `Modifier l'équipement ${device["name"]}` : `Créer un équipement`}
      </h1>
      <Formik
        initialValues={
          device
            ? {
                ...device,
              }
            : new Device()
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
                  msg: `Equipement ${isCreation ? "créé" : "modifié"}.`,
                });
                router.push("/devices");
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
                htmlFor="device_name"
              >
                Nom
              </label>
              <input
                name="name"
                id="device_name"
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
                htmlFor="device_company"
              >
                Constructeur
              </label>
              <input
                name="company"
                id="device_company"
                value={values.company ?? ""}
                type="text"
                placeholder=""
                className={`mt-1 block w-full ${
                  errors.company && touched.company ? "border-red-500" : ""
                }`}
                aria-invalid={
                  errors.company && touched.company ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="company"
              />
            </div>
            <div className="mb-2">
              <label
                className="text-gray-700 block text-sm font-bold"
                htmlFor="device_tva"
              >
                TVA
              </label>
              <input
                name="tva"
                id="device_tva"
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
            <div className="mb-2">
              <label
                className="text-gray-700 block text-sm font-bold"
                htmlFor="device_price_ttc"
              >
                Prix TTC
              </label>
              <input
                name="price_ttc"
                id="device_price_ttc"
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
        {device && (
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
