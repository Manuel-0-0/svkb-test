import React from "react";
import { Link } from "react-router-dom";

const ArticleTable = ({ headers, articles }) => {
  return (
    <div className="overflow-x-auto relative">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            {headers.map((header, index) => (
              <th key={index} scope="col" className="py-3 px-6">
                {header.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {articles?.length > 0 &&
            articles.map((art) => (
              <tr key={art.id} className="bg-white border-b ">
                {headers.map((header) => {
                  if (header?.link) {
                    return (
                      <td
                        key={art.id}
                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
                      >
                        <Link
                          key={art.id}
                          to={`/${header.link}/${art.id}`}
                          className="hover:underline"
                        >
                          {art[header.id]}
                        </Link>
                      </td>
                    );
                  }
                  return (
                    <td
                      key={art.id}
                      className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {art[header.id]}
                    </td>
                  );
                })}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArticleTable;
