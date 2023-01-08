import React, { useState, useEffect, useMemo, useCallback } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import { getPublishedArticles, searchForPublishedArticle } from "../api/articleApis";
import Table from "../components/Table";
import PaginationBar from "../components/PaginationBar";
import debounce from "lodash.debounce"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const Articles = () => {
  const [articles, setArticles] = useState();
  const [, setSearch] = useState();
  const [filteredArticles, setFilteredArticles] = useState();
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, ] = useState(3);
  const [totalNumber, setTotalNumber] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [canNextPage, setCanNextPage] = useState(false);
  const [canPrevPage, setCanPrevPage] = useState(false);

  useEffect(() => {
    getAllArticles();
  }, []);

  const prevPage = () => {
    setPageNumber(pageNumber - 1 > 0 ? pageNumber - 1 : 0);
  };

  const nextPage = () => {
    setPageNumber(pageNumber + 1 <= pageCount ? pageNumber + 1 : 0);
  };

  const getAllArticles = useCallback(async () => {
    try {
      const response = await getPublishedArticles({ page: pageNumber, limit: pageSize });
      setArticles(response.data);
      setFilteredArticles(response.data);
    } catch (err) { }
  }, [pageNumber]);

  const handleChange = async (e) => {
    setSearch(e.target.value);
    if (e.target.value) {
      const response = await searchForPublishedArticle({ search: e.target.value, page: pageNumber, limit: pageSize })
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
    getAllArticles()
  }, [getAllArticles])

  useEffect(() => {
    if (filteredArticles) {
      setPageNumber(filteredArticles.Pagination.current_page);
      setTotalNumber(filteredArticles.Pagination.total_articles);
      setPageCount(filteredArticles.Pagination.num_of_pages);
      setCanNextPage(filteredArticles.Pagination.current_page < filteredArticles.Pagination.num_of_pages)
      setCanPrevPage(filteredArticles.Pagination.current_page > 0)
    }
  }, [filteredArticles]);

  console.log(filteredArticles)

  return (
    <DefaultLayout>
      {filteredArticles && filteredArticles?.Articles.length > 0 ? (
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
                placeholder="Search Articles..."
              />
            </div>
            <div className="mt-4">
              <Table
                headers={[
                  { name: "Article Name", id: "title", link: "articles" },
                  { name: "Category", id: "category_name", link: "category" },
                  { name: "Date Created", id: "dateCreated" },
                ]}
                articles={filteredArticles.Articles}
              />
            </div>
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
      ) : (
        <div className="h-[80vh] w-full flex justify-center items-center">
          <p className="text-2xl">No articles to search</p>
        </div>
      )}
    </DefaultLayout>
  );
};

export default Articles;
