import React, { useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import PreviewModal from "../components/PreviewModal"

const CreatePageLayout = ({ title, backTo, children, articleTitle, articleContent }) => {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false)

  const onModalClose = () => {
    setModal(false)
  }
  return (
    <div className=" rounded bg-white mx-auto ">
      <div className=" px-5 py-3">
        <div>
          <button
            type="button"
            onClick={() => navigate(backTo)}
            className="font-semibold text-sm pr-5 py-2.5 text-center inline-flex items-center mr-2 mb-2"
          >
            <ArrowLeftIcon className="h-4 w-4" />{" "}
            <span className="ml-2">Back</span>
          </button>
        </div>
        <div className="flex justify-between">
          <h4 className="text-2xl font-bold">Create new {title}</h4>
          {title === "Article" && articleTitle !== "" && articleContent !== "" ? <button className="text-white bg-blue-500 hover:bg-blue-600 p-2 rounded-lg" onClick={() => setModal(true)}>Preview Article</button> : null}

        </div>
      </div>
      <div className="pt-5 px-5 pb-0">{children}</div>
      {title === "Article" && articleTitle !== "" && articleContent !== "" && modal === true ? <PreviewModal modal={modal} onModalClose={onModalClose} title={articleTitle} content={articleContent} /> : null}

    </div>
  );
};

export default CreatePageLayout;
