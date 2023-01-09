import React, { useEffect, useState, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import { NewspaperIcon, TrashIcon, PencilIcon } from "@heroicons/react/20/solid";
import { AuthContext } from "../authContext";
import { getCategories } from "../api/categoryApis";
import {
  getUserArticles,
  deleteArticle,
  updateArticle,
} from "../api/articleApis";
import moment from "moment";
import Cookies from "js-cookie";
import DeleteModal from "../components/DeleteModal";
import { Helmet } from "react-helmet";
import { GlobalContext, showToast } from "../globalContext";
import { getErrorMessage } from "../utilities/functions";
import AuthenticatedLayout from "../layout/AuthenticatedLayout";
import PaginationBar from "../components/PaginationBar";
import { PageSize } from "../utilities/functions";

const AdminDashboardHome = () => {
  const { state } = useContext(AuthContext);
  const { dispatch: globalDispatch } = useContext(GlobalContext);
  const [articles, setArticles] = useState();
  const [categories, setCategories] = useState();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [progress, setProgress] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize,] = useState(PageSize);
  const [totalNumber, setTotalNumber] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [canNextPage, setCanNextPage] = useState(false);
  const [canPrevPage, setCanPrevPage] = useState(false);

  const prevPage = () => {
    setPageNumber(pageNumber - 1 > 0 ? pageNumber - 1 : 0);
  };

  const nextPage = () => {
    setPageNumber(pageNumber + 1 <= pageCount ? pageNumber + 1 : 0);
  };

  const onPageChange = (number) => {
    setPageNumber(number)
  }

  const getAllCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (err) {
      const error = getErrorMessage(err);
      showToast(globalDispatch, {
        message: error,
        type: "error",
      });
    }
  };

  const generateGreetings = () => {
    const currentHour = moment().format("HH");
    if (currentHour >= 5 && currentHour < 12) {
      return "Good Morning";
    } else if (currentHour >= 12 && currentHour < 17) {
      return "Good Afternoon";
    } else if (currentHour >= 17 && currentHour < 20) {
      return "Good Evening";
    } else if (currentHour >= 20) {
      return "Good Night";
    } else {
      return "Hello"
    }
  }

  const getAllArticles = useCallback(async () => {
    try {
      const response = await getUserArticles({ id: Cookies.get("sv_user_id"), page: pageNumber, limit: pageSize });
      setArticles(response.data);
      const published = response.data.Articles.filter(
        (article) => article.Article.draftStatus === true
      ).length;
      const total = response.data.Articles.length;
      if (published > 0 && total > 0) {
        setProgress((published / total) * 100);
      }
    } catch (err) {
      const error = getErrorMessage(err);
      showToast(globalDispatch, {
        message: error,
        type: "error",
      });
    }
  }, [pageNumber])

  const publishArticle = async (id, article) => {
    try {
      await updateArticle({
        id: id,
        body: {
          title: article.title,
          content: article.content,
          draftStatus: article.draftStatus ? "False" : "True",
        },
      });

      showToast(globalDispatch, {
        message: "Article Status Updated Successfully",
        type: "success",
      });
      getAllArticles()
    } catch (err) {
      const error = getErrorMessage(err);
      showToast(globalDispatch, {
        message: error,
        type: "error",
      });
    }
  };

  const handleDeleteArticle = async () => {
    try {
      await deleteArticle({ id: deleteId });
      getAllArticles();
      setDeleteOpen(false);
      setDeleteId(null);
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
  }, []);

  useEffect(() => {
    getAllArticles()
  }, [getAllArticles])

  useEffect(() => {
    if (articles) {
      setPageNumber(articles.Pagination.current_page);
      setTotalNumber(articles.Pagination.total_articles);
      setPageCount(articles.Pagination.num_of_pages);
      setCanNextPage(articles.Pagination.current_page < articles.Pagination.num_of_pages - 1)
      setCanPrevPage(articles.Pagination.current_page > 0)
    }
  }, [articles]);

  const myStyle = {
    width: `${progress}%`,
  };
  return (
    <AuthenticatedLayout>
      <>
        <Helmet>
          <title>Admin Home | SunValley</title>
        </Helmet>
        {articles && categories ? (
          <div className="overflow-auto h-screen pb-24 px-4 md:px-6">
            <h1 className="text-4xl font-semibold mt-10 text-gray-800">
              {generateGreetings()}, {state.user}
            </h1>
            <h2 className="text-md mt-4 text-gray-400">
              Here&#x27;s what&#x27;s happening with your SunValley account.
            </h2>
            <div className="flex my-6 items-center w-full space-y-4 md:space-x-4 md:space-y-0 flex-col md:flex-row">
              <div className="w-full md:w-6/12">
                <div className="shadow-lg w-full bg-white relative overflow-hidden">
                  <div className="w-full h-full block">
                    <div className="flex items-center justify-between px-4 py-6 space-x-4">
                      <div className="flex items-center">
                        <span className="rounded-full relative p-2 bg-yellow-100">
                          <NewspaperIcon className="w-5 h-5" />
                        </span>
                        <p className="text-sm text-gray-700 ml-2 font-semibold border-b border-gray-200">
                          Total number of articles : {articles.Pagination.total_articles}
                        </p>
                      </div>
                      <div className="border-b border-gray-200 mt-6 md:mt-0 text-black font-bold text-xl">
                        {
                          articles.Articles.filter(
                            (article) => article.Article.draftStatus === true
                          ).length
                        }
                        <span className="text-xs text-gray-400">
                          /{articles.Articles.length} published on page {articles.Pagination.current_page + 1}
                        </span>
                      </div>
                    </div>
                    <div className="w-full h-3 bg-gray-100">
                      <div
                        className="w-full h-full text-center text-xs text-white bg-green-400"
                        style={myStyle}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center w-full md:w-1/2 space-x-4">
                <div className="w-1/2">
                  <div className="shadow-lg px-4 py-6 w-full bg-white relative">
                    <p className="text-2xl text-black font-bold">
                      {categories.Categories.length}
                    </p>
                    <p className="text-gray-400 text-sm">Categories Created</p>
                  </div>
                </div>
                <div className="w-1/2">
                  <div className="shadow-lg px-4 py-6 w-full bg-white relative">
                    <p className="text-2xl text-black font-bold">
                      {articles.Pagination.total_articles}
                    </p>
                    <p className="text-gray-400 text-sm">Articles Created</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500">
                <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white">
                  Your Articles
                  <p className="mt-1 text-sm font-normal text-gray-500">
                    Browse a list of Articles you have created.
                  </p>
                </caption>
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      Article name
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Status
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Category
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Date Created
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Actions
                    </th>
                  </tr>
                </thead>
                {articles.Articles.map((article) => (
                  <tbody key={article.Article.id}>
                    <tr className="bg-white border-b">
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
                      >
                        <Link
                          to={`/admin/article/${article.Article.id}`}
                          className="font-medium text-blue-600 hover:underline mr-4 "
                        >
                          {article.Article.title}
                        </Link>
                      </th>
                      <td className="py-4 px-6">
                        {article.Article.draftStatus ? "Published" : "Draft"}
                      </td>
                      <td className="py-4 px-6">{article.category_name}</td>
                      <td className="py-4 px-6">
                        {moment(article.Article.dateCreated).format(
                          "DD, MMMM YYYY"
                        )}
                      </td>

                      <td className="py-4 px-6 text-right flex">
                        <Link
                          to={`/admin/article/edit/${article.Article.id}`}
                          className="font-medium text-blue-600 hover:underline mr-4 "
                        >
                          <PencilIcon className="w-5 h-5" />
                        </Link>

                        <button
                          className="font-medium text-blue-600"
                          onClick={() => {
                            setDeleteId(article.Article.id);
                            setDeleteOpen(true);
                          }}
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>

                        <button
                          onClick={() =>
                            publishArticle(
                              article.Article.id,
                              article.Article
                            )
                          }
                          className="font-medium text-blue-600  ml-4 "
                        >
                          {article.Article.draftStatus
                            ? "Draft Article"
                            : "Publish Now"}
                        </button>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>

              <PaginationBar
                currentPage={pageNumber}
                pageSize={pageSize}
                canPrevPage={canPrevPage}
                canNextPage={canNextPage}
                nextPage={nextPage}
                prevPage={prevPage}
                onPageChange={onPageChange}
                totalNumber={totalNumber}
              />
            </div>
            <DeleteModal
              open={deleteOpen}
              setOpen={setDeleteOpen}
              handleConfirmDelete={handleDeleteArticle}
              deleteMessage={
                "Are you sure you want to delete this Article? it cannot be recovered afterwards"
              }
              deleteTitle={"Delete Article"}
            />
          </div>
        ) : null}
      </>
    </AuthenticatedLayout>
  );
};

export default AdminDashboardHome;
