import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import parse from "html-react-parser";

const PreviewModal = ({ modal, onModalClose, title, content }) => {
    const [open, setOpen] = useState(false);
    const cancelButtonRef = useRef(null);

    useEffect(() => {
        setOpen(modal);
    }, [modal]);

    return (
        <Transition appear show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={onModalClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-10 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-h-[850px] transform overflow-y-auto rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="div"
                                    className="flex justify-between"
                                >
                                    <Dialog.Title
                                        as="h1"
                                        className="font-display text-2xl md:text-3xl text-gray-900 mt-4 flex items-center"
                                    >
                                        {title}
                                        <span className="ml-4 text-lg bg-blue-400 text-blue-600 p-2 rounded-lg">Preview</span>

                                    </Dialog.Title>

                                    <XMarkIcon className="w-6 h-7" onClick={onModalClose} />

                                </Dialog.Title>
                                <div className="prose prose-base sm:prose-lg lg:prose-xl mt-6 w-full">
                                    <p data-color-mode="light" className="normal-case"> {parse(content)}</p>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default PreviewModal;
