// src/components/TaskForm.tsx
import React, { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import axios from "axios";
import CategorySelect from "./CategorySelect";

interface TaskFormProps {
  handleClose: () => void;
  setTasks: React.Dispatch<React.SetStateAction<any[]>>;
}

const TaskForm: React.FC<TaskFormProps> = ({ handleClose, setTasks }) => {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium",
    category: "",
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

  const handleAddTask = async () => {
    try {
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
        fullWidth
        name="title"
        value={newTask.title}
        onChange={handleInputChange}
        margin="normal"
      />
      <TextField
        label="Description"
        fullWidth
        name="description"
        value={newTask.description}
        onChange={handleInputChange}
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
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
