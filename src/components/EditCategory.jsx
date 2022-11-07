import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getCategory,
  updateCategory,
  deleteCategory,
} from "../api/categoryApis";
import { GlobalContext, showToast } from "../globalContext";
import EditLayout from "../layout/EditLayout";
import Loading from "./Loading";
import Modal from "../components/Modal";
import DeleteModal from "./DeleteModal";
import { getErrorMessage } from "../utilities/functions";

const EditCategory = () => {
  const { dispatch: globalDispatch } = useContext(GlobalContext);
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const [categoryName, setCategoryName] = useState();
  const [loading, setLoading] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const getSingleCategory = async () => {
    try {
      setLoading(true);
      const response = await getCategory({ id: categoryId });
      setCategoryName(response.data.categoryName);
      setLoading(false);
    } catch (err) {
      const error = getErrorMessage(err);
      showToast(globalDispatch, {
        message: error,
        type: "error",
      });
      if (err.response.status === 404) {
        navigate("/notfound");
      }
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

  const editCategory = async () => {
    if (canSave) {
      try {
        await updateCategory({
          id: categoryId,
          body: {
            CategoryName: categoryName,
          },
        });
        setEditOpen(false);
        showToast(globalDispatch, {
          message: "Category Edited Successfully",
          type: "success",
        });
        navigate(`/admin/category/${categoryId}`);
      } catch (err) {
        const error = getErrorMessage(err);
        showToast(globalDispatch, {
          message: error,
          type: "error",
        });
      }
    }
  };

  useEffect(() => {
    getSingleCategory();
  }, []);

  const canSave = [categoryName].every(Boolean) && !loading;

  return (
    <EditLayout
      title="Category"
      backTo={`/admin/category/${categoryId}`}
      setDeleteOpen={setDeleteOpen}
    >
      {!loading ? (
        <>
          {" "}
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="text"
              name="category_name"
              id="category_name"
              onChange={(e) => setCategoryName(e.target.value)}
              value={categoryName}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="category_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Category Name
            </label>
          </div>
          <button
            onClick={editCategory}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Submit
          </button>
        </>
      ) : (
        <Loading />
      )}
      <Modal
        open={editOpen}
        setOpen={setEditOpen}
        handleConfirm={editCategory}
        message="Are you sure you want to edit this category?"
        messageTitle="Confirm Edit"
        confirmButton="Edit Category"
      />
      <DeleteModal
        open={deleteOpen}
        setOpen={setDeleteOpen}
        handleConfirmDelete={handleDeleteCategory}
        deleteMessage="Are you sure you want to delete this category? All articles within will also be deleted"
        deleteTitle="Confirm Delete"
      />
    </EditLayout>
  );
};

export default EditCategory;
