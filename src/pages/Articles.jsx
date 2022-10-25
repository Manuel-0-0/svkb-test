import React, { useState, useEffect } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import { getArticles, searchForArticle } from "../api/articleApis";
import Table from "../components/Table";

const Articles = () => {
  const [articles, setArticles] = useState();
  const [search, setSearch] = useState();
  const [filteredArticles, setFilteredArticles] = useState();

  useEffect(() => {
    getAllArticles();
  }, []);

  const getAllArticles = async () => {
    try {
      const response = await getArticles();
      setArticles(response.data);
      setFilteredArticles(response.data);
    } catch (err) {}
  };

  const handleChange = async (e) => {
    setSearch(e.target.value);
    if (e.target.value) {
      const response = await searchForArticle({ search: e.target.value });
      setFilteredArticles(response.data);
    } else {
      setFilteredArticles(articles);
    }
  };

  return (
    <DefaultLayout>
      {articles && articles.length > 0 ? (
        <div className="w-9/12 mx-auto p-4">
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
              placeholder="Search Articles..."
              required
            />
          </div>
          <div className="mt-4">
            <Table
              headers={[
                { name: "Article Name", id: "title", link: "articles" },
                { name: "Date Created", id: "dateCreated" },
                { name: "Category", id: "category_name", link: "category" },
              ]}
              articles={filteredArticles}
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
