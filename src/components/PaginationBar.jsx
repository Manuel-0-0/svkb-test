import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { usePagination, DOTS } from "../hooks/usePagination";

function PaginationBar({
    currentPage,
    pageSize,
    canPrevPage,
    canNextPage,
    prevPage,
    nextPage,
    onPageChange,
    totalNumber,
}) {
    let current_page = currentPage + 1
    const paginationRange = usePagination({
        currentPage: current_page,
        totalCount: totalNumber,
        siblingCount: 1,
        pageSize
    });

    // If there are less than 2 times in pagination range we shall not render the component
    if (current_page === 0 || paginationRange.length < 2) {
        return null;
    }

    return (
        <div className="flex flex-col items-center justify-center py-6
      bg-white normal-case">
            <ul
                className='flex list-none'
            >
                {/* Left navigation arrow */}
                <button
                    type="button"
                    disabled={!canPrevPage}
                    onClick={prevPage}
                    className={`inline-flex items-center py-2 px-4 text-sm 
          font-medium ${!canPrevPage ? 'text-gray-300 cursor-not-allowed' : ''
                        } rounded-r 
           `}
                >
                    <ArrowLeftIcon className=" mr-2 w-5 h-5" />
                </button>
                {paginationRange.map(pageNumber => {

                    // If the pageItem is a DOT, render the DOTS unicode character
                    if (pageNumber === DOTS) {
                        return <li className="px-3 h-8 text-center flex box-border items-center rounded-2xl text-sm hover:bg-transparent hover:cursor-default">&#8230;</li>;
                    }

                    // Render our Page Pills
                    return (
                        <li
                            className={`${pageNumber === current_page ? 'bg-gray-200' : ''} px-3 h-8 text-center flex box-border cursor-pointer items-center rounded-2xl text-sm `}
                            onClick={() => onPageChange(pageNumber - 1)}
                        >
                            {pageNumber}
                        </li>
                    );
                })}
                {/*  Right Navigation arrow */}
                <button
                    type="button"
                    disabled={!canNextPage}
                    onClick={nextPage}
                    className={`inline-flex items-center py-2 px-4 text-sm 
                    font-medium ${!canNextPage ? 'text-gray-300 cursor-not-allowed' : ''
                        } rounded-r 
                     ml-4`}
                >
                    {' '}
                    <ArrowRightIcon className=" ml-2 w-5 h-5" />
                </button>
            </ul>
        </div>
    )
}

export default PaginationBar;
