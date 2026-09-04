import { useState } from "react";
import { Search, ChevronDown, Edit2, Trash2 } from "lucide-react";
import type { PollWithTarget, PollStatus } from "../types/poll";
import { StatusBadge } from "./StatusBadge";
import { Pagination } from "../../../components/ui/Pagination";

interface PollsTableProps {
    polls: PollWithTarget[];
    onEdit?: (pollId: number) => void;
    onDelete?: (pollId: number) => void;
}

const ENTRIES_PER_PAGE = 3;

export function PollsTable({ polls, onEdit, onDelete }: PollsTableProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<PollStatus | "All Statuses">("All Statuses");
    const [currentPage, setCurrentPage] = useState(1);

    const filteredPolls = polls.filter((poll) => {
        const matchesSearch = poll.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "All Statuses" || poll.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const totalPages = Math.ceil(filteredPolls.length / ENTRIES_PER_PAGE);
    const startIndex = (currentPage - 1) * ENTRIES_PER_PAGE;
    const displayedPolls = filteredPolls.slice(startIndex, startIndex + ENTRIES_PER_PAGE);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-on-surface-variant" />
                    <input
                        type="text"
                        placeholder="Search polls by title..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="h-12 w-full rounded-full border border-outline-variant bg-surface-container-lowest pl-12 pr-4 font-sans text-base text-on-surface placeholder:text-on-surface-variant focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                </div>

                <div className="relative">
                    <select
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value as PollStatus | "All Statuses");
                            setCurrentPage(1);
                        }}
                        className="h-12 appearance-none rounded-full border border-outline-variant bg-surface-container-lowest pl-4 pr-10 font-sans text-base text-on-surface focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                        <option>All Statuses</option>
                        <option>Published</option>
                        <option>Active</option>
                        <option>Disabled</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-variant" />
                </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest">
                <table className="w-full">
                    <thead className="bg-[#F0EDE6]">
                        <tr>
                            <th className="px-6 py-3 text-left font-sans text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
                                Title
                            </th>
                            <th className="px-6 py-3 text-left font-sans text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left font-sans text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
                                Start Date
                            </th>
                            <th className="px-6 py-3 text-left font-sans text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
                                End Date
                            </th>
                            <th className="px-6 py-3 text-left font-sans text-xs font-semibold uppercase tracking-widest text-on-surface-variant">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedPolls.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center font-sans text-sm text-on-surface-variant">
                                    No polls found matching your criteria.
                                </td>
                            </tr>
                        ) : (
                            displayedPolls.map((poll) => (
                                <tr key={poll.id} className="border-t border-outline-variant transition-colors hover:bg-surface-container-low">
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1">
                                            <span className="font-sans text-base font-bold text-on-surface">
                                                {poll.title}
                                            </span>
                                            <span className="font-sans text-sm text-on-surface-variant">
                                                Target: {poll.target}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <StatusBadge status={poll.status} />
                                    </td>
                                    <td className="px-6 py-4 font-sans text-sm text-on-surface">
                                        {formatDate(poll.startsAt)}
                                    </td>
                                    <td className="px-6 py-4 font-sans text-sm text-on-surface">
                                        {formatDate(poll.endsAt)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => onEdit?.(poll.id)}
                                                className="flex h-8 w-8 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-surface-container hover:text-primary"
                                                aria-label="Edit poll"
                                            >
                                                <Edit2 className="h-4 w-4" />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => onDelete?.(poll.id)}
                                                className="flex h-8 w-8 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:bg-error-container hover:text-error"
                                                aria-label="Delete poll"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {filteredPolls.length > 0 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalEntries={filteredPolls.length}
                    entriesPerPage={ENTRIES_PER_PAGE}
                    onPageChange={setCurrentPage}
                />
            )}
        </div>
    );
}
