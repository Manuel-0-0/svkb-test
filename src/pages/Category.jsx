import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { getArticleInCategory } from "../api/articleApis";
import { getCategory } from "../api/categoryApis";
import DefaultLayout from "../layout/DefaultLayout";
import CategoryArticles from "../components/CategoryArticles";
import { GlobalContext, showToast } from "../globalContext";
import { getErrorMessage } from "../utilities/functions";

const Category = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState();
  const { dispatch: globalDispatch } = useContext(GlobalContext);
  const [categoryArticles, setCategoryArticles] = useState([]);

  const getSingleCategory = async () => {
    try {
      const response = await getCategory({ id: categoryId });
      setCategory(response.data);
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

  return (
    <DefaultLayout>
      <div className="text-sm px-4 md:px-16 font-medium text-center text-gray-600 mb-4">
        <h1 className="text-3xl my-6">{category?.categoryName}</h1>
        <CategoryArticles articles={categoryArticles} />
      </div>
      
    </DefaultLayout>
  );
};

export default Category;
