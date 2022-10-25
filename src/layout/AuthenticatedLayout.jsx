import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Icon from "../utilities/icons/SunValley";
import {
  HomeIcon,
  NewspaperIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/20/solid";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../authContext";
import { GlobalContext, showToast } from "../globalContext";
import Cookies from "js-cookie";
// import DashboardHome from "../components/DashboardHome";
// import AdminDashboardArticle from "../components/AdminDashboardArticle";
// import AdminDashboardCategory from "../components/AdminDashboardCategory";

const AuthenticatedLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const { dispatch: globalContext } = useContext(GlobalContext);
  const [user] = useState(
    Cookies.get("sv_user") ? Cookies.get("sv_user") : null
  );
  const [token] = useState(
    Cookies.get("sv_token") ? Cookies.get("sv_token") : null
  );

  console.log(location.pathname)

  const navBars = [
    {
      name: "Home",
      //   component: <DashboardHome />,
      icon: <HomeIcon className="h-5 w-5" />,
      active: location.pathname === "/admin/home",
      path: "/admin/home",
    },
    {
      name: "Category",
      //   component: <AdminDashboardCategory />,
      icon: <Square3Stack3DIcon className="h-5 w-5" />,
      path: "/admin/category",
    },
    {
      name: "Article",
      //   component: <AdminDashboardArticle />,
      icon: <NewspaperIcon className="h-5 w-5" />,
      path: "/admin/article",
    },
  ];

  useEffect(() => {
    if (user && token) {
      dispatch({ type: "LOGIN", payload: { user: user, token: token } });
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
              </div>
            </nav>
          </div>
        </div>

        <div className="flex flex-col w-full md:space-y-4">
          <div className="w-full pb-10 bg-gray-100 px-5 py-10 min-h-[98vh] max-h-[98vh] overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AuthenticatedLayout;
