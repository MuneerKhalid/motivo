import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Alert,
  Box,
  SelectChangeEvent,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import axiosInstance from "../../axiosConfig";
import CategorySelect from "./CategorySelect";

interface TaskFormProps {
  handleClose: () => void;
  setTasks: React.Dispatch<React.SetStateAction<any[]>>;
  task?: any;
}

const TaskForm: React.FC<TaskFormProps> = ({ handleClose, setTasks, task }) => {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "pending",
    priority: "medium",
    category: "",
    dueDate: null as Date | null,
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (task) {
      setNewTask({
        title: task.title || "",
        description: task.description || "",
        status: "pending",
        priority: task.priority || "medium",
        category: task.category || "",
        dueDate: task.dueDate ? new Date(task.dueDate) : null,
      });
    }
  }, [task]);

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
      priority: e.target.value as string,
    }));
  };

  const handleDueDateChange = (date: Date | null) => {
    setNewTask((prevTask) => ({
      ...prevTask,
      dueDate: date,
    }));
  };

  const handleSubmit = async () => {
    if (!newTask.title || !newTask.description) {
      setError("Title and description are required.");
      return;
    }

    setError(null);

    try {
      if (task) {
        if (!task._id) {
          throw new Error("Task ID is missing");
        }

        await axiosInstance.put(`/task/update/${task._id}`, newTask);
        setTasks((prev) =>
          prev.map((t) => (t._id === task._id ? { ...t, ...newTask } : t))
        );
      } else {
        await axiosInstance.post("/task/create", newTask);
        setTasks((prev) => [...prev, newTask]);
      }
      handleClose();
    } catch (err) {
      console.error("Error saving task:", err);
      setError("Failed to save the task. Please try again.");
    }
  };

  return (
    <form>
      <Box display="flex" flexDirection="column" gap={2}>
        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          label="Task Title"
          variant="outlined"
          fullWidth
          name="title"
          value={newTask.title}
          onChange={handleInputChange}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          name="description"
          multiline
          rows={4}
          value={newTask.description}
          onChange={handleInputChange}
        />
        <FormControl variant="outlined" fullWidth>
          <InputLabel>Priority</InputLabel>
          <Select
            value={newTask.priority}
            onChange={handlePriorityChange}
            label="Priority"
            name="priority"
          >
            <MenuItem value="high">High</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="low">Low</MenuItem>
          </Select>
        </FormControl>

        <CategorySelect
          selectedCategory={newTask.category}
          setCategory={(category) => setNewTask((prev) => ({ ...prev, category }))}
        />

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            label="Due Date"
            value={newTask.dueDate}
            onChange={handleDueDateChange}
            slotProps={{
              textField: {
                fullWidth: true,
                margin: "normal",
              },
            }}
          />
        </LocalizationProvider>

        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
      </Box>
    </form>
  );
};

export default TaskForm;
