import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getArticle } from "../api/articleApis";
import parse from "html-react-parser";
import Loading from "./Loading";

const ArticleCard = ({ articleId }) => {
  const [article, setArticle] = useState();

  const getSingleArticle = async () => {
    try {
      const response = await getArticle({ id: articleId });
      setArticle(response.data);
    } catch (err) {}
  };

  useEffect(() => {
    getSingleArticle();
  }, [articleId]);
  
  return (
    <>
      {article ? (
        <div className="shadow-lg max-w-sm rounded-t-md overflow-hidden">
          <div className="">
            <div className=" block px-5 py-3 text-lg font-bold bg-[#324299] text-white">
              <div className="">{article.title}</div>
            </div>

            <div className="px-6 py-3">
              <p className="text-sm text-left ">
                {parse(`${article.content.substring(0, 250)}...`)}
              </p>
            </div>
            <div className="py-4 px-6  text-left">
              <Link to={`/articles/${articleId}`} className="text-[#324299]">
                Learn more...
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ArticleCard;
