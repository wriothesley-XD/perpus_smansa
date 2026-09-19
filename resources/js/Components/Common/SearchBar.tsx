import React, { useState, useRef, useEffect } from "react";
import { Search, X, ArrowRight } from "lucide-react";
import { router } from "@inertiajs/react";

interface SearchBarProps {
    placeholder?: string;
    className?: string;
}

export function SearchBar({
    placeholder = "Cari buku, pengarang, topik...",
    className = "",
}: SearchBarProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [query, setQuery] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isExpanded) {
            inputRef.current?.focus();
        }
    }, [isExpanded]);

    // Handle clicks outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                if (!query) {
                    setIsExpanded(false);
                }
            }
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsExpanded(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [query]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.get("/catalog", { search: query.trim() });
            setIsExpanded(false);
        }
    };

    return (
        <div ref={containerRef} className={`relative flex items-center ${className}`}>
            {!isExpanded ? (
                <button
                    type="button"
                    onClick={() => setIsExpanded(true)}
                    aria-label="Buka pencarian"
                    className="grid size-9 place-items-center rounded-full text-[#64748b] transition hover:bg-gray-100 hover:text-[#152238] dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                >
                    <Search size={17} />
                </button>
            ) : (
                <form
                    onSubmit={handleSubmit}
                    className="flex items-center gap-1.5 overflow-hidden rounded-full border border-[#2699fb] bg-white py-1 pl-3 pr-1 shadow-md ring-2 ring-[#2699fb]/15 transition-all duration-300 dark:border-blue-500 dark:bg-slate-900 w-[240px] sm:w-[280px]"
                >
                    <Search size={15} className="shrink-0 text-[#2699fb]" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={placeholder}
                        className="w-full bg-transparent text-xs text-[#152238] outline-none placeholder:text-gray-400 dark:text-white"
                    />
                    {query && (
                        <button
                            type="button"
                            onClick={() => {
                                setQuery("");
                                inputRef.current?.focus();
                            }}
                            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                        >
                            <X size={13} />
                        </button>
                    )}
                    <button
                        type="submit"
                        className="grid size-7 place-items-center rounded-full bg-[#2699fb] text-white shrink-0 hover:bg-[#1783df] transition"
                        aria-label="Cari"
                    >
                        <ArrowRight size={13} />
                    </button>
                </form>
            )}
        </div>
    );
}

export default SearchBar;
