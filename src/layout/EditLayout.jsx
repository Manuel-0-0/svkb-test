import React from "react";
import { ArrowLeftIcon, TrashIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";

const CreatePageLayout = ({ title, backTo, children, setDeleteOpen }) => {
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
          <h4 className="text-2xl font-bold">Edit {title}</h4>
          <span
            className="flex cursor-pointer border border-red-500 text-red-500 p-2 rounded items-center justify-center"
            onClick={() => setDeleteOpen(true)}
          >
            <TrashIcon className="text-red-500 w-5 h-5  mr-2" />
            <span className="capitalize">Delete {title}</span>
          </span>
        </div>
      </div>
      <div className="pt-5 px-5 pb-0">{children}</div>
    </div>
  );
};

export default CreatePageLayout;
