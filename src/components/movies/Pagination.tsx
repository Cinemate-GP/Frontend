import { TiChevronRight } from "react-icons/ti";
import { TiChevronLeft } from "react-icons/ti";

interface PaginationProps {
    pageNumber: number
    totalPages: number
    hasPreviousPage: boolean
    hasNextPage: boolean
    onPageChange: (page: number) => void
  }
  
  const Pagination: React.FC<PaginationProps> = ({
    pageNumber,
    totalPages,
    hasPreviousPage,
    hasNextPage,
    onPageChange,
  }) => {
    const maxButtons = 6
    const startPage = Math.max(1, pageNumber - Math.floor(maxButtons / 2))
    const endPage = Math.min(totalPages, startPage + maxButtons - 1)
  
    const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
  
    return (
      <div className="flex items-center justify-center gap-2 mt-6 mb-16 md:mb-8">
        <button
          disabled={!hasPreviousPage}
          onClick={() => onPageChange(pageNumber - 1)}
          className="w-9 h-9 rounded-full bg-gray-800 text-white hover:bg-red-600 disabled:opacity-30 transition flex items-center justify-center"
        >
          <TiChevronLeft/>
        </button>
  
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-6 md:w-6 h-6  md:h-6 text-xs rounded-full transition ${
              page === pageNumber
                ? "bg-red-600 text-white ring-1 ring-white"
                : "bg-gray-800 text-white hover:bg-red-500"
            }`}
          >
            {page}
          </button>
        ))}
  
        {endPage < totalPages && <span className="text-white">...</span>}
  
        <button
          disabled={!hasNextPage}
          onClick={() => onPageChange(pageNumber + 1)}
          className="w-9 h-9 rounded-full bg-gray-800 text-white hover:bg-red-600 disabled:opacity-30 transition flex items-center justify-center"
        >
          <TiChevronRight />
        </button>
      </div>
    )
  }
  
  export default Pagination