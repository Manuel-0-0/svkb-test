import React, { useContext } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import {
  Bars4Icon,
  XMarkIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useLocation, Link } from "react-router-dom";
import Icon from "../utilities/icons/SunValley";
import Cookies from "js-cookie";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header = () => {
  const location = useLocation();
  const user = Cookies.get("sv_user");
  let navigation = [
    {
      name: "Home",
      href: "/",
      current: location.pathname === "/" ? true : false,
    },
    {
      name: "Articles",
      href: "/articles",
      current: location.pathname.startsWith("/articles") ? true : false,
    },
    {
      name: "Categories",
      href: "/categories",
      current: location.pathname.startsWith("/categories") ? true : false,
    },
    {
      name: user ? <UserCircleIcon className="w-10 h-10" /> : "Login",
      href: user ? "/admin/home" : "/login",
      current: location.pathname === "/login" ? true : false,
      noOutline : true
    },
  ];

  return (
    <>
      <Disclosure
        as="nav"
        className=" relative w-screen bg-[#324299] h-full z-20"
      >
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto py-2 sm:py-4 px-2">
              <div className="relative flex z-10 items-center justify-between h-16">
                <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars4Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex-1 flex items-stretch justify-start px-2">
                  <div className="flex-shrink-0 flex items-center">
                    <Link to="/">
                      <Icon />
                    </Link>
                  </div>
                  <div className="hidden sm:block my-auto ml-auto lg:mr-12 lg:items-center lg:w-auto lg:space-x-12">
                    <div className="flex items-center space-x-4">
                      {navigation.map((item, idx) => (
                        <div key={idx}>
                          <Link
                            to={item.href}
                            key={item.name}
                            className={classNames(
                              item.current &&
                                "bg-white text-[#324299] hover:text-[#324299]",
                              "px-3 py-2 rounded-md text-sm text-white font-medium outline outline-0 hover:outline-1 hover:text-white",
                              item?.noOutline && "hover:outline-0"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Transition
              show={open}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Disclosure.Panel
                className={`sm:hidden bg-blue-50 fixed h-screen px-14 slider ${
                  open ? "slide-in" : "slide-out"
                }`}
              >
                <div className="px-2 animate-slideUp-header pt-2 pb-3 flex flex-col">
                  {navigation.map((item, idx) => (
                    <div key={idx}>
                      <Link
                        to={item.href}
                        key={idx}
                        className={classNames(
                          item.current && "underline",
                          " px-3 mx-auto self-start py-2 rounded-md text-base font-medium"
                        )}
                      >
                        <Disclosure.Button
                          as="div"
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </Disclosure.Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </>
  );
};

export default Header;
