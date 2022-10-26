import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../api/categoryApis";
import { getArticles } from "../api/articleApis";
import DefaultLayout from "../layout/DefaultLayout";
import ArticleCard from "../components/ArticleCard";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);

  const getAllCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
      console.log(typeof response.data)
    } catch (err) {}
  };

  const getAllArticles = async () => {
    try {
      const response = await getArticles();
      setArticles(response.data);
      console.log(typeof response.data)
    } catch (err) {}
  };

  useEffect(() => {
    getAllCategories();
    getAllArticles();
  }, []);

  return (
    <DefaultLayout>
      <div className="h-full flex mt-10 md:mt-10 flex-col items-center">
        <div className="flex justify-center items-center px-4 md:px-16 mb-10 w-full">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-center mb-4 md:mb-8 text-[#324299]">
            Popular Articles
          </h1>
        </div>

        <div className="lg:flex lg:items-center lg:justify-center mb-14 w-full">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3 px-4 md:px-6 w-9/12 mx-auto">
            {articles.length > 0 ? (
              articles.map((article) => (
                <ArticleCard key={article.Article.id} article={article.Article} />
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
              categories.map((category) => (
                <Link
                  key={category.id}
                  to="/category"
                  state={{ categoryId: category.id }}
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
