import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../redux/taskSlice";
import "../styles/taskForm.css";

function TaskFormModal({ onClose }) {
  const dispatch = useDispatch();
  const [task, setTask] = useState({
    id: Date.now(),
    title: "",
    description: "",
    dueDate: "",
    completed: false,
  });

  const handleAddTask = () => {
    dispatch(addTask(task));
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add Task</h2>
        <input
          type="text"
          placeholder="Title"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        />
        <input
          type="date"
          value={task.dueDate}
          onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
        />
        <button onClick={handleAddTask}>Add</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default TaskFormModal;
