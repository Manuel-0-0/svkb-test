import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

function PaginationBar({
    currentPage,
    pageSize,
    canPrevPage,
    canNextPage,
    prevPage,
    nextPage,
    totalNumber,
}) {
    let current_page =  currentPage + 1
    return (
        <div
            className="flex flex-col items-center justify-center py-6
         bg-white normal-case"
        >
            <span className="text-sm text-gray-700">
                Showing{' '}
                <span className="font-semibold text-gray-900">
                    {totalNumber < 1 ? 0 : current_page > 1 ? (current_page - 1) * pageSize + 1 : current_page}{' '}
                </span>
                to{' '}
                <span className="font-semibold text-gray-900">
                    {current_page * pageSize < totalNumber ? current_page * pageSize : totalNumber}{' '}
                </span>{' '}
                of
                <span
                    className="font-semibold 
                text-gray-900"
                >
                    {' '}
                    {totalNumber}
                </span>{' '}
                Entries
            </span>
            <div className="inline-flex my-2 xs:mt-0">
                <button
                    type="button"
                    disabled={!canPrevPage}
                    onClick={prevPage}
                    className={`inline-flex items-center py-2 px-4 text-sm 
          font-medium ${!canPrevPage ? 'text-gray-300 cursor-not-allowed' : 'text-abumet-500'
                        } rounded-r 
           `}
                >
                    <ArrowLeftIcon className=" mr-2 w-5 h-5" />
                    Prev
                </button>
                <button
                    type="button"
                    disabled={!canNextPage}
                    onClick={nextPage}
                    className={`inline-flex items-center py-2 px-4 text-sm 
                    font-medium ${!canNextPage ? 'text-gray-300 cursor-not-allowed' : 'text-abumet-500'
                        } rounded-r 
                     ml-4`}
                >
                    {' '}
                    Next
                    <ArrowRightIcon className=" ml-2 w-5 h-5" />
                </button>
            </div>
        </div>
    );
}

export default PaginationBar;
