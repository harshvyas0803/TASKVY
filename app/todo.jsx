//app/Todo.jsx

import { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import * as SecureStore from "expo-secure-store";

import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";


export default function TodoScreen() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const router = useRouter();

  const scheduleReminder = async (task) => {
    await Notifications.scheduleNotificationAsync({
      content: { title: "Task Reminder", body: `Don't forget: ${task.text}` },
      trigger: { seconds: 10 },
    });
  };
  

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const storedTasks = await SecureStore.getItemAsync("tasks");
    if (storedTasks) setTasks(JSON.parse(storedTasks));
  };

  const saveTasks = async (updatedTasks) => {
    setTasks(updatedTasks);
    await SecureStore.setItemAsync("tasks", JSON.stringify(updatedTasks));
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    const updatedTasks = [...tasks, { id: Date.now().toString(), text: newTask, completed: false }];
    saveTasks(updatedTasks);
    setNewTask("");
  };

  const toggleTask = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    saveTasks(updatedTasks);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Tasks</Text>
      <TextInput
        style={styles.input}
        placeholder="Add a new task"
        value={newTask}
        onChangeText={setNewTask}
      />
      <Button title="Add Task" onPress={addTask} />
      <Button title="View Stats" onPress={() => router.push("/stats")} />;


      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toggleTask(item.id)} onLongPress={() => deleteTask(item.id)}>
            <Text style={[styles.task, item.completed && styles.completed]}>{item.text}</Text>
          </TouchableOpacity>

          
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10 },
  task: { fontSize: 18, padding: 10 },
  completed: { textDecorationLine: "line-through", color: "gray" },
});
