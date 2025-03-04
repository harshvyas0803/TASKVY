import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import * as SecureStore from "expo-secure-store";
import { BarChart } from "react-native-chart-kit";

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

  const chartData = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        data: [completed, pending]
      }
    ]
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Stats</Text>
      <BarChart
        data={chartData}
        width={Dimensions.get("window").width - 40} // Adjust for padding
        height={220}
        fromZero={true}
        chartConfig={{
          backgroundColor: "#f5f5f5",
          backgroundGradientFrom: "#f5f5f5",
          backgroundGradientTo: "#f5f5f5",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(34, 128, 176, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
      <Text style={styles.statText}>Completed: {completed}</Text>
      <Text style={styles.statText}>Pending: {pending}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    padding: 20,
    backgroundColor: "#f5f5f5"
  },
  title: { 
    fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 20,
    color: "purple"
  },
  statText: { 
    fontSize: 18, 
    marginVertical: 5 
  },
});
