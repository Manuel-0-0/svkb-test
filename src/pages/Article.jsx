import React, { useState, useEffect, useContext } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import { GlobalContext, showToast } from "../globalContext";
import {
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/20/solid";
import parse from "html-react-parser";
import Loading from "../components/Loading";
import { getArticle } from "../api/articleApis";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Article = () => {
  const { articleId } = useParams();
  const { dispatch: globalDispatch } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const copiedText = window.location.href;

  const [article, setArticle] = useState();

  const getSingleArticle = async () => {
    try {
      setLoading(true);
      const response = await getArticle({ id: articleId });
      setArticle(response.data.Article);
      setLoading(false);
    } catch (err) {}
  };

  const handleShowToast = () => {
    showToast(globalDispatch, {
      message: "Copied!",
      type: "success",
    });
  };

  useEffect(() => {
    getSingleArticle();
  }, [articleId]);

  if (loading) return <Loading />;
  else if (!loading && article)
    return (
      <DefaultLayout>
        <div className="max-w-4xl mx-auto bg-white py-12 px-12">
          <div className="flex items-center">
            <h2 className="mt-4 uppercase tracking-widest text-xs text-gray-600">
              {moment(article?.dateCreated).format("Do MMM, YYYY")}
            </h2>
            <CopyToClipboard text={copiedText} onCopy={() => handleShowToast()}>
              <ClipboardDocumentCheckIcon className="h-6 my-auto w-6 text-gray-500 cursor" />
            </CopyToClipboard>
          </div>

          <h1 className="font-display text-2xl md:text-3xl text-gray-900 mt-4 flex">
            {article?.title}
          </h1>
          <div className="prose prose-sm sm:prose lg:prose-lg mt-6">
            <p data-color-mode="light"> {parse(`${article?.content}`)}</p>
          </div>

          <div className="text-lg mt-10 font-bold">
            {/* <p className="text-gray-900 leading-none">
              Created By :
              {user && user._id === carPost.createdBy._id
                ? " You"
                : carPost.createdBy.firstName +
                  " " +
                  carPost.createdBy.lastName}
            </p>
            <p className="text-gray-900 leading-none mt-4">
              Contact : {carPost.createdBy.email}
            </p> */}
          </div>
        </div>
      </DefaultLayout>
    );
};

export default Article;
