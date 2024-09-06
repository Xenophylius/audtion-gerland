import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Formik } from "formik";
import { useMutation } from "react-query";

import { fetch, FetchError, FetchResponse } from "../../utils/dataAccess";
import { User } from "../../types/User";

interface Props {
  user?: User;
  currentUserRoles: string[]; // Ajouter les rôles de l'utilisateur actuel
}

interface SaveParams {
  values: User;
}

interface DeleteParams {
  id: string;
}

const saveUser = async ({ values }: SaveParams) =>
  await fetch<User>(!values["@id"] ? "/users" : values["@id"], {
    method: !values["@id"] ? "POST" : "PUT",
    body: JSON.stringify(values),
  });

const deleteUser = async (id: string) =>
  await fetch<User>(id, { method: "DELETE" });

export const Form: FunctionComponent<Props> = ({ user, currentUserRoles }) => {
  const [, setError] = useState<string | null>(null);
  const router = useRouter();

  const saveMutation = useMutation<
    FetchResponse<User> | undefined,
    Error | FetchError,
    SaveParams
  >((saveParams) => saveUser(saveParams));

  const deleteMutation = useMutation<
    FetchResponse<User> | undefined,
    Error | FetchError,
    DeleteParams
  >(({ id }) => deleteUser(id), {
    onSuccess: () => {
      router.push("/users");
    },
    onError: (error) => {
      setError(`Erreur lors de la suppression de l'utilisateur: ${error}`);
      console.error(error);
    },
  });

  const handleDelete = () => {
    if (!user || !user["@id"]) return;
    if (!window.confirm("Êtes vous sur de vouloir supprimer cet utilisateur ?")) return;
    deleteMutation.mutate({ id: user["@id"] });
  };

  return (
    <div className="container mx-auto px-4 max-w-2xl mt-4">
      <Link
        href="/users"
        className="text-sm text-cyan-500 font-bold hover:text-cyan-700"
      >
        {`< Retour à la liste des utilisateurs`}
      </Link>
      <h1 className="text-3xl my-2">
        {user ? `Editer un utilisateur ${user["@id"]}` : `Créer un utilisateur`}
      </h1>
      <Formik
        initialValues={
          user
            ? {
                ...user,
              }
            : new User()
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
                  msg: `Utilisateur ${isCreation ? "créé" : "modifié"}.`,
                });
                router.push("/users");
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
                htmlFor="user_email"
              >
                Mail
              </label>
              <input
                name="email"
                id="user_email"
                value={values.email ?? ""}
                type="text"
                placeholder=""
                className={`mt-1 block w-full ${
                  errors.email && touched.email ? "border-red-500" : ""
                }`}
                aria-invalid={
                  errors.email && touched.email ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="email"
              />
            </div>
            <div className="mb-2">
              <label
                className="text-gray-700 block text-sm font-bold"
                htmlFor="user_password"
              >
                Mot de passe
              </label>
              <input
                name="password"
                id="user_password"
                value={values.password ?? ""}
                type="text"
                placeholder=""
                className={`mt-1 block w-full ${
                  errors.password && touched.password ? "border-red-500" : ""
                }`}
                aria-invalid={
                  errors.password && touched.password ? "true" : undefined
                }
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="password"
              />
            </div>
            <div className="mb-2">
              <label
                className="text-gray-700 block text-sm font-bold"
                htmlFor="user_firstname"
              >
                Prénom
              </label>
              <input
                name="firstname"
                id="user_firstname"
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
                htmlFor="user_lastname"
              >
                Nom
              </label>
              <input
                name="lastname"
                id="user_lastname"
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
              <ErrorMessage
                className="text-xs text-red-500 pt-1"
                component="div"
                name="userIdentifier"
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
        {user && (
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
