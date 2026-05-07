"use client";

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  lastPage,
  onPageChange,
}: PaginationProps) => {
  if (lastPage <= 1) return null;

  return (
    <div className="flex flex-col items-center justify-center mt-12 gap-4">
      <div className="join bg-base-100 shadow-sm border border-base-content/10">
        <button
          className={`join-item btn btn-sm md:btn-md ${
            currentPage === 1 ? "btn-disabled" : ""
          }`}
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
        >
          «
        </button>

        {[...Array(lastPage)].map((_, index) => {
          const pageNumber = index + 1;
          return (
            <button
              key={pageNumber}
              className={`join-item btn btn-sm md:btn-md ${
                currentPage === pageNumber ? "btn-primary" : "btn-ghost"
              }`}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          className={`join-item btn btn-sm md:btn-md ${
            currentPage === lastPage ? "btn-disabled" : ""
          }`}
          onClick={() => onPageChange(Math.min(currentPage + 1, lastPage))}
          disabled={currentPage === lastPage}
        >
          »
        </button>
      </div>
    </div>
  );
};

export default Pagination;
