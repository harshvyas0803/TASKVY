import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import * as SecureStore from "expo-secure-store";
import { BarChart } from "react-native-chart-kit";
import { LinearGradient } from "expo-linear-gradient";

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
    <LinearGradient colors={["#0f2027", "#203a43", "#2c5364"]} style={styles.gradient}>
      <View style={styles.container}>
        <Text style={styles.title}>Task Stats</Text>
        <BarChart
          data={chartData}
          width={Dimensions.get("window").width - 40} // Adjust for padding
          height={220}
          fromZero={true}
          chartConfig={{
            backgroundColor: "#0f2027",
            backgroundGradientFrom: "#203a43",
            backgroundGradientTo: "#2c5364",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255,255,255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255,255,255, ${opacity})`,
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
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    padding: 20,
  },
  title: { 
    fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 20,
    color: "#fff",
  },
  statText: { 
    fontSize: 18, 
    marginVertical: 5,
    color: "#fff",
  },
});
