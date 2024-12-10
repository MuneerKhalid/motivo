import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  SelectChangeEvent,
  Alert,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import axios from "axios";
import CategorySelect from "./CategorySelect";

interface TaskFormProps {
  handleClose: () => void;
  setTasks: React.Dispatch<React.SetStateAction<any[]>>;
}

const TaskForm: React.FC<TaskFormProps> = ({ handleClose, setTasks }) => {
  const [newTask, setNewTask] = useState<{
    title: string;
    description: string;
    priority: string;
    category: string;
    dueDate: Date | null;
  }>({
    title: "",
    description: "",
    priority: "medium",
    category: "",
    dueDate: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handlePriorityChange = (e: SelectChangeEvent<string>) => {
    setNewTask((prevTask) => ({
      ...prevTask,
      priority: e.target.value,
    }));
  };

  const handleDueDateChange = (date: Date | null) => {
    setNewTask((prevTask) => ({
      ...prevTask,
      dueDate: date,
    }));
  };

  const handleAddTask = async () => {
    try {
      if (!newTask.title || !newTask.description) {
        console.error("Title and description are required");
        <Alert severity="error">This is an error Alert.</Alert>
        return;
      }

      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/task/create",
        newTask,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks((prevTasks) => [...prevTasks, response.data]);
      handleClose();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <form>
      <TextField
        label="Task Title"
        variant="filled"
        fullWidth
        name="title"
        value={newTask.title}
        onChange={handleInputChange}
        margin="normal"
      />
      <TextField
        label="Description"
        variant="filled"
        fullWidth
        name="description"
        value={newTask.description}
        onChange={handleInputChange}
        margin="normal"
      />
      <FormControl variant="filled" fullWidth margin="normal">
        <InputLabel>Priority</InputLabel>
        <Select
          label="Priority"
          value={newTask.priority}
          onChange={handlePriorityChange}
        >
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="high">High</MenuItem>
        </Select>
      </FormControl>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          label="Due Date and Time"
          value={newTask.dueDate}
          onChange={handleDueDateChange}
          slotProps={{ textField: { fullWidth: true, margin: "normal" } }}
        />
      </LocalizationProvider>
      <CategorySelect
        selectedCategory={newTask.category}
        setCategory={(category) =>
          setNewTask((prev) => ({ ...prev, category }))
        }
      />
      <Button
        onClick={handleAddTask}
        color="primary"
        fullWidth
        variant="contained"
      >
        Add Task
      </Button>
    </form>
  );
};

export default TaskForm;
