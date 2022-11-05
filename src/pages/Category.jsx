import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { getPublishedArticlesInCategory } from "../api/articleApis";
import DefaultLayout from "../layout/DefaultLayout";
import CategoryArticles from "../components/CategoryArticles";
import { GlobalContext, showToast } from "../globalContext";
import { getErrorMessage } from "../utilities/functions";
import { Helmet } from "react-helmet";

const Category = () => {
  const { categoryId } = useParams();
  const { dispatch: globalDispatch } = useContext(GlobalContext);
  const [categoryArticles, setCategoryArticles] = useState({});

  const getCategoryArticles = async () => {
    try {
      const response = await getPublishedArticlesInCategory({ id: categoryId });
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
     getCategoryArticles();
  }, []);

  return (
    <DefaultLayout>
      <Helmet>
        <title>{categoryArticles[0]?.category_name ? categoryArticles[0].category_name : 'Category'} | SunValley</title>
      </Helmet>
      <div className="text-sm px-4 md:px-16 font-medium text-center text-gray-600 mb-4">
        <h1 className="text-3xl my-6">{categoryArticles[0]?.category_name}</h1>
        <CategoryArticles articles={categoryArticles} />
      </div>
      
    </DefaultLayout>
  );
};

export default Category;
