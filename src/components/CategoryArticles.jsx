import React from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";

const CategoryArticles = ({ articles }) => {
    console.log(articles)
  return (
    <>
      {articles && articles.length > 0 ? (
        <div className="lg:flex lg:items-center lg:justify-center mt-5 w-full">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-4 md:px-6 w-10/12 mx-auto">
            {articles.map((article) => (
              <div
                key={article?.Article.id}
                className="shadow-lg max-w-sm rounded-t-md overflow-hidden"
              >
                <div className="">
                  <div className=" block px-5 py-3 text-lg font-bold bg-[#324299] text-white">
                    <div className="">{article?.Article.title}</div>
                  </div>

                  <div className="px-6 py-3">
                    <p className="text-sm text-left ">
                      {parse(`${article?.Article.content.substring(0, 250)}...`)}
                    </p>
                  </div>
                  <div className="py-4 px-6  text-left">
                    <Link
                      to={`/articles/${article?.Article.id}`}
                      className="text-[#324299]"
                    >
                      Learn more...
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
      {articles.length === 0 && (
        <p className="text-xl text-gray-600 mb-2">
          Sorry no Articles in this category{" "}
        </p>
      )}
    </>
  );
};

export default CategoryArticles;
