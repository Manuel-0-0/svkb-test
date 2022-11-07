import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";

const CreatePageLayout = ({ title, backTo, children }) => {
  const navigate = useNavigate();
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
        </div>
      </div>
      <div className="pt-5 px-5 pb-0">{children}</div>
    </div>
  );
};

export default CreatePageLayout;
