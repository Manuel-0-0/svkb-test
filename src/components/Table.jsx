import React from "react";
import { Link } from "react-router-dom";

const ArticleTable = ({ headers, articles }) => {
  return (
    <div className="overflow-x-auto relative">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index * Math.floor(Math.random() * 1000)}
                scope="col"
                className="py-3 px-6"
              >
                {header.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {articles?.length > 0 &&
            articles.map((art, index) => (
              <tr key={index} className="bg-white border-b ">
                {headers.map((header) => {
                  if (header?.link) {
                    return (
                      <td
                        key={
                          art?.Article[header?.id]
                            ? art.Article[header?.id]
                            : art[header?.id] * Math.floor(Math.random() * 1000)
                        }
                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
                      >
                        <Link
                          key={
                            art?.Article[header?.id]
                              ? art?.Article[header?.id]
                              : art[header?.id] *
                                Math.floor(Math.random() * 1000)
                          }
                          to={`/${header.link}/${
                            art?.Article?.id
                              ? art?.Article?.id
                              : art?.id
                          }`}
                          className="hover:underline"
                        >
                          {art?.Article[header?.id]
                            ? art?.Article[header?.id]
                            : art[header?.id]}
                        </Link>
                      </td>
                    );
                  }
                  return (
                    <td
                      key={
                        art?.Article[header?.id]
                          ? art?.Article[header?.id]
                          : art[header?.id] * Math.floor(Math.random() * 1000)
                      }
                      className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {art?.Article[header?.id]
                        ? art?.Article[header?.id]
                        : art[header?.id]}
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
