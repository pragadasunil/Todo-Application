// components/TaskItem.jsx
import React, { useRef, useState, useEffect } from "react";
import { CheckCircle2, Circle, Pencil, Trash2 } from "lucide-react";
import { cls } from "../utils/cls";

export default function TaskItem({
  task,
  onToggle,
  onDelete,
  onStartEdit,
  editing,
  onSaveEdit,
  onCancelEdit,
  justAdded,
}) {
  const rowRef = useRef(null);
  const [draftText, setDraftText] = useState(task.text);

  useEffect(() => {
    if (justAdded && rowRef.current) {
      rowRef.current.classList.add("ring-2", "ring-indigo-400/50");
      const id = setTimeout(() => {
        rowRef.current?.classList.remove("ring-2", "ring-indigo-400/50");
      }, 600);
      return () => clearTimeout(id);
    }
  }, [justAdded]);

  useEffect(() => {
    if (editing) {
      setDraftText(task.text);
    }
  }, [editing, task.text]);

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    onSaveEdit(task.id, draftText);
  };

  const handleCancelEdit = () => {
    setDraftText(task.text);
    onCancelEdit();
  };

  return (
    <div
      ref={rowRef}
      className={cls(
        "group flex items-center gap-3 rounded-2xl border p-4 transition-all duration-200 bg-white/90 dark:bg-zinc-900/70 backdrop-blur",
        "border-zinc-200 dark:border-zinc-800 hover:border-indigo-300/70 dark:hover:border-indigo-500/40 shadow-md hover:shadow-lg"
      )}
    >
      {/* Complete toggle */}
      <button
        onClick={() => onToggle(task.id)}
        aria-label={task.completed ? "Mark as active" : "Mark as completed"}
        className={cls(
          "flex-shrink-0 inline-flex h-7 w-7 items-center justify-center rounded-full border-2 transition-all duration-200",
          task.completed
            ? "bg-emerald-500 text-white border-emerald-500"
            : "border-zinc-300 dark:border-zinc-600 text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
        )}
      >
        {task.completed ? <CheckCircle2 className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
      </button>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {!editing ? (
          <p
            className={cls(
              "font-medium truncate text-zinc-900 dark:text-zinc-100 transition-colors",
              task.completed && "line-through text-zinc-500 dark:text-zinc-400"
            )}
            title={task.text}
          >
            {task.text}
          </p>
        ) : (
          <form onSubmit={handleSubmitEdit} className="flex items-center gap-2 w-full">
            <input
              value={draftText}
              onChange={(e) => setDraftText(e.target.value)}
              autoFocus
              className="flex-1 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-indigo-400/60 dark:focus:ring-indigo-500/60 shadow-sm"
            />
            <div className="flex items-center gap-1">
              <button
                type="submit"
                className="rounded-lg px-3 py-1.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm"
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleCancelEdit}
                className="rounded-lg px-3 py-1.5 text-sm border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-200 shadow-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Actions */}
      {!editing && (
        <div className="flex-shrink-0 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => onStartEdit(task.id)}
            className="rounded-full border border-zinc-200 dark:border-zinc-700 p-2 text-xs hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shadow-sm"
            aria-label="Edit task"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="rounded-full border border-rose-200/60 dark:border-rose-500/30 p-2 text-xs text-rose-600 hover:bg-rose-50/60 dark:hover:bg-rose-500/10 transition-colors shadow-sm"
            aria-label="Delete task"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}