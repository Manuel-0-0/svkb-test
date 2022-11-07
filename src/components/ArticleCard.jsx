import React from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import Loading from "./Loading";

const ArticleCard = ({ article }) => {  
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
              <Link to={`/articles/${article.id}`} className="text-[#324299]">
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
