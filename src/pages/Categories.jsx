import React, { useState, useEffect, useContext, useMemo } from "react";
import { getCategories, searchForCategory } from "../api/categoryApis";
import Table from "../components/Table";
import DefaultLayout from "../layout/DefaultLayout";
import { Helmet } from "react-helmet";
import { getErrorMessage } from "../utilities/functions";
import { GlobalContext, showToast } from "../globalContext";
import debounce from "lodash.debounce"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const Categories = () => {
  const [categories, setCategories] = useState();
  const [search, setSearch] = useState();
  const [filteredCategories, setFilteredCategories] = useState();
  const { dispatch: globalDispatch } = useContext(GlobalContext);

  const getAllCategories = async () => {
    try {
      const response = await getCategories();
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

  const debouncedResults = useMemo(() => {
    return debounce(handleChange, 500);
  }, []);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  return (
    <DefaultLayout>
      <Helmet>
        <title>Categories | SunValley</title>
      </Helmet>
      {categories && categories.length > 0 ? (
        <div className="w-11/12 mx-auto my-6 p-6 rounded bg-white">
          <div className="w-full mx-auto px-2 py-6">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only"
            >
              Search
            </label>
            <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <MagnifyingGlassIcon className="w-5 h-5" />
              </div>
              <input
                type="search"
                id="default-search"
                onChange={debouncedResults}
                className="block p-4 pl-10 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search Categories..."
              />
            </div>
            <div className="mt-4">
              <Table
                headers={[
                  {
                    name: "Category Name",
                    id: "categoryName",
                    link: "category",
                  },
                  { name: "Articles In Category", id: "articleNum" },
                  { name: "Date Created", id: "dateCreated" },
                ]}
                articles={filteredCategories}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[80vh] w-full flex justify-center items-center">
          <p className="text-2xl">No Categories to search</p>
        </div>
      )}
    </DefaultLayout>
  );
};

export default Categories;
