import React from "react";

import { usePagination, DOTS } from "../../shared/hooks/usePagination";

interface IPaginationProps {
  onPageChange: React.Dispatch<React.SetStateAction<number | undefined>>;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
  className?: string;
}

const Pagination = ({
  currentPage,
  onPageChange,
  pageSize,
  totalCount,
  className,
  siblingCount,
}: IPaginationProps) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });
  if (paginationRange && (currentPage === 0 || paginationRange.length < 2)) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange && paginationRange[paginationRange.length - 1];
  return (
    <ul className={`${className} flex justify-center space-x-3`}>
      <li
        className={`px-3 h-8 text-center mx-1 border items-center leading-3 min-w-[32px] flex ${currentPage === 1 ? "bg-gray-200" : ""}`}
        // onClick={onPrevious}
      >
        <button onClick={onPrevious} disabled={currentPage === 1}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
          </svg>
        </button>
      </li>
      {paginationRange &&
        paginationRange.map((pageNumber) => {
          if (pageNumber === DOTS) {
            return <li>&#8230;</li>;
          }

          return (
            <li
              className={`hover:border cursor-pointer`}
              onClick={() =>
                onPageChange(typeof pageNumber === "number" ? pageNumber : 0)
              }
            >
              {pageNumber}
            </li>
          );
        })}
      <li
        className={`px-3 h-8 text-center mx-1 border items-center leading-3 min-w-[32px] flex ${
          currentPage === lastPage ? "bg-gray-200" : ""
        }`}
      >
        <button onClick={onNext} disabled={currentPage === lastPage}>
          <svg

            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z" />
          </svg>
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
