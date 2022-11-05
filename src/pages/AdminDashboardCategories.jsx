import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories, searchForCategory } from "../api/categoryApis";
import Table from "../components/Table";
import AuthenticatedLayout from "../layout/AuthenticatedLayout";
import { Helmet } from "react-helmet";
import { getErrorMessage } from "../utilities/functions";
import { GlobalContext, showToast } from "../globalContext";

const AdminDashboardCategories = () => {
    
  const navigate = useNavigate();
  const [categories, setCategories] = useState();
  const [search, setSearch] = useState();
  const [filteredCategories, setFilteredCategories] = useState();
  const { dispatch: globalDispatch } = useContext(GlobalContext);

  const getAllCategories = async () => {
    try {
      const response = await getCategories();
      console.log(response.data);
      setCategories(response.data);
      setFilteredCategories(response.data);
    } catch (err) {
      const error = getErrorMessage(err);
      showToast(globalDispatch, {
        message: error,
        type: "error",
      });
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleChange = async (e) => {
    setSearch(e.target.value);
    if (e.target.value) {
      const response = await searchForCategory({ search: e.target.value });
      setFilteredCategories(response.data);
    } else {
      setFilteredCategories(categories);
    }
  };

  return (
    <AuthenticatedLayout>
      <Helmet>
        <title>Admin - Categories | SunValley</title>
      </Helmet>
      <div className="w-11/12 mx-auto p-6 rounded bg-white border">
        <button
          onClick={() => navigate("create")}
          type="button"
          className="text-white mr-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center my-4"
        >
          Create Category
        </button>
        <div className="w-full mx-auto px-2 py-6">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only"
          >
            Search
          </label>
          <div className="relative">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              value={search}
              onChange={(e) => handleChange(e)}
              className="block p-4 pl-10 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search Categories..."
              required
            />
          </div>
          <div className="mt-4">
            <Table
              headers={[
                {
                  name: "Category Name",
                  id: "categoryName",
                  link: "admin/category",
                },
                { name: "Articles In Category", id: "articleNum" },
                {name: "Date Created", id:"dateCreated"}
              ]}
              articles={filteredCategories}
            />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default AdminDashboardCategories;
