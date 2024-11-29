import { Button } from "./ui/button";

interface DealsPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function DealsPagination({
    currentPage,
    totalPages,
    onPageChange,
}: DealsPaginationProps) {
    const getPageNumbers = () => {
        const delta = 1; // Number of pages to show on each side of current page
        const range = [];
        for (
            let i = Math.max(2, currentPage - delta);
            i <= Math.min(totalPages - 1, currentPage + delta);
            i++
        ) {
            range.push(i);
        }

        if (currentPage - delta > 2) {
            range.unshift("...");
        }
        if (currentPage + delta < totalPages - 1) {
            range.push("...");
        }

        range.unshift(1);
        if (totalPages !== 1) {
            range.push(totalPages);
        }

        return range;
    };

    return (
        <div className="flex flex-wrap justify-center gap-2 mt-8 px-4">
            <Button
                variant="outline"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                className="hidden sm:inline-flex"
            >
                Previous
            </Button>
            <div className="flex flex-wrap justify-center gap-2">
                {getPageNumbers().map((pageNum, idx) => (
                    pageNum === "..." ? (
                        <span key={`ellipsis-${idx}`} className="px-2 py-2">...</span>
                    ) : (
                        <Button
                            key={pageNum}
                            variant={currentPage === pageNum ? "default" : "outline"}
                            onClick={() => typeof pageNum === 'number' && onPageChange(pageNum)}
                            className="w-10 h-10 p-0"
                        >
                            {pageNum}
                        </Button>
                    )
                ))}
            </div>
            <Button
                variant="outline"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="hidden sm:inline-flex"
            >
                Next
            </Button>
        </div>
    );
} 