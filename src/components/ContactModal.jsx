import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

const ContactModal = ({ modal, onModalClose }) => {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    setOpen(modal);
  }, [modal]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-30 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={onModalClose}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-center bg-white rounded-lg py-20 overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
              <div className=" flex flex-wrap py-6 w-1/2 mx-auto justify-between ">
                <div className="">
                <a href="mailto:it@sunvalley.com" className="hover:brightness-75" >
                <img
                    src="https://res.cloudinary.com/dz0oop5kb/image/upload/v1664340164/svco/Gmail_icon__2020_1_owruyd.png"
                    alt=""
                  />
                  </a>{" "}
                  
                </div>

                <div className="border"></div>

                <div className="">
                  
                   <a href="https://sinclairoil.atlassian.net/servicedesk/customer/user/login?destination=portals" className="hover:brightness-75"><img
                    src="https://res.cloudinary.com/dz0oop5kb/image/upload/v1664340164/svco/jira_png_1_pz5szx.png"
                    alt=""
                  /></a>
                </div>
              </div>
              <div className="text-lg font-semibold mb-3">
                Send us an Email
                <span className="text-sm font-normal">  or  </span>{" "}
                  Put in a Service Ticket
              </div>
              <hr className="w-1/2 mx-auto" />
              <div className="w-full flex justify-center mt-3 items-center flex-col">
                <div className="">
                  <img
                    src="https://res.cloudinary.com/dz0oop5kb/image/upload/v1664340164/svco/icon__phone__jdq006.png"
                    alt=""
                  />
                </div>
                <p className="py-3 text-sm">Call Using +1 (208) 622 2044 </p>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ContactModal;
