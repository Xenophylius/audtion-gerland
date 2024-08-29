import { FunctionComponent, useState } from "react";
import { useRouter } from "next/router";
import { ErrorMessage, Formik } from "formik";
import { useMutation } from "react-query";
import { fetch, FetchError, FetchResponse } from "../utils/dataAccess";

interface LoginValues {
  email: string;
  password: string;
}

const loginUser = async (values: LoginValues) =>
  await fetch("/login_check", {
    method: "POST",
    body: JSON.stringify(values),
  });

const LoginForm: FunctionComponent = () => {
  const [, setError] = useState<string | null>(null);
  const router = useRouter();

  const loginMutation = useMutation<FetchResponse<any> | undefined, Error | FetchError, LoginValues>(
    (values) => loginUser(values),
    {
      onSuccess: () => {
        router.push("/"); // Rediriger vers la page d'accueil après la connexion réussie
      },
      onError: (error) => {
        setError(`Error during login: ${error}`);
        console.error(error);
      },
    }
  );

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validate={() => {
        const errors: { [key: string]: string } = {};
        // Ajouter votre logique de validation ici
        return errors;
      }}
      onSubmit={(values, { setSubmitting, setStatus, setErrors }) => {
        loginMutation.mutate(values, {
          onSuccess: () => {
            setStatus({ isValid: true, msg: "Connexion réussie." });
          },
          onError: (error) => {
            setStatus({ isValid: false, msg: `${error.message}` });
            if ("fields" in error) {
              setErrors(error.fields);
            }
          },
          onSettled: () => {
            setSubmitting(false);
          },
        });
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
            <label className="text-gray-700 block text-sm font-bold" htmlFor="email">
              E-mail
            </label>
            <input
              name="email"
              id="email"
              value={values.email}
              type="text"
              placeholder=""
              className={`mt-1 block w-full ${errors.email && touched.email ? "border-red-500" : ""}`}
              aria-invalid={errors.email && touched.email ? "true" : undefined}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <ErrorMessage className="text-xs text-red-500 pt-1" component="div" name="email" />
          </div>
          <div className="mb-2">
            <label className="text-gray-700 block text-sm font-bold" htmlFor="password">
              Mot de passe
            </label>
            <input
              name="password"
              id="password"
              value={values.password}
              type="password"
              placeholder=""
              className={`mt-1 block w-full ${errors.password && touched.password ? "border-red-500" : ""}`}
              aria-invalid={errors.password && touched.password ? "true" : undefined}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <ErrorMessage className="text-xs text-red-500 pt-1" component="div" name="password" />
          </div>
          {status && status.msg && (
            <div
              className={`border px-4 py-3 my-4 rounded ${
                status.isValid ? "text-cyan-700 border-cyan-500 bg-cyan-200/50" : "text-red-700 border-red-400 bg-red-100"
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
            Se connecter
          </button>
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;
