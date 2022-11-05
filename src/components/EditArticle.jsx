import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import { updateArticle, getArticle, deleteArticle } from "../api/articleApis";
import { convertToHtml } from "mammoth/mammoth.browser";
import "react-quill/dist/quill.snow.css";
import { GlobalContext, showToast } from "../globalContext";
import { formats, modules } from "../utilities/Editor";
import EditLayout from "../layout/EditLayout";
import Loading from "./Loading";
import Modal from "../components/Modal";
import DeleteModal from "./DeleteModal";
import { getErrorMessage } from "../utilities/functions";

const EditArticle = () => {
  const { dispatch: globalDispatch } = useContext(GlobalContext);
  const navigate = useNavigate();
  const { articleId } = useParams();
  const [article, setArticle] = useState();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const getSingleArticle = async () => {
    try {
      setLoading(true);
      const response = await getArticle({ id: articleId });
      setArticle(response.data);
      setTitle(response.data.Article.title);
      setContent(response.data.Article.content);
      setLoading(false);
    } catch (err) {
      const error = getErrorMessage(err);
      showToast(globalDispatch, {
        message: error,
        type: "error",
      });
      if (err.response.status === 404) {
        navigate("/notfound");
      }
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

  const handleDeleteArticle = async () => {
    try {
      await deleteArticle({ id: articleId });
      setDeleteOpen(false);
      navigate("/admin/articles");
    } catch (err) {
      const error = getErrorMessage(err);
      showToast(globalDispatch, {
        message: error,
        type: "error",
      });
    }
  };

  const publishArticle = async () => {
    if (canSave) {
      try {
        await updateArticle({
          id: articleId,
          body: {
            title: title,
            content: content,
            draftStatus: "True",
          },
        });
        setEditOpen(false);
        setTitle("");
        setContent("");
        showToast(globalDispatch, {
          message: "Article Edited Successfully",
          type: "success",
        });
        navigate(`/admin/article/${articleId}`);
      } catch (err) {
        const error = getErrorMessage(err);
        showToast(globalDispatch, {
          message: error,
          type: "error",
        });
      }
    }
  };

  const draftArticle = async () => {
    if (canSave) {
      try {
        await updateArticle({
          id: articleId,
          body: {
            title: title,
            content: content,
            draftStatus: "False",
          },
        });
        setEditOpen(false);
        setTitle("");
        setContent("");
        showToast(globalDispatch, {
          message: "Article Edited Successfully",
          type: "success",
        });
        navigate(`/admin/article/${articleId}`);
      } catch (err) {
        const error = getErrorMessage(err);
        showToast(globalDispatch, {
          message: error,
          type: "error",
        });
      }
    }
  };
  

  useEffect(() => {
    getSingleArticle();
  }, []);

  const canSave = [title, content].every(Boolean) && !loading;

  return (
    <EditLayout
      title="Article"
      backTo={`/admin/article/${articleId}`}
      setDeleteOpen={setDeleteOpen}
    >
      {!loading ? (
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
              className="peer-focus:font-medium peer-focus:text-lg mb-4 absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Article Title
            </label>
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
          <div className="relative flex items-center mb-6 w-fit h-full">
            <button
              onClick={() => setEditOpen(true)}
              type="button"
              className="text-white mr-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center my-4"
            >
              Edit Article
            </button>
            <div>
              <input
                accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                className="block w-full p-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer"
                type="file"
                onChange={(e) => handleChange(e)}
              />
              <p class="mt-1 text-sm text-gray-500">.doc, .docx.</p>
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
      <Modal
        open={editOpen}
        setOpen={setEditOpen}
        handleConfirm={publishArticle}
        secondButton="Save As Draft"
        secondButtonConfirm={draftArticle}
        message="Are you sure you want to edit this article?"
        messageTitle="Confirm Edit"
        confirmButton="Publish Article"
      />
      <DeleteModal
        open={deleteOpen}
        setOpen={setDeleteOpen}
        handleConfirmDelete={handleDeleteArticle}
        deleteMessage="Are you sure you want to delete this article? It cannot be recovered once deleted"
        deleteTitle="Confirm Delete"
      />
    </EditLayout>
  );
};

export default EditArticle;
