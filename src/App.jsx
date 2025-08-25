// App.jsx
import React, { useEffect, useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import AddTaskForm from "./components/AddTaskForm.jsx";
import Filters from "./components/Filters.jsx";
import TaskList from "./components/TaskList.jsx";
import { X } from "lucide-react";

// -----------------------------
// Helpers
// -----------------------------
const LS_TASKS_KEY = "todo.tasks.simple.v2";
const LS_THEME_KEY = "todo.theme";

// Custom hook for localStorage persistence
function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : defaultValue;
    } catch {
      console.error("Error reading from localStorage:", key);
      return defaultValue;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error writing to localStorage:", key, error);
    }
  }, [key, value]);
  return [value, setValue];
}

// -----------------------------
// Main App Component
// -----------------------------
export default function App() {
  // Inject Inter font once
  useEffect(() => {
    const id = "inter-font-link";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.href =
        "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap";
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
  }, []);

  // Theme (light/dark) persisted
  const [theme, setTheme] = useLocalStorage(
    LS_THEME_KEY,
    (() => {
      const prefersDark =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      return prefersDark ? "dark" : "light";
    })()
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  // Tasks persisted
  const [tasks, setTasks] = useLocalStorage(LS_TASKS_KEY, []);
  // Filters: all | active | completed
  const [filter, setFilter] = useState("all");
  // Which task is being edited (id)
  const [editingId, setEditingId] = useState(null);
  // Track a just-added task to briefly highlight the row
  const [justAddedId, setJustAddedId] = useState(null);

  const visibleTasks = useMemo(() => {
    let filtered = tasks;
    if (filter === "active") {
      filtered = filtered.filter((t) => !t.completed);
    } else if (filter === "completed") {
      filtered = filtered.filter((t) => t.completed);
    }
    return filtered.sort((a, b) => b.createdAt - a.createdAt);
  }, [tasks, filter]);

  const remaining = useMemo(() => tasks.filter((t) => !t.completed).length, [tasks]);
  const hasCompleted = useMemo(() => tasks.some((t) => t.completed), [tasks]);

  // Handlers
  function addTask(text) {
    if (!text) return;
    const task = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: Date.now(),
    };
    setTasks((prev) => [task, ...prev]);
    setJustAddedId(task.id);
    setTimeout(() => setJustAddedId(null), 700);
  }

  function toggleTask(id) {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    if (editingId === id) setEditingId(null);
  }

  function startEdit(id) {
    setEditingId(id);
  }

  function saveEdit(id, newText) {
    const text = newText.trim();
    if (!text) return;
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, text } : t)));
    setEditingId(null);
  }

  function cancelEdit() {
    setEditingId(null);
  }

  function clearCompleted() {
    setTasks((prev) => prev.filter((t) => !t.completed));
  }

  return (
    <div className="min-h-screen font-[Inter] bg-gradient-to-br from-indigo-50 via-white to-fuchsia-50 dark:from-zinc-950 dark:via-zinc-950 dark:to-black text-zinc-900 dark:text-zinc-100 selection:bg-indigo-200/60 dark:selection:bg-indigo-500/40">
      {/* Header */}
      <Header theme={theme} onToggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))} />

      {/* Full-width on mobile, roomy on larger screens */}
      <main className="w-full max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-10 space-y-6">
        {/* Add Task Form */}
        <AddTaskForm onAdd={addTask} />

        {/* Filters */}
        <Filters
          filter={filter}
          setFilter={setFilter}
          remaining={remaining}
          hasCompleted={hasCompleted}
          onClearCompleted={clearCompleted}
        />

        {/* Task List */}
        <section className="space-y-4">
          {visibleTasks.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700 p-8 sm:p-10 text-center text-zinc-500 dark:text-zinc-400">
              <p className="inline-flex items-center gap-2 text-base sm:text-lg">
                <X className="h-5 w-5" /> No tasks here yet
              </p>
              <p className="text-xs sm:text-sm mt-2">Add a task above to get started!</p>
            </div>
          ) : (
            <TaskList
              tasks={visibleTasks}
              editingId={editingId}
              justAddedId={justAddedId}
              onToggle={toggleTask}
              onDelete={deleteTask}
              onStartEdit={startEdit}
              onSaveEdit={saveEdit}
              onCancelEdit={cancelEdit}
            />
          )}
        </section>

        {/* Footer note */}
        <p className="text-center text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-500 mt-8">
          Design and Developed by Sunil Pragada
        </p>
      </main>
    </div>
  );
}
