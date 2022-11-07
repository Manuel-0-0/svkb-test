import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Icon from "../utilities/icons/SunValley";
import {
  HomeIcon,
  NewspaperIcon,
  Square3Stack3DIcon,
  UserCircleIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/20/solid";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../authContext";
import { GlobalContext, showToast } from "../globalContext";
import Cookies from "js-cookie";
import Modal from "../components/Modal";

const AuthenticatedLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const { dispatch: globalContext } = useContext(GlobalContext);
  const [modal, showModal] = useState(false);
  const [user] = useState(
    Cookies.get("sv_user") ? Cookies.get("sv_user") : null
  );
  const [userId] = useState(
    Cookies.get("sv_user_id") ? Cookies.get("sv_user_id") : null
  );
  const [token] = useState(
    Cookies.get("sv_token") ? Cookies.get("sv_token") : null
  );

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    showToast(globalContext, {
      message: "Logout Successful!",
      type: "success",
    });
    navigate("/login");
  };

  const navBars = [
    {
      name: "Home",
      icon: <HomeIcon className="h-5 w-5" />,
      active: location.pathname === "/admin/home",
      path: "/admin/home",
    },
    {
      name: "Category",
      icon: <Square3Stack3DIcon className="h-5 w-5" />,
      path: "/admin/category",
      active: location.pathname.startsWith("/admin/category"),
    },
    {
      name: "Article",
      icon: <NewspaperIcon className="h-5 w-5" />,
      path: "/admin/article",
      active: location.pathname.startsWith("/admin/article"),
    },
    // {
    //   name: "Create User",
    //   icon: <UserCircleIcon className="h-5 w-5" />,
    //   path: "/admin/user/create",
    //   active: location.pathname.startsWith("/admin/user"),
    // },
  ];

  useEffect(() => {
    if (user && token && userId) {
      dispatch({
        type: "LOGIN",
        payload: { user: user, token: token, userId: userId },
      });
    } else {
      showToast(globalContext, {
        message: "You need to be Logged in to view",
        type: "error",
      });
      navigate("/login");
    }
  }, []);

  return (
    <main className="bg-gray-100 min-h-screen max-height-screen overflow-hidden">
      <div className="flex items-start justify-between">
        <div className="h-screen block shadow-lg lg:block relative w-80">
          <div className="bg-[#324299] h-full ">
            <div className="flex items-center justify-start pt-6 ml-8">
              <Link to="/">
                <Icon mobile={false} />
              </Link>
            </div>
            <nav className="mt-6">
              <div>
                {navBars.map((navBar) => (
                  <button
                    className={`w-full text-white flex items-center pl-6 p-2 my-2 transition-colors duration-200 justify-start ${
                      navBar.active && "border-l-[4px] border-white"
                    }`}
                    onClick={() => {
                      navigate(navBar.path);
                    }}
                  >
                    {navBar.icon}
                    <span className="mx-2 text-sm font-normal">
                      {navBar.name}
                    </span>
                  </button>
                ))}
                <button
                  className={`w-full text-white flex items-center pl-6 p-2 my-2 transition-colors duration-200 justify-start`}
                  onClick={() => {
                    showModal(true);
                  }}
                >
                  <ArrowLeftOnRectangleIcon className="h-5 w-5" />
                  <span className="mx-2 text-sm font-normal">Logout</span>
                </button>
              </div>
            </nav>
          </div>
        </div>
        <div className="flex flex-col w-full md:space-y-4">
          <div className="w-full pb-10 bg-gray-100 px-5 py-10 min-h-[98vh] max-h-[98vh] overflow-y-auto">
            {children}
          </div>
        </div>
        <Modal
          handleConfirm={handleLogout}
          open={modal}
          setOpen={showModal}
          confirmButton="Yes, logout"
          message="Are you sure you want to log out?"
          messageTitle="Confirm Logout"
        />
      </div>
    </main>
  );
};

export default AuthenticatedLayout;
