import React, { useContext } from "react";
import {
  XMarkIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { GlobalContext } from "../globalContext";

const Toast = () => {
  const { dispatch, state } = useContext(GlobalContext);
  const message = state.message
  const messageType = state.type

  return (
    <div
      className={`${
        message && messageType ? "flex" : "hidden"
      } fixed z-50 top-5 right-5 items-center p-4 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow`}
      role="alert"
    >
      <div
        className={`inline-flex flex-shrink-0 justify-center items-center w-8 h-8 ${
          messageType === "success"
            ? "text-green-500 bg-green-100 "
            : "text-red-500 bg-red-100 "
        }rounded-lg`}
      >
        {messageType === "success" ? (
          <CheckCircleIcon className="w-5 h-5" />
        ) : (
          <ExclamationCircleIcon className="w-5 h-5" />
        )}

        <span className="sr-only">{messageType} icon</span>
      </div>
      <div className="ml-3 text-sm font-normal">{message}</div>
      {/* <button
        type="button"
        onClick={() => dispatch(removeToast())}
        className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8"
        aria-label="Close"
      >
        <span className="sr-only">Close</span>
        <XMarkIcon className="w-5 h-5" />
      </button> */}
    </div>
  );
};

export default Toast;
