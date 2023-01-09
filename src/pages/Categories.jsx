import React, { useState, useEffect, useContext, useMemo, useCallback } from "react";
import { getCategories, searchForCategory } from "../api/categoryApis";
import Table from "../components/Table";
import DefaultLayout from "../layout/DefaultLayout";
import { Helmet } from "react-helmet";
import { getErrorMessage } from "../utilities/functions";
import { GlobalContext, showToast } from "../globalContext";
import debounce from "lodash.debounce"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import PaginationBar from "../components/PaginationBar";
import { PageSize } from "../utilities/functions";

const Categories = () => {
  const [categories, setCategories] = useState();
  const [search, setSearch] = useState();
  const [filteredCategories, setFilteredCategories] = useState();
  const { dispatch: globalDispatch } = useContext(GlobalContext);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize,] = useState(PageSize);
  const [totalNumber, setTotalNumber] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [canNextPage, setCanNextPage] = useState(false);
  const [canPrevPage, setCanPrevPage] = useState(false);

  const prevPage = () => {
    setPageNumber(pageNumber - 1 > 0 ? pageNumber - 1 : 0);
  };

  const nextPage = () => {
    setPageNumber(pageNumber + 1 <= pageCount ? pageNumber + 1 : 0);
  };

  const onPageChange = (number) =>{
    setPageNumber(number)
  }

  const getAllCategories = useCallback (async () => {
    try {
      const response = await getCategories({ page: pageNumber, limit: pageSize });
      setCategories(response.data);
      setFilteredCategories(response.data);
    } catch (err) {
      const error = getErrorMessage(err);
      showToast(globalDispatch, {
        message: error,
        type: "error",
      });
    }
  }, [pageNumber])

  useEffect(() => {
    getAllCategories();
  }, [getAllCategories]);

  const handleChange = async (e) => {
    setSearch(e.target.value);
    if (e.target.value) {
      const response = await searchForCategory({ search: e.target.value, page: pageNumber, limit: pageSize });
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

  useEffect(() => {
    if (filteredCategories) {
      setPageNumber(filteredCategories.Pagination.current_page);
      setTotalNumber(filteredCategories.Pagination.total_categories);
      setPageCount(filteredCategories.Pagination.num_of_pages);
      setCanNextPage(filteredCategories.Pagination.current_page < filteredCategories.Pagination.num_of_pages - 1)
      setCanPrevPage(filteredCategories.Pagination.current_page > 0)
    }
  }, [filteredCategories]);

  return (
    <DefaultLayout>
      <Helmet>
        <title>Categories | SunValley</title>
      </Helmet>
      {categories && categories.Categories.length > 0 ? (
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
                articles={filteredCategories.Categories}
              />
              <PaginationBar
                currentPage={pageNumber}
                pageSize={pageSize}
                canPrevPage={canPrevPage}
                canNextPage={canNextPage}
                nextPage={nextPage}
                prevPage={prevPage}
                onPageChange={onPageChange}
                totalNumber={totalNumber}
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
