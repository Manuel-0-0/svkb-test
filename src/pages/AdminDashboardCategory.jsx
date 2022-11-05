import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import AuthenticatedLayout from "../layout/AuthenticatedLayout";
import DeleteModal from "../components/DeleteModal";
import { useNavigate } from "react-router-dom";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/20/solid";
import { getCategory, deleteCategory } from "../api/categoryApis";
import { getArticleInCategory} from "../api/articleApis"
import { Helmet } from "react-helmet";
import { getErrorMessage } from "../utilities/functions";
import { GlobalContext, showToast } from "../globalContext";
import CategoryArticles from "../components/CategoryArticles"

const AdminDashbordCategory = () => {
  const { categoryId } = useParams();
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [categoryArticles, setCategoryArticles] = useState([])
  const { dispatch: globalDispatch } = useContext(GlobalContext);
  const navigate = useNavigate();

  const getSingleCategory = async () => {
    try {
      setLoading(true);
      const response = await getCategory({ id: categoryId });
      setCategory(response.data);
      setLoading(false);
    } catch (err) {
      const error = getErrorMessage(err);
      showToast(globalDispatch, {
        message: error,
        type: "error",
      });
    }
  };

  const handleDeleteCategory = async () => {
    try {
      await deleteCategory({ id: categoryId });
      setDeleteOpen(false);
      navigate("/admin/category");
    } catch (err) {
      const error = getErrorMessage(err);
      showToast(globalDispatch, {
        message: error,
        type: "error",
      });
    }
  };

  const getCategoryArticles = async () => {
    try {
      const response = await getArticleInCategory({ id: categoryId });
      setCategoryArticles(response.data);
    } catch (err) {
      const error = getErrorMessage(err);
      showToast(globalDispatch, {
        message: error,
        type: "error",
      });
    }
  };

  useEffect(() => {
    Promise.all([getSingleCategory(), getCategoryArticles()]);
  }, []);

  if (loading) return <Loading />;
  else if (!loading && category)
    return (
      <AuthenticatedLayout>
        <Helmet>
          <title>{category.categoryName}| SunValley</title>
        </Helmet>
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between w-full max-w-sm mb-4">
            <span
              className="flex cursor-pointer"
              onClick={() => navigate(`/admin/category/edit/${category.id}`)}
            >
              <PencilSquareIcon className="text-blue-500 w-5 h-5 mr-2" />
              Edit Category
            </span>
            <span
              className="flex cursor-pointer"
              onClick={() => setDeleteOpen(true)}
            >
              <TrashIcon className="text-red-500 w-5 h-5  mr-2" />
              Delete Category
            </span>
          </div>
          <div className="mt-10">
            <p className="text-3xl">Category Name: {category.categoryName}</p>
            <p className="text-xl mt-4">
              Number of Articles: {category.articleNum}
            </p>
          </div>
           
        </div>
        <CategoryArticles articles={categoryArticles} />
        <DeleteModal
          open={deleteOpen}
          setOpen={setDeleteOpen}
          handleConfirmDelete={handleDeleteCategory}
          deleteMessage="Are you sure you want to delete this category? All articles within will also be deleted."
          deleteTitle="Confirm Delete"
        />
      </AuthenticatedLayout>
    );
};

export default AdminDashbordCategory;
