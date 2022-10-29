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
    <>
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
      <div className="prose prose-base sm:prose-lg lg:prose-xl mt-6 w-full">
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
    </>
  );
};

export default ArticleView;
