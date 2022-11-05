import React, { useState, useEffect } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { getArticle } from "../api/articleApis";
import ArticleView from "../components/ArticleView";
import { Helmet } from "react-helmet";

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
        <Helmet>
          <title>{article?.title} | SunValley</title>
        </Helmet>
        <div className="w-full pb-10 bg-gray-100 px-5 py-10">
          <ArticleView article={article} />
        </div>
      </DefaultLayout>
    );
};

export default Article;
