import { FunctionComponent, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Formik } from "formik";
import { useMutation, useQuery } from "react-query";

import { fetch, FetchError, FetchResponse } from "../../utils/dataAccess";
import { Customer } from "../../types/Customer";
import { getAllCenters } from "../../services/center";
import { Center } from "../../types/Center";
import { getAllUsers } from "../../services/user"; // Import de la fonction pour récupérer les utilisateurs
import { User } from "../../types/User"; // Import du type User

interface Props {
  customer?: Customer;
}

interface SaveParams {
  values: Customer;
}

interface DeleteParams {
  id: string;
}

const saveCustomer = async ({ values }: SaveParams) =>
  await fetch<Customer>(!values["@id"] ? "/customers" : values["@id"], {
    method: !values["@id"] ? "POST" : "PUT",
    body: JSON.stringify(values),
  });

const deleteCustomer = async (id: string) =>
  await fetch<Customer>(id, { method: "DELETE" });

export const Form: FunctionComponent<Props> = ({ customer }) => {
  const [, setError] = useState<string | null>(null);
  const router = useRouter();

  const [centers, setCenters] = useState<Center[]>([]);

  useEffect(() => {
    const fetchCenters = async () => {
      const allCenters = await getAllCenters();
      setCenters(allCenters);
    };

    fetchCenters();
  }, []);

  const { data: users, isLoading: isLoadingUsers } = useQuery(
    "users",
    getAllUsers
  );

  const saveMutation = useMutation<
    FetchResponse<Customer> | undefined,
    Error | FetchError,
    SaveParams
  >((saveParams) => saveCustomer(saveParams));

  const deleteMutation = useMutation<
    FetchResponse<Customer> | undefined,
    Error | FetchError,
    DeleteParams
  >(({ id }) => deleteCustomer(id), {
    onSuccess: () => {
      router.push("/customers");
    },
    onError: (error) => {
      setError(`Erreur lors de la suppression du patient: ${error}`);
      console.error(error);
    },
  });

  const handleDelete = () => {
    if (!customer || !customer["@id"]) return;
    if (!window.confirm("Êtes vous sur de vouloir supprimer ce patient ?")) return;
    deleteMutation.mutate({ id: customer["@id"] });
  };

  return (
    <div className="container mx-auto px-4 max-w-2xl mt-4">
      <Link
        href="/customers"
        className="text-sm text-cyan-500 font-bold hover:text-cyan-700"
      >
        {`< Retour à la liste des patients`}
      </Link>
      <h1 className="text-3xl my-2">
        {customer ? `Modifier patient ${customer["@id"]}` : `Créer patient`}
      </h1>
      <Formik
        initialValues={
          customer
            ? {
                ...customer,
              }
            : new Customer()
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
                  msg: `Patient ${isCreation ? "créé" : "modifié"}.`,
                });
                router.push("/customers");
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
                htmlFor="customer_firstname"
              >
                Prénom
              </label>
              <input
                name="firstname"
                id="customer_firstname"
                value={values.firstname ?? ""}
                type="text"
                placeholder=""
                className={`mt-1 block w-full ${
                  errors.firstname && touched.firstname ? "border-red-500" : ""
                }`}
                aria-invalid={
                  errors.firstname && touched.firstname ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="firstname"
              />
            </div>
            <div className="mb-2">
              <label
                className="text-gray-700 block text-sm font-bold"
                htmlFor="customer_lastname"
              >
                Nom
              </label>
              <input
                name="lastname"
                id="customer_lastname"
                value={values.lastname ?? ""}
                type="text"
                placeholder=""
                className={`mt-1 block w-full ${
                  errors.lastname && touched.lastname ? "border-red-500" : ""
                }`}
                aria-invalid={
                  errors.lastname && touched.lastname ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="lastname"
              />
            </div>
            <div className="mb-2">
              <label
                className="text-gray-700 block text-sm font-bold"
                htmlFor="customer_birth"
              >
                Date de naissance
              </label>
              <input
                name="birth"
                id="customer_birth"
                value={values.birth?.toLocaleString() ?? ""}
                type="date"
                placeholder=""
                className={`mt-1 block w-full ${
                  errors.birth && touched.birth ? "border-red-500" : ""
                }`}
                aria-invalid={
                  errors.birth && touched.birth ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="birth"
              />
            </div>
            <div className="mb-2">
              <label className="text-gray-700 block text-sm font-bold">Sexe</label>
              <div className="flex items-center space-x-4 mt-1">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="sex"
                    value="Homme"
                    checked={values.sex === "Homme"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="form-radio text-cyan-600"
                  />
                  <span className="ml-2">Homme</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="sex"
                    value="Femme"
                    checked={values.sex === "Femme"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="form-radio text-cyan-600"
                  />
                  <span className="ml-2">Femme</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="sex"
                    value="Ne se prononce pas"
                    checked={values.sex === "Ne se prononce pas"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="form-radio text-cyan-600"
                  />
                  <span className="ml-2">Ne se prononce pas</span>
                </label>
              </div>
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="sex"
              />
            </div>

            <div className="mb-2">
              <label
                className="text-gray-700 block text-sm font-bold"
                htmlFor="customer_city"
              >
                Ville
              </label>
              <input
                name="city"
                id="customer_city"
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
                htmlFor="customer_id_user"
              >
                Audioprothésiste
              </label>
              <select
                name="id_user" // Remplacez id_name_audio par id_user
                id="customer_id_user"
                value={values.id_user ?? ""}
                className={`mt-1 block w-full ${
                  errors.id_user && touched.id_user ? "border-red-500" : ""
                }`}
                aria-invalid={errors.id_user && touched.id_user ? "true" : undefined}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Sélectionnez un Audioprothésiste</option>
                {users?.map((user) => (
                  <option key={user["@id"]} value={user["@id"]}>
                    {user.firstname}
                  </option>
                ))}
              </select>
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="id_user"
              />
            </div>
            <div className="mb-2">
              <label
                className="text-gray-700 block text-sm font-bold"
                htmlFor="customer_id_center"
              >
                Centre
              </label>
              <select
                name="id_center" // Remplacez id_center_pec par id_center
                id="customer_id_center"
                value={values.id_center ?? ""}
                className={`mt-1 block w-full ${
                  errors.id_center && touched.id_center ? "border-red-500" : ""
                }`}
                aria-invalid={errors.id_center && touched.id_center ? "true" : undefined}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Sélectionnez un centre</option>
                {centers.map((center) => (
                  <option key={center["@id"]} value={center["@id"]}>
                    {center.name}
                  </option>
                ))}
              </select>
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="id_center"
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
        {customer && (
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
