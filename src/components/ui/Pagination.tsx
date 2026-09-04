import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    totalEntries: number;
    entriesPerPage: number;
    onPageChange: (page: number) => void;
}

export function Pagination({
    currentPage,
    totalPages,
    totalEntries,
    entriesPerPage,
    onPageChange,
}: PaginationProps) {
    const startEntry = (currentPage - 1) * entriesPerPage + 1;
    const endEntry = Math.min(currentPage * entriesPerPage, totalEntries);

    const pages = Array.from({ length: Math.min(3, totalPages) }, (_, i) => i + 1);

    return (
        <div className="flex items-center justify-between border-t border-border pt-4">
            <p className="font-sans text-sm text-on-surface-variant">
                Showing {startEntry} to {endEntry} of {totalEntries} entries
            </p>

            <div className="flex items-center gap-2">
                <button
                    type="button"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container disabled:pointer-events-none disabled:opacity-30"
                    aria-label="Previous page"
                >
                    <ChevronLeft className="h-4 w-4" />
                </button>

                {pages.map((page) => {
                    const isActive = page === currentPage;
                    return (
                        <button
                            key={page}
                            type="button"
                            onClick={() => onPageChange(page)}
                            className={`flex h-8 w-8 items-center justify-center rounded-full font-sans text-sm font-semibold transition-colors ${
                                isActive
                                    ? "bg-primary text-on-primary"
                                    : "border border-outline-variant text-on-surface hover:bg-surface-container"
                            }`}
                        >
                            {page}
                        </button>
                    );
                })}

                <button
                    type="button"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-on-surface transition-colors hover:bg-surface-container disabled:pointer-events-none disabled:opacity-30"
                    aria-label="Next page"
                >
                    <ChevronRight className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}
