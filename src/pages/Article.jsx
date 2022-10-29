import React, { useState, useEffect } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { getArticle } from "../api/articleApis";
import ArticleView from "../components/ArticleView";

const Article = () => {
  const { articleId } = useParams();
  const [loading, setLoading] = useState(false);
  const [article, setArticle] = useState();

  const getSingleArticle = async () => {
    try {
      setLoading(true);
      const response = await getArticle({ id: articleId });
      setArticle(response.data.Article);
      setLoading(false);
    } catch (err) {}
  };

  useEffect(() => {
    getSingleArticle();
  }, [articleId]);

  if (loading) return <Loading />;
  else if (!loading && article)
    return (
      <DefaultLayout>
        <ArticleView article={article} />
      </DefaultLayout>
    );
};

export default Article;
