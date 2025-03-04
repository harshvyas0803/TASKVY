// app/Stats.jsx

import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as SecureStore from "expo-secure-store";

export default function StatsScreen() {
  const [completed, setCompleted] = useState(0);
  const [pending, setPending] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      const storedTasks = await SecureStore.getItemAsync("tasks");
      if (storedTasks) {
        const tasks = JSON.parse(storedTasks);
        setCompleted(tasks.filter(task => task.completed).length);
        setPending(tasks.filter(task => !task.completed).length);
      }
    };
    fetchStats();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Stats</Text>
      <Text>Completed: {completed}</Text>
      <Text>Pending: {pending}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
});
