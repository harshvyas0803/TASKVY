import Todo from '../models/Todo.js';

// Create a new todo associated with the authenticated user.
export const createTodo = async (todoData, userId) => {
  const { title, description, completed = false } = todoData;
  // Create and return a new todo record in the database.
  const newTodo = await Todo.create({
    title,
    description,
    completed,
    userId,
  });
  return newTodo;
};

// Retrieve all todos for a specific user.
export const getTodos = async (userId) => {
  // Find all todos where the userId matches the authenticated user's id.
  const todos = await Todo.findAll({ where: { userId } });
  return todos;
};

// Retrieve a single todo by its ID, ensuring it belongs to the user.
export const getTodoById = async (todoId, userId) => {
  // Look for a todo with the given id and userId.
  const todo = await Todo.findOne({ where: { id: todoId, userId } });
  return todo;
};

// Update an existing todo.
export const updateTodo = async (todoId, updatedData, userId) => {
  // Find the todo that belongs to the user.
  const todo = await Todo.findOne({ where: { id: todoId, userId } });
  if (!todo) {
    return null; // No matching todo found.
  }
  // Update the todo with new data.
  await todo.update(updatedData);
  return todo;
};

// Delete a todo.
export const deleteTodo = async (todoId, userId) => {
  // Find the todo that belongs to the user.
  const todo = await Todo.findOne({ where: { id: todoId, userId } });
  if (!todo) {
    return false; // No todo found to delete.
  }
  // Remove the todo from the database.
  await todo.destroy();
  return true;
};

