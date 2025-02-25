 
import React from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { toggleTodo, removeTodo } from "@/store/slices/todoSlice"; // adjust the import path as needed
import { FaCheck, FaTrash, FaEdit } from "react-icons/fa";

const TodoGrid = () => {
  // Get todos from Redux state
  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();

  if (todos.length === 0) {
    return (
      <div className="p-4">
        <p className="text-center text-gray-500 dark:text-gray-400">
          No tasks available.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 p-4">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition transform hover:-translate-y-1"
        >
          <div className="flex items-center justify-between">
            <h3
              className={`text-xl font-bold ${
                todo.completed ? "line-through text-gray-500" : "text-black dark:text-white"
              }`}
            >
              {todo.title}
            </h3>
            <div className="flex space-x-2">
              <button
                onClick={() => dispatch(toggleTodo(todo.id))}
                className="text-green-500 hover:text-green-600"
              >
                <FaCheck size={20} />
              </button>
              <button
                onClick={() => dispatch(removeTodo(todo.id))}
                className="text-red-500 hover:text-red-600"
              >
                <FaTrash size={20} />
              </button>
            </div>
          </div>
          {todo.description && (
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              {todo.description}
            </p>
          )}
          <div className="mt-4 flex justify-end">
            <Link href={`/updateTodo/${todo.id}`} className="flex items-center text-blue-500 hover:text-blue-600">
              <FaEdit size={20} />
              <span className="ml-1">Edit</span>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoGrid;
