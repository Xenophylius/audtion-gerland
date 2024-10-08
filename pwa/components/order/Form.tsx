import { FunctionComponent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Formik } from "formik";
import { useMutation, useQuery } from "react-query";

import { getAllInsurances } from "../../services/insurance";
import { fetch, FetchError, FetchResponse } from "../../utils/dataAccess";
import { Order } from "../../types/Order";
import { getAllCenters } from "../../services/center";
import { Center } from "../../types/Center";
import { getAllUsers } from "../../services/user"; // Import de la fonction pour récupérer les utilisateurs
import { User } from "../../types/User"; // Import du type User

interface Props {
  order?: Order;
}

interface SaveParams {
  values: Order;
}

interface DeleteParams {
  id: string;
}

const saveOrder = async ({ values }: SaveParams) =>
  await fetch<Order>(!values["@id"] ? "/orders" : values["@id"], {
    method: !values["@id"] ? "POST" : "PUT",
    body: JSON.stringify(values),
  });

const deleteOrder = async (id: string) =>
  await fetch<Order>(id, { method: "DELETE" });

export const Form: FunctionComponent<Props> = ({ order }) => {
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

  const { data: insurances, isLoading: isLoadingInsurances } = useQuery(
    "insurances",
    getAllInsurances
  );

  const { data: users, isLoading: isLoadingUsers } = useQuery(
    "users",
    getAllUsers
  );

  const saveMutation = useMutation<
    FetchResponse<Order> | undefined,
    Error | FetchError,
    SaveParams
  >((saveParams) => saveOrder(saveParams));

  const deleteMutation = useMutation<
    FetchResponse<Order> | undefined,
    Error | FetchError,
    DeleteParams
  >(({ id }) => deleteOrder(id), {
    onSuccess: () => {
      router.push("/orders");
    },
    onError: (error) => {
      setError(`Erreur lors de la suppression de la ressource : ${error}`);
      console.error(error);
    },
  });

  const handleDelete = () => {
    if (!order || !order["@id"]) return;
    if (!window.confirm("Êtes vous sur de vouloir supprimer ?")) return;
    deleteMutation.mutate({ id: order["@id"] });
  };

  return (
    <div className="container mx-auto px-4 max-w-2xl mt-4">
      <Link
        href="/orders"
        className="text-sm text-cyan-500 font-bold hover:text-cyan-700"
      >
        {`< retour à la liste des ventes`}
      </Link>
      <h1 className="text-3xl my-2">
        {order ? `Modifier la vente ${order["@id"]}` : `Créer une vente`}
      </h1>
      <Formik
        initialValues={
          order
            ? {
                ...order,
                id_paiement: order["id_paiement"]?.["@id"] ?? "",
                id_customer: order["id_customer"]?.["@id"] ?? "",
                id_name_audio: order["id_name_audio"]?.["@id"] ?? "",
                id_insurance: order["id_insurance"]?.["@id"] ?? "",
                id_center_pec: order["id_center_pec"]?.["@id"] ?? "",
              }
            : new Order()
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
                  msg: `Vente ${isCreation ? "crée" : "modifiée"}.`,
                });
                router.push("/orders");
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
                htmlFor="order_id_paiement"
              >
                Paiement
              </label>
              <input
                name="id_paiement"
                id="order_id_paiement"
                value={values.id_paiement ?? ""}
                type="text"
                placeholder=""
                className={`mt-1 block w-full ${
                  errors.id_paiement && touched.id_paiement
                    ? "border-red-500"
                    : ""
                }`}
                aria-invalid={
                  errors.id_paiement && touched.id_paiement ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="id_paiement"
              />
            </div>
            <div className="mb-2">
              <label
                className="text-gray-700 block text-sm font-bold"
                htmlFor="order_id_customer"
              >
                Patient
              </label>
              <input
                name="id_customer"
                id="order_id_customer"
                value={values.id_customer ?? ""}
                type="text"
                placeholder=""
                className={`mt-1 block w-full ${
                  errors.id_customer && touched.id_customer
                    ? "border-red-500"
                    : ""
                }`}
                aria-invalid={
                  errors.id_customer && touched.id_customer ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="id_customer"
              />
            </div>
            <div className="mb-2">
              <label
                className="text-gray-700 block text-sm font-bold"
                htmlFor="order_mutual"
              >
                Mutuelle
              </label>
              <input
                name="mutual"
                id="order_mutual"
                value={values.mutual ?? ""}
                type="text"
                placeholder=""
                className={`mt-1 block w-full ${
                  errors.mutual && touched.mutual ? "border-red-500" : ""
                }`}
                aria-invalid={
                  errors.mutual && touched.mutual ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="mutual"
              />
            </div>
            <div className="mb-2">
              <label
                className="text-gray-700 block text-sm font-bold"
                htmlFor="order_id_name_audio"
              >
                Audioprothésiste
              </label>
              <select
                name="id_name_audio"
                id="order_id_name_audio"
                value={values.id_name_audio ?? ""}
                className={`mt-1 block w-full ${
                  errors.id_name_audio && touched.id_name_audio
                    ? "border-red-500"
                    : ""
                }`}
                aria-invalid={
                  errors.id_name_audio && touched.id_name_audio
                    ? "true"
                    : undefined
                }
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
                name="id_name_audio"
              />
            </div>
            <div className="mb-2">
              <label
                className="text-gray-700 block text-sm font-bold"
                htmlFor="order_id_insurance"
              >
                Assurance
              </label>
              <select
                name="id_insurance"
                id="order_id_insurance"
                value={values.id_insurance ?? ""}
                className={`mt-1 block w-full ${
                  errors.id_insurance && touched.id_insurance
                    ? "border-red-500"
                    : ""
                }`}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Sélectionnez une assurance</option>
                {insurances?.map((insurance) => (
                  <option key={insurance["@id"]} value={insurance["@id"]}>
                    {insurance.name} {/* Assurez-vous que `name` existe dans l'objet insurance */}
                  </option>
                ))}
              </select>
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="id_insurance"
              />
            </div>
            <div className="mb-2">
              <label
                className="text-gray-700 block text-sm font-bold"
                htmlFor="order_id_center_pec"
              >
                Centre PEC
              </label>
              <select
                name="id_center_pec"
                id="order_id_center_pec"
                value={values.id_center_pec ?? ""}
                className={`mt-1 block w-full ${
                  errors.id_center_pec && touched.id_center_pec
                    ? "border-red-500"
                    : ""
                }`}
                aria-invalid={
                  errors.id_center_pec && touched.id_center_pec
                    ? "true"
                    : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Sélectionnez un centre de PEC</option>
                {centers.map((center) => (
                  <option key={center["@id"]} value={center["@id"]}>
                    {center.name}
                  </option>
                ))}
              </select>
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="id_center_pec"
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
        {order && (
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
