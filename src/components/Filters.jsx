// components/Filters.jsx
import React from "react";
import { Trash2 } from "lucide-react";
import { cls } from "../utils/cls";

export default function Filters({ filter, setFilter, remaining, hasCompleted, onClearCompleted }) {
  const tabs = [
    { id: "all", label: "All" },
    { id: "active", label: "Active" },
    { id: "completed", label: "Completed" },
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-3 justify-between w-full">
      <div className="flex-1 flex flex-wrap items-center gap-2 justify-center sm:justify-start">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setFilter(t.id)}
            role="tab"
            aria-selected={filter === t.id}
            className={cls(
              "px-4 py-2 text-sm rounded-full border transition-all duration-200 w-full sm:w-auto text-center",
              filter === t.id
                ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 border-zinc-900 dark:border-white shadow-sm"
                : "bg-white/70 dark:bg-zinc-900/70 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-900 hover:shadow-sm"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row flex-shrink-0 items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
        <div className="text-sm text-zinc-600 dark:text-zinc-400 font-medium whitespace-nowrap">
          {remaining} {remaining === 1 ? "task" : "tasks"} left
        </div>
        <button
          onClick={onClearCompleted}
          disabled={!hasCompleted}
          className={cls(
            "inline-flex items-center justify-center gap-2 px-3 py-1.5 text-sm rounded-full border transition-all duration-200 font-medium w-full sm:w-auto",
            hasCompleted
              ? "text-rose-600 border-rose-200/70 dark:border-rose-500/30 hover:bg-rose-50/60 dark:hover:bg-rose-500/10 shadow-sm"
              : "text-zinc-400 border-zinc-200 dark:border-zinc-800 cursor-not-allowed opacity-70"
          )}
        >
          <Trash2 className="h-4 w-4" />
          <span className="hidden sm:inline">Clear Completed</span>
        </button>
      </div>
    </div>
  );
}
