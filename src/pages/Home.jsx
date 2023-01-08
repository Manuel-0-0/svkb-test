import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../api/categoryApis";
import { getPublishedArticles } from "../api/articleApis";
import DefaultLayout from "../layout/DefaultLayout";
import ArticleCard from "../components/ArticleCard";
import { GlobalContext, showToast } from "../globalContext";
import { getErrorMessage } from "../utilities/functions";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const { dispatch: globalDispatch } = useContext(GlobalContext);
  const [articles, setArticles] = useState([]);

  const getAllCategories = async () => {
    try {
      const response = await getCategories({ page: 0, limit: 6 });
      setCategories(response.data?.Categories);
    } catch (err) {
      const error = getErrorMessage(err);
      showToast(globalDispatch, {
        message: error,
        type: "error",
      });
    }
  };

  const getAllArticles = async () => {
    try {
      const response = await getPublishedArticles({ page: 0, limit: 6 });
      setArticles(response.data?.Articles);
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
    getAllArticles();
  }, []);

  return (
    <DefaultLayout>
      <div className="h-full flex mt-10 md:mt-10 flex-col items-center">
        <div className="grid justify-items-center px-4 md:px-16 mb-10 w-full">
          <h1 className="text-2xl md:text-2xl font-bold leading-tight text-left mb-2 md:mb-8 text-[#324299]">
            Check out the latest articles...
          </h1>
        </div>

        <div className="lg:flex lg:items-center lg:justify-center mb-14 w-full">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3 px-4 md:px-6 w-9/12 mx-auto">
            {articles.length > 0 ? (
              articles
                .slice(0, 6)
                .map((article) => (
                  <ArticleCard
                    key={article.Article.id}
                    article={article.Article}
                  />
                ))
            ) : (
              <p className="text-xl text-gray-600 mb-2">
                Sorry no articles to show{" "}
              </p>
            )}
          </div>
        </div>
        <div className="lg:flex lg:items-center flex-col lg:justify-center mb-14 w-full ">
          <div className="flex justify-center items-center bg-[#324299] text-white py-4 px-4 md:px-16 mb-10 w-full">
            <h3 className="text-2xl md:text-3xl font-bold leading-tight text-center">
              Categories
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3 px-4 md:px-6 w-9/12 mx-auto text-[#324299] font-bold  text-lg">
            {categories.length > 0 ? (
              categories.slice(0, 9).map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.id}`}
                  className="hover:underline"
                >
                  {category.categoryName}
                </Link>
              ))
            ) : (
              <p className="text-xl text-gray-600 mb-2">
                Sorry no Categories to show{" "}
              </p>
            )}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Home;
