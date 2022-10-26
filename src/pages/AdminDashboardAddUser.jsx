import React, { useContext } from "react";
import AuthenticatedLayout from "../layout/AuthenticatedLayout";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext, showToast } from "../globalContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { RegisterSchema } from "../utilities/schemas";
import { createUser } from "../api/authApi";

const AdminDashboardAddUser = () => {
  const { dispatch: globalDispatch } = useContext(GlobalContext);

  const navigate = useNavigate();

  const handleCreateUser = async (
    { name, username, password, role },
    { setSubmitting }
  ) => {
    try {
      setSubmitting(true);
      await createUser({
        name: name,
        roles: role,
        username: username,
        password: password,
      });
      setSubmitting(false);
      showToast(globalDispatch, {
        message: "User Created Successfully",
        type: "success",
      });
    } catch (err) {
      const error = err.data?.error || err.data;
      showToast(globalDispatch, {
        message: error,
        type: "error",
      });
      setSubmitting(false);
    }
  };

  return (
    <AuthenticatedLayout>
      <div className="w-11/12 px-6 py-8 rounded h-full flex flex-col items-center justify-center  mx-auto md:h-screen lg:py-0 ">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-[#324299] md:text-2xl">
              Create New User
            </h1>
            <Formik
              initialValues={{
                name: "",
                role: "ROLE_IT_ADMIN",
                username: "",
                password: "",
              }}
              validationSchema={RegisterSchema}
              onSubmit={handleCreateUser}
            >
              {({ isSubmitting, errors, touched, isValid, dirty }) => (
                <Form className="space-y-4 md:space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Name
                    </label>
                    <Field
                      id="name"
                      name="name"
                      type="text"
                      className={`text-gray-900 sm:text-sm rounded-lg bg-gray-50 block w-full p-2.5 ${
                        errors.name && touched.name
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
                      <span className="animate-pulse">Creating User...</span>
                    ) : (
                      <span className="fadeIn">Create User</span>
                    )}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default AdminDashboardAddUser;
