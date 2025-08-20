// components/Header.jsx
import React from "react";
import { Sun, Moon } from "lucide-react";

// Logo SVG Component
function TodoLogo() {
  return (
    <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 shadow-lg flex items-center justify-center">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
        <path d="M9 12L11 14L15 10M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export default function Header({ theme, onToggleTheme }) {
  return (
    <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/95 dark:supports-[backdrop-filter]:bg-zinc-900/70 dark:bg-zinc-900/90 border-b border-zinc-200/70 dark:border-zinc-800">
      <div className="max-w-xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <TodoLogo />
          <h1 className="font-bold tracking-tight text-zinc-900 dark:text-zinc-100 text-xl md:text-2xl">Listful Thinking</h1>
        </div>
        <button onClick={onToggleTheme} className="inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-700 px-3 py-1.5 text-sm font-medium shadow-sm hover:shadow-md transition active:scale-[0.98] bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-200" aria-label="Toggle theme">
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </div>
    </header>
  );
}