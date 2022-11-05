import React, { useState } from "react";
import { Link } from "react-router-dom";
import ContactModal from "../components/ContactModal";

const Footer = () => {
  const [open, setOpen] = useState(false);

  const onModalClose = () => setOpen(false);
  return (
    <>
      <div className="bg-[#324299] overflow-hidden">
        <div className="divide-y divide-white">
          <div className="lg:w-10/12 lg:mx-auto text-white">
            <div className="flex flex-col py-6 px-8 sm:grid sm:grid-cols-2 sm:gap-4 mt-12">
              <div>
                <p className="font-bold mb-2">it@sunvalley.com</p>
                <p className="font-bold mb-2">+1 ( 208 ) 622 2044 </p>
                <p className="font-bold">1 Sun Valley Rd, Sun Valley, ID 83353, United States</p>
              </div>
              <div>
                <p className="font-bold mt-3 sm:mt-0">Menu</p>
                <ul className="list-none">
                  <li className="my-2">
                    <Link to="/" className="hover:underline">
                      Homepage
                    </Link>
                  </li>
                  <li className="my-2">
                    <Link to="/articles" className="hover:underline">
                      Articles
                    </Link>
                  </li>
                  <li className="my-2">
                    <Link to="/login" className="hover:underline">
                      Login
                    </Link>
                  </li>
                  <li>
                    <button onClick={() => setOpen(true)}>Contact us</button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="sm:flex px-8 sm:justify-between py-2">
              <div>
                <p className="whitespace-nowrap my-4">
                  &copy; Copyright SV KB 2022
                </p>
              </div>
              <div>
                {" "}
                <p className="whitespace-nowrap">
                  SV KB - All Right Reserved
                </p>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ContactModal modal={open} onModalClose={onModalClose} />
    </>
  );
};

export default Footer;
