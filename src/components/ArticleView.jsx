import React, { useContext } from "react";
import moment from "moment";
import { GlobalContext, showToast } from "../globalContext";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/20/solid";
import parse from "html-react-parser";
import { CopyToClipboard } from "react-copy-to-clipboard";

const ArticleView = ({ article }) => {
  const copiedText = window.location.origin + "/article" + article.id;
  const { dispatch: globalDispatch } = useContext(GlobalContext);

  const handleShowToast = () => {
    showToast(globalDispatch, {
      message: "Copied!",
      type: "success",
    });
  };

  return (
    <div className="lg:w-1/2 mx-auto mt-10">
      <div className="flex items-center">
        <h2 className="mt-4 uppercase tracking-widest text-xs text-gray-600 mr-4">
          {moment(article?.dateCreated).format("Do MMM, YYYY")}
        </h2>
        <CopyToClipboard text={copiedText} onCopy={() => handleShowToast()}>
          <ClipboardDocumentCheckIcon className="h-6 w-6 text-gray-500 cursor" />
        </CopyToClipboard>
      </div>

      <h1 className="font-display text-2xl md:text-3xl text-gray-900 mt-4 flex">
        {article?.title}
      </h1>
      <div className="prose prose-base sm:prose-lg lg:prose-xl mt-6 w-full">
        <p data-color-mode="light"> {parse(`${article?.content}`)}</p>
      </div>
    </div>
  );
};

export default ArticleView;
