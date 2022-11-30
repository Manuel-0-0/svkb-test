import React, { useState, useEffect, useMemo } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import { getPublishedArticles, searchForPublishedArticle } from "../api/articleApis";
import Table from "../components/Table";
import debounce from "lodash.debounce"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const Articles = () => {
  const [articles, setArticles] = useState();
  const [search, setSearch] = useState();
  const [filteredArticles, setFilteredArticles] = useState();

  useEffect(() => {
    getAllArticles();
  }, []);

  const getAllArticles = async () => {
    try {
      const response = await getPublishedArticles();
      setArticles(response.data);
      setFilteredArticles(response.data);
    } catch (err) { }
  };

  const handleChange = async (e) => {
    setSearch(e.target.value);
    if (e.target.value) {
      const response = await searchForPublishedArticle({ search: e.target.value })
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

  return (
    <DefaultLayout>
      {articles && articles.length > 0 ? (
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
                articles={filteredArticles}
              />
            </div>
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
