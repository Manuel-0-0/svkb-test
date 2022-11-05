import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { AuthContext } from "../authContext";
import { GlobalContext, showToast } from "../globalContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Icon from "../utilities/icons/SunValley";
import { LoginSchema } from "../utilities/schemas";
import { login } from "../api/authApi";

const Login = () => {
  const { dispatch, state } = useContext(AuthContext);
  const { dispatch: globalDispatch } = useContext(GlobalContext);

  const navigate = useNavigate();

  const handleLogin = async ({ username, password }, { setSubmitting }) => {
    try {
      setSubmitting(true);
      const loggedInUser = await login({
        username: username,
        password: password,
      });

      dispatch({
        type: "LOGIN",
        payload: {
          user: username,
          token: loggedInUser.data.Token,
          userId:loggedInUser.data.User.id
        },
      });
      setSubmitting(false);

      showToast(globalDispatch, {
        message: "Login Successful",
        type: "success",
      });
      navigate("/admin/home");
    } catch (err) {
      const error = err.data?.error || err.data;
      showToast(globalDispatch, {
        message: error,
        type: "error",
      });
      setSubmitting(false);
    }
  };

  if (state.token && state.user) {
    navigate("/admin/home");
  }
  return (
    <>
      <Helmet>
        <title>Login | SunValley</title>
      </Helmet>
      <section className="bg-[#324299]">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 h-screen w-screen">
          <Link
            to="/"
            className="flex items-center mb-6 text-2xl font-semibold"
          >
            <Icon className="w-8 h-8 mr-2" />
          </Link>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-[#324299] md:text-2xl">
                Sign in to your account <Link to="/" className="text-xs text-gray-400 ml-3">Go Back Home</Link>
              </h1>
              <Formik
                initialValues={{
                  username: "",
                  password: "",
                }}
                validationSchema={LoginSchema}
                onSubmit={handleLogin}
              >
                {({ isSubmitting, errors, touched, isValid, dirty }) => (
                  <Form className="space-y-4 md:space-y-6">
                    <div>
                      <label
                        htmlFor="username"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Username
                      </label>
                      <Field
                        id="username"
                        name="username"
                        type="text"
                        className={`text-gray-900 sm:text-sm rounded-lg bg-gray-50 block w-full p-2.5 ${
                          errors.username && touched.username
                            ? "border-red-300 placeholder-red-500 focus:ring-red-500 focus:border-red-500"
                            : "focus:ring-[#324299] focus:border-[#324299]"
                        } `}
                        placeholder="joy"
                      />
                      <ErrorMessage
                        className="text-red-500 ml-2 mt-2"
                        component="div"
                        name="username"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Password
                      </label>
                      <Field
                        id="password"
                        name="password"
                        type="password"
                        className={`text-gray-900 sm:text-sm rounded-lg bg-gray-50 block w-full p-2.5 ${
                          errors.password && touched.password
                            ? "border-red-300 placeholder-red-500 focus:ring-red-500 focus:border-red-500"
                            : "focus:ring-[#324299] focus:border-[#324299]"
                        } `}
                        placeholder="••••••••"
                      />
                      <ErrorMessage
                        className="text-red-500 ml-2 mt-2"
                        component="div"
                        name="password"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div></div>
                      <Link
                        to="/"
                        className="text-sm font-medium hover:underline text-[#324299]"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <button
                      disabled={!(isValid && dirty) || isSubmitting}
                      type="submit"
                      className={`w-full text-white ${
                        !(isValid && dirty) || isSubmitting
                          ? "bg-blue-300"
                          : "bg-[#324299] focus:ring-[#324299] hover:bg-blue-700 focus:ring-4 focus:outline-none"
                      } font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
                    >
                      {isSubmitting ? (
                        <span className="animate-pulse">Logging in...</span>
                      ) : (
                        <span className="fadeIn">Log in</span>
                      )}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
