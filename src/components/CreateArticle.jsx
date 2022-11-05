import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import { getCategories } from "../api/categoryApis";
import { createArticle } from "../api/articleApis";
import { convertToHtml } from "mammoth/mammoth.browser";
import "react-quill/dist/quill.snow.css";
import DropDown from "./DropDown";
import { GlobalContext, showToast } from "../globalContext";
import { formats, modules } from "../utilities/Editor";
import CreateLayout from "../layout/CreateLayout";
import { getErrorMessage } from "../utilities/functions";

const CreateArticle = () => {
  const { dispatch: globalDispatch } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [category, setCategory] = useState();
  const [categories, setCategories] = useState();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const getAllCategories = async () => {
    try {
      setLoading(true);
      const response = await getCategories();
      setCategories(response.data);
      setLoading(false);
    } catch (err) {
      const error = getErrorMessage(err)
        showToast(globalDispatch, {
          message: error,
          type: "error",
        });
    }
  };

  const handleChange = (event) => {
    readFileInputEventAsArrayBuffer(event, async function (arrayBuffer) {
      const result = await convertToHtml({ arrayBuffer: arrayBuffer });
      setContent((prevContent) => prevContent + result.value);
    });
  };

  function readFileInputEventAsArrayBuffer(event, callback) {
    var file = event.target.files[0];

    var reader = new FileReader();

    reader.onload = function (loadEvent) {
      var arrayBuffer = loadEvent.target.result;
      callback(arrayBuffer);
    };

    reader.readAsArrayBuffer(file);
  }

  useEffect(() => {
    getAllCategories();
  }, []);

  const canSave = [title, content, category?.id].every(Boolean) && !loading;

  const createNewArticle = async (draft) => {
    if (canSave) {
      try {
        await createArticle({
          title: title,
          content: content,
          CategoryId: category.id,
          draftStatus: draft,
        });
        setTitle("");
        setContent("");

        showToast(globalDispatch, {
          message: " Article created Successfully",
          type: "success",
        });
        navigate("/admin/home");
      } catch (err) {
        const error = getErrorMessage(err)
        showToast(globalDispatch, {
          message: error,
          type: "error",
        });
      }
    } else {
      if (!category?.id) {
        showToast(globalDispatch, {
          message: "Please select a category",
          type: "error",
        });
      } else if (!title) {
        showToast(globalDispatch, {
          message: "Please Add a title",
          type: "error",
        });
      } else {
        showToast(globalDispatch, {
          message: "Please add a content",
          type: "error",
        });
      }
    }
  };
  return (
    <CreateLayout title="Article" backTo="/admin/article">
      {categories && (
        <>
          <div className="relative z-0 mb-6 w-full group">
            <input
              type="text"
              name="article_name"
              id="article_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <label
              htmlFor="article_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Article Title
            </label>
          </div>
          <div className="relative z-10 mb-6 w-full group mt-4">
            <DropDown
              data={categories}
              identifier={"id"}
              name={"categoryName"}
              selected={category}
              setSelected={setCategory}
              defaultName={"Categories"}
            />
          </div>
          <div className="relative flex flex-1 flex-col z-0 mb-6 w-full h-full ">
            <label
              htmlFor="content"
              className="block mb-2 text-lg font-medium text-gray-900 "
            >
              Content
            </label>
            <ReactQuill
              theme="snow"
              placeholder="Write Something..."
              formats={formats}
              modules={modules}
              className="block p-2.5 w-full h-96 text-sm flex-1 overflow-y-auto"
              value={content}
              onChange={setContent}
            />
          </div>
          <div>
            <input
              accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              className="block w-full p-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer"
              type="file"
              onChange={(e) => handleChange(e)}
            />
            <p class="mt-1 text-sm text-gray-500">.doc, .docx.</p>
          </div>
          <div className="relative flex items-center mb-6 w-fit h-full">
            <button
              onClick={() => createNewArticle("True")}
              type="button"
              className="text-white mr-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center my-4"
            >
              Publish
            </button>
            <button
              onClick={() => createNewArticle("False")}
              type="button"
              className="text-white mr-4 bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center my-4"
            >
              Save as Draft
            </button>
          </div>
        </>
      )}
    </CreateLayout>
  );
};

export default CreateArticle;
