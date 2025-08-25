// components/TaskList.jsx
import React from "react";
import TaskItem from "./TaskItem.jsx";

export default function TaskList({
  tasks,
  editingId,
  justAddedId,
  onToggle,
  onDelete,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
}) {
  return (
    <ul className="space-y-3 sm:space-y-4 w-full px-1 sm:px-0">
      {tasks.map((task) => (
        <li key={task.id} className="w-full">
          <TaskItem
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
            onStartEdit={onStartEdit}
            editing={editingId === task.id}
            onSaveEdit={onSaveEdit}
            onCancelEdit={onCancelEdit}
            justAdded={justAddedId === task.id}
          />
        </li>
      ))}
    </ul>
  );
}
