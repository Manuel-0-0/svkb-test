import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { createCategory } from "../api/categoryApis";
import { GlobalContext, showToast } from "../globalContext";
import CreateLayout from "../layout/CreateLayout";

const CreateCategory = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { dispatch: globalDispatch } = useContext(GlobalContext);
  const [categoryName, setCategoryName] = useState("");

  const createNewCategory = async () => {
    try {
      setLoading(true);
      await createCategory({ CategoryName: categoryName })
      setLoading(false);
      setCategoryName("");
      showToast(globalDispatch, {
        message: "Category Created!",
        type: "success",
      });
    
      navigate("/admin/home");
    } catch (err) {
      const error = err.data?.error || err.data;
      showToast(globalDispatch, {
        message: error,
        type: "error",
      });
    }
  };

  return (
    <CreateLayout title="Category" backTo="/admin/category">
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
            New category name
          </label>
        </div>
        <button
          onClick={createNewCategory}
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Submit
        </button>
    </CreateLayout>
  );
};

export default CreateCategory;
