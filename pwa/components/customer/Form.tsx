import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Formik } from "formik";
import { useMutation } from "react-query";

import { fetch, FetchError, FetchResponse } from "../../utils/dataAccess";
import { Customer } from "../../types/Customer";

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
      setError(`Error when deleting the resource: ${error}`);
      console.error(error);
    },
  });

  const handleDelete = () => {
    if (!customer || !customer["@id"]) return;
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    deleteMutation.mutate({ id: customer["@id"] });
  };

  return (
    <div className="container mx-auto px-4 max-w-2xl mt-4">
      <Link
        href="/customers"
        className="text-sm text-cyan-500 font-bold hover:text-cyan-700"
      >
        {`< Back to list`}
      </Link>
      <h1 className="text-3xl my-2">
        {customer ? `Edit Customer ${customer["@id"]}` : `Create Customer`}
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
                  msg: `Element ${isCreation ? "created" : "updated"}.`,
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
                firstname
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
                lastname
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
                birth
              </label>
              <input
                name="birth"
                id="customer_birth"
                value={values.birth?.toLocaleString() ?? ""}
                type="dateTime"
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
              <label
                className="text-gray-700 block text-sm font-bold"
                htmlFor="customer_sex"
              >
                sex
              </label>
              <input
                name="sex"
                id="customer_sex"
                value={values.sex ?? ""}
                type="text"
                placeholder=""
                className={`mt-1 block w-full ${
                  errors.sex && touched.sex ? "border-red-500" : ""
                }`}
                aria-invalid={errors.sex && touched.sex ? "true" : undefined}
                onChange={handleChange}
                onBlur={handleBlur}
              />
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
                city
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
                id_user
              </label>
              <input
                name="id_user"
                id="customer_id_user"
                value={values.id_user ?? ""}
                type="text"
                placeholder=""
                className={`mt-1 block w-full ${
                  errors.id_user && touched.id_user ? "border-red-500" : ""
                }`}
                aria-invalid={
                  errors.id_user && touched.id_user ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
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
                id_center
              </label>
              <input
                name="id_center"
                id="customer_id_center"
                value={values.id_center ?? ""}
                type="text"
                placeholder=""
                className={`mt-1 block w-full ${
                  errors.id_center && touched.id_center ? "border-red-500" : ""
                }`}
                aria-invalid={
                  errors.id_center && touched.id_center ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="id_center"
              />
            </div>
            <div className="mb-2">
              <label
                className="text-gray-700 block text-sm font-bold"
                htmlFor="customer_idUser"
              >
                idUser
              </label>
              <input
                name="idUser"
                id="customer_idUser"
                value={values.idUser ?? ""}
                type="text"
                placeholder=""
                className={`mt-1 block w-full ${
                  errors.idUser && touched.idUser ? "border-red-500" : ""
                }`}
                aria-invalid={
                  errors.idUser && touched.idUser ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="idUser"
              />
            </div>
            <div className="mb-2">
              <label
                className="text-gray-700 block text-sm font-bold"
                htmlFor="customer_idCenter"
              >
                idCenter
              </label>
              <input
                name="idCenter"
                id="customer_idCenter"
                value={values.idCenter ?? ""}
                type="text"
                placeholder=""
                className={`mt-1 block w-full ${
                  errors.idCenter && touched.idCenter ? "border-red-500" : ""
                }`}
                aria-invalid={
                  errors.idCenter && touched.idCenter ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="idCenter"
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
        {customer && (
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
