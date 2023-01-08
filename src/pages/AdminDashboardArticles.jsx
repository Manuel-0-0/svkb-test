import React, { useState, useEffect, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getArticles, searchForArticle } from "../api/articleApis";
import Table from "../components/Table";
import AuthenticatedLayout from "../layout/AuthenticatedLayout";
import { Helmet } from "react-helmet";
import { GlobalContext, showToast } from "../globalContext"
import { getErrorMessage } from "../utilities/functions";
import PaginationBar from "../components/PaginationBar";
import debounce from "lodash.debounce"

const AdminDashboardArticle = () => {
  const navigate = useNavigate();
  const { dispatch: globalDispatch } = useContext(GlobalContext)
  const [articles, setArticles] = useState();
  const [search, setSearch] = useState();
  const [filteredArticles, setFilteredArticles] = useState();
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize,] = useState(10);
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

  const getAllArticles = async () => {
    try {
      const response = await getArticles({ page: pageNumber, limit: pageSize });
      setArticles(response.data);
      setFilteredArticles(response.data);
    } catch (err) {
      const error = getErrorMessage(err);
      showToast(globalDispatch, {
        message: error,
        type: "error",
      });
    }
  };

  useEffect(() => {
    getAllArticles();
  }, []);

  const handleChange = async (e) => {
    setSearch(e.target.value);
    if (e.target.value) {
      const response = await searchForArticle({ search: e.target.value, page: pageNumber, limit: pageSize })
      setFilteredArticles(response.data);
    } else {
      setFilteredArticles(articles);
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
    if (filteredArticles) {
      setPageNumber(filteredArticles.Pagination.current_page);
      setTotalNumber(filteredArticles.Pagination.total_articles);
      setPageCount(filteredArticles.Pagination.num_of_pages);
      setCanNextPage(filteredArticles.Pagination.current_page < filteredArticles.Pagination.num_of_pages)
      setCanPrevPage(filteredArticles.Pagination.current_page > 0)
    }
  }, [filteredArticles]);

  return (
    <AuthenticatedLayout>
      <Helmet>
        <title>Admin - Articles | SunValley</title>
      </Helmet>
      <div className="w-11/12 mx-auto p-6 rounded bg-white border">
        <button
          onClick={() => navigate("create")}
          type="button"
          className="text-white mr-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center my-4"
        >
          Create Article
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
              onChange={debouncedResults}
              className="block p-4 pl-10 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search Articles..."
              required
            />
          </div>
          <div className="mt-4">
            <Table
              headers={[
                { name: "Article Name", id: "title", link: "admin/article" },
                { name: "Date Created", id: "dateCreated" },
                {
                  name: "Category",
                  id: "category_name",
                  link: "admin/category",
                },
              ]}
              articles={filteredArticles?.Articles}
            />
            <PaginationBar
              currentPage={pageNumber}
              pageSize={pageSize}
              canPrevPage={canPrevPage}
              canNextPage={canNextPage}
              nextPage={nextPage}
              prevPage={prevPage}
              totalNumber={totalNumber}
            />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default AdminDashboardArticle;
