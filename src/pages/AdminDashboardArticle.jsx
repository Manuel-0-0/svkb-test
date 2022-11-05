import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { getArticle, deleteArticle } from "../api/articleApis";
import ArticleView from "../components/ArticleView";
import AuthenticatedLayout from "../layout/AuthenticatedLayout";
import DeleteModal from "../components/DeleteModal";
import { useNavigate } from "react-router-dom";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/20/solid";
import { Helmet } from "react-helmet";
import { GlobalContext, showToast } from "../globalContext";
import { getErrorMessage } from "../utilities/functions";

const AdminDashboardArticle = () => {
  const { dispatch: globalDispatch } = useContext(GlobalContext);
  const { articleId } = useParams();
  const [loading, setLoading] = useState(false);
  const [article, setArticle] = useState();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const navigate = useNavigate();

  const getSingleArticle = async () => {
    try {
      setLoading(true);
      const response = await getArticle({ id: articleId });
      setArticle(response.data.Article);
      setLoading(false);
    } catch (err) {}
  };

  const handleDeleteArticle = async () => {
    try {
      await deleteArticle({ id: articleId });
      setDeleteOpen(false);
      navigate("/admin/articles");
    } catch (err) {
      const error = getErrorMessage(err);
      showToast(globalDispatch, {
        message: error,
        type: "error",
      });
    }
  };

  useEffect(() => {
    getSingleArticle();
  }, [articleId]);

  if (loading) return <Loading />;
  else if (!loading && article)
    return (
      <AuthenticatedLayout>
        <Helmet>
          <title>{article.title} | SunValley</title>
        </Helmet>
        <div className="w-1/2 mx-auto">
          <div className="flex justify-between w-full max-w-sm mb-4">
            <span
              className="flex cursor-pointer"
              onClick={() => navigate(`/admin/article/edit/${article.id}`)}
            >
              <PencilSquareIcon className="text-blue-500 w-5 h-5 mr-2" />
              Edit Article
            </span>
            <span
              className="flex cursor-pointer"
              onClick={() => setDeleteOpen(true)}
            >
              <TrashIcon className="text-red-500 w-5 h-5  mr-2" />
              Delete Article
            </span>
          </div>
        </div>
        <ArticleView article={article} />
        <DeleteModal
          open={deleteOpen}
          setOpen={setDeleteOpen}
          handleConfirmDelete={handleDeleteArticle}
          deleteMessage="Are you sure you want to delete this article? It cannot be recovered once deleted"
          deleteTitle="Confirm Delete"
        />
      </AuthenticatedLayout>
    );
};

export default AdminDashboardArticle;
