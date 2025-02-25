
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "@/store/slices/todoSlice"; // adjust path if needed
import { X } from "lucide-react"; // or use any icon library

const AddTaskModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) {
      // You might also show a toast error here if desired.
      return;
    }
    // Dispatch the addTodo action (your slice's prepare function handles generating an ID, etc.)
    dispatch(addTodo(title, description));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-black dark:text-white">Add New Task</h2>
          <button onClick={onClose} className="text-gray-600 dark:text-gray-300">
            <X size={24} />
          </button>
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 mb-2 border rounded dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <textarea
            placeholder="Task Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>
        </div>
        <button
          onClick={handleSubmit}
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default AddTaskModal;
