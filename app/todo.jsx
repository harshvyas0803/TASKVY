import { useState, useEffect } from "react";
import { 
  View, 
  FlatList, 
  StyleSheet, 
  Alert, 
  TouchableOpacity, 
  Platform 
} from "react-native";
import { Button, TextInput, Card, Text, Menu, FAB, Chip } from "react-native-paper";
import * as SecureStore from "expo-secure-store";
import * as Notifications from "expo-notifications";
import { DateTimePickerAndroid, DateTimePicker } from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import Animated, { Layout, SlideInRight, SlideOutLeft } from "react-native-reanimated";
import { BlurView } from "expo-blur";

export default function TodoScreen() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "", deadline: "", priority: "Low" });
  const [filter, setFilter] = useState("All");
  const [menuVisible, setMenuVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [tempDate, setTempDate] = useState(null);
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

  const addTask = () => {
    if (!newTask.title.trim() || !newTask.deadline.trim()) {
      Alert.alert("Error", "Title and Deadline are required!");
      return;
    }
    const updatedTasks = [
      ...tasks,
      { id: Date.now().toString(), ...newTask, completed: false }
    ];
    saveTasks(updatedTasks);
    scheduleReminder(newTask);
    setNewTask({ title: "", description: "", deadline: "", priority: "Low" });
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

  const scheduleReminder = async (task) => {
    const deadlineTime = new Date(task.deadline).getTime();
    const now = new Date().getTime();
    const delay = deadlineTime - now;
    if (delay > 0) {
      await Notifications.scheduleNotificationAsync({
        content: { title: "Task Reminder", body: `Don't forget: ${task.title}` },
        trigger: { seconds: delay / 1000 },
      });
    }
  };

  const filteredTasks = filter === "All"
    ? tasks
    : tasks.filter(task => task.priority === filter);

  const formatDateTime = (selectedDate) => {
    const year = selectedDate.getFullYear();
    const month = ("0" + (selectedDate.getMonth() + 1)).slice(-2);
    const day = ("0" + selectedDate.getDate()).slice(-2);
    const hours = ("0" + selectedDate.getHours()).slice(-2);
    const minutes = ("0" + selectedDate.getMinutes()).slice(-2);
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  // For iOS: Inline datetime picker
  const onChangeDate = (event, selectedDate) => {
    if (Platform.OS === "ios" && event.type === "dismissed") {
      setShowDatePicker(false);
      return;
    }
    if (selectedDate) {
      setDate(selectedDate);
      const formattedDeadline = formatDateTime(selectedDate);
      setNewTask({ ...newTask, deadline: formattedDeadline });
    }
    setShowDatePicker(false);
  };

  // For Android: Date picker then time picker
  const onChangeAndroidDate = (event, selectedDate) => {
    if (event.type === "dismissed") return;
    if (selectedDate) {
      setTempDate(selectedDate);
      DateTimePickerAndroid.open({
        value: selectedDate,
        onChange: onChangeAndroidTime,
        mode: "time",
        display: "default",
      });
    }
  };

  const onChangeAndroidTime = (event, selectedTime) => {
    if (event.type === "dismissed") return;
    const datePart = tempDate || date;
    const newDate = new Date(datePart);
    newDate.setHours(selectedTime.getHours());
    newDate.setMinutes(selectedTime.getMinutes());
    setDate(newDate);
    const formattedDeadline = formatDateTime(newDate);
    setNewTask({ ...newTask, deadline: formattedDeadline });
    setTempDate(null);
  };

  const showDatePickerHandler = () => {
    if (Platform.OS === "android") {
      DateTimePickerAndroid.open({
        value: date,
        onChange: onChangeAndroidDate,
        mode: "date",
        display: "default",
      });
    } else {
      setShowDatePicker(true);
    }
  };

  const getChipStyle = (level) => {
    let baseColor;
    switch (level) {
      case "High":
        baseColor = "#FF4500";
        break;
      case "Medium":
        baseColor = "#FFD700";
        break;
      case "Low":
        baseColor = "#32CD32";
        break;
      default:
        baseColor = "#ccc";
    }
    if (newTask.priority === level) {
      return {
        backgroundColor: baseColor,
        borderColor: baseColor,
        shadowColor: baseColor,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 5,
        marginHorizontal: 5,
      };
    } else {
      return {
        borderColor: baseColor,
        marginHorizontal: 5,
      };
    }
  };

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

  return (
    <View style={styles.container}>
      {/* Input Area with Glass Morphism */}
      <BlurView intensity={50} tint="light" style={styles.blurContainer}>
        <Text style={styles.title}>My Tasks</Text>
        <TextInput
          label="Title"
          value={newTask.title}
          onChangeText={(text) => setNewTask({ ...newTask, title: text })}
          style={styles.input}
          theme={{ colors: { primary: "purple", text: "#000" } }}
          mode="outlined"
        />
        <TextInput
          label="Description"
          value={newTask.description}
          onChangeText={(text) => setNewTask({ ...newTask, description: text })}
          style={styles.input}
          theme={{ colors: { primary: "purple", text: "#000" } }}
          mode="outlined"
        />
        <TouchableOpacity onPress={showDatePickerHandler} style={styles.dateInput}>
          <Text style={{ color: newTask.deadline ? "#000" : "#888" }}>
            {newTask.deadline || "Select Deadline"}
          </Text>
        </TouchableOpacity>
        {Platform.OS === "ios" && showDatePicker && (
          <DateTimePicker
            value={date}
            mode="datetime"
            display="default"
            onChange={onChangeDate}
          />
        )}
        <View style={styles.priorityContainer}>
          {["Low", "Medium", "High"].map(level => (
            <Chip
              key={level}
              mode={newTask.priority === level ? "contained" : "outlined"}
              onPress={() => setNewTask({ ...newTask, priority: level })}
              style={getChipStyle(level)}
            >
              {level}
            </Chip>
          ))}
        </View>
        <Button mode="contained" onPress={addTask} style={styles.addButton}>
          Add Task
        </Button>
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={<Button onPress={() => setMenuVisible(true)}>Filter: {filter}</Button>}
        >
          {["All", "Low", "Medium", "High"].map(level => (
            <Menu.Item
              key={level}
              title={level}
              onPress={() => {
                setFilter(level);
                setMenuVisible(false);
              }}
            />
          ))}
        </Menu>
      </BlurView>

      {/* Vertical list of small task cards */}
      <View style={styles.listContainer}>
        <FlatList
          data={filteredTasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => router.push("/fulllist")}>
              <Animated.View
                entering={SlideInRight}
                exiting={SlideOutLeft}
                layout={Layout.springify()}
                style={styles.smallCardWrapper}
              >
                <Card
                  style={[
                    styles.smallCard,
                    item.completed && styles.completed,
                    { borderLeftColor: getPriorityColor(item.priority), borderLeftWidth: 5 }
                  ]}
                >
                  <Card.Title title={item.title} />
                  <Card.Content>
                    <Text numberOfLines={1}>{item.deadline}</Text>
                  </Card.Content>
                </Card>
              </Animated.View>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      </View>

      <FAB
        icon="format-list-bulleted"
        label="Full List"
        style={styles.fab}
        onPress={() => router.push("/fulllist")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#f5f5f5", 
    padding: 20 
  },
  blurContainer: {
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  listContainer: {
    flex: 1,
  },
  title: { 
    fontSize: 24, 
    color: "purple",
    fontWeight: "bold", 
    marginBottom: 10 
  },
  input: { 
    marginBottom: 10,
    backgroundColor: "transparent",
    borderRadius: 10,
  },
  priorityContainer: { 
    flexDirection: "row", 
    justifyContent: "space-around", 
    marginBottom: 10 
  },
  addButton: { 
    marginTop: 10 
  },
  dateInput: {
    padding: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.7)",
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.3)"
  },
  fab: { 
    position: "absolute", 
    right: 20, 
    bottom: 20 
  },
  smallCardWrapper: {
    padding: 5,
    marginBottom: 10,
  },
  smallCard: {
    marginVertical: 5,
    padding: 10,
    minHeight: 100,
    borderRadius: 10,
  },
  completed: { 
    backgroundColor: "#d3d3d3" 
  },
});

 
