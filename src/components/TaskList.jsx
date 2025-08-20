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
    <ul className="space-y-4">
      {tasks.map((task) => (
        <li key={task.id}>
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