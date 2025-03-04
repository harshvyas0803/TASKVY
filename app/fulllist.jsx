import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Card, Text, Button, TextInput, Portal, Modal, Chip, FAB } from "react-native-paper";
import * as SecureStore from "expo-secure-store";
import Animated, { Layout, SlideInRight, SlideOutLeft } from "react-native-reanimated";
import { useRouter } from "expo-router";

const FullListScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const router = useRouter();

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

  const updateTask = () => {
    if (editingTask) {
      const updatedTasks = tasks.map(task =>
        task.id === editingTask.id ? editingTask : task
      );
      saveTasks(updatedTasks);
      setModalVisible(false);
      setEditingTask(null);
    }
  };

  // Helper to return priority color for card indicator
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "#FF4500";
      case "Medium":
        return "#FFD700";
      case "Low":
        return "#32CD32";
      default:
        return "#ccc";
    }
  };

  // Optional: Style for editing chips
  const getChipStyle = (level) => {
    let baseColor = getPriorityColor(level);
    return {
      backgroundColor: editingTask?.priority === level ? baseColor : "transparent",
      borderColor: baseColor,
      marginHorizontal: 5,
      borderWidth: 1,
    };
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Full Task List</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Animated.View
            entering={SlideInRight}
            exiting={SlideOutLeft}
            layout={Layout.springify()}
          >
            <Card
              style={[
                styles.card,
                item.completed && styles.completed,
                { borderLeftColor: getPriorityColor(item.priority), borderLeftWidth: 5 },
              ]}
            >
              <Card.Title title={item.title} subtitle={`Priority: ${item.priority}`} />
              <Card.Content>
                <Text>{item.description}</Text>
                <Text>Deadline: {item.deadline}</Text>
              </Card.Content>
              <Card.Actions>
                <Button onPress={() => toggleTask(item.id)}>
                  {item.completed ? "Undo" : "Complete"}
                </Button>
                <Button
                  onPress={() => {
                    setEditingTask(item);
                    setModalVisible(true);
                  }}
                >
                  Edit
                </Button>
                <Button onPress={() => deleteTask(item.id)}>Delete</Button>
              </Card.Actions>
            </Card>
          </Animated.View>
        )}
        contentContainerStyle={{ paddingBottom: 80 }}
      />

      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={() => {
            setModalVisible(false);
            setEditingTask(null);
          }}
          contentContainerStyle={styles.modalContainer}
        >
          {editingTask && (
            <View>
              <Text style={styles.modalTitle}>Edit Task</Text>
              <TextInput
                label="Title"
                value={editingTask.title}
                onChangeText={(text) =>
                  setEditingTask({ ...editingTask, title: text })
                }
                style={styles.input}
              />
              <TextInput
                label="Description"
                value={editingTask.description}
                onChangeText={(text) =>
                  setEditingTask({ ...editingTask, description: text })
                }
                style={styles.input}
              />
              <TextInput
                label="Deadline"
                value={editingTask.deadline}
                onChangeText={(text) =>
                  setEditingTask({ ...editingTask, deadline: text })
                }
                style={styles.input}
              />
              {/* Priority selector using Chips */}
              <View style={styles.priorityContainer}>
                {["Low", "Medium", "High"].map((level) => (
                  <Chip
                    key={level}
                    mode={editingTask.priority === level ? "contained" : "outlined"}
                    onPress={() =>
                      setEditingTask({ ...editingTask, priority: level })
                    }
                    style={getChipStyle(level)}
                  >
                    {level}
                  </Chip>
                ))}
              </View>
              <View style={styles.modalButtons}>
                <Button mode="contained" onPress={updateTask} style={styles.modalButton}>
                  Save
                </Button>
                <Button
                  mode="outlined"
                  onPress={() => {
                    setModalVisible(false);
                    setEditingTask(null);
                  }}
                  style={styles.modalButton}
                >
                  Cancel
                </Button>
              </View>
            </View>
          )}
        </Modal>
      </Portal>

      {/* Stats FAB */}
      <FAB
        icon="chart-bar"
        style={styles.fab}
        onPress={() => router.push("/stats")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#fff", 
    padding: 20 
  },
  title: { 
    fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 20,
    color: "purple"
  },
  card: { 
    marginVertical: 5, 
    padding: 10 
  },
  completed: { 
    backgroundColor: "#d3d3d3" 
  },
  input: { 
    marginBottom: 10 
  },
  priorityContainer: { 
    flexDirection: "row", 
    justifyContent: "space-around", 
    marginBottom: 10 
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  fab: { 
    position: "absolute", 
    right: 20, 
    bottom: 20 
  },
});

export default FullListScreen;
