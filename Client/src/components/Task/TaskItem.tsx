// src/components/TaskItem.tsx
import React from "react";
import { ListItem, ListItemText, Checkbox, Typography } from "@mui/material";
import axios from "axios";

interface TaskItemProps {
  task: any;
  setTasks: React.Dispatch<React.SetStateAction<any[]>>;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, setTasks }) => {
  const updateTaskStatus = async (taskId: string, status: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:5000/api/task/updateStatus/${taskId}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Update the local task state after a successful update
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, status } : task
        )
      );
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleCheckboxChange = (taskId: string, checked: boolean) => {
    const newStatus = checked ? "completed" : "pending";
    updateTaskStatus(taskId, newStatus);
  };

  return (
    <ListItem disablePadding>
      <Checkbox
        checked={task.status === "completed"}
        onChange={(event) =>
          handleCheckboxChange(task._id, event.target.checked)
        }
        inputProps={{ "aria-label": `Checkbox for task ${task.title}` }}
      />
      <ListItemText
        primary={task.title}
        secondary={
          <>
            <Typography component="span" variant="body2" color="text.primary">
              {task.description}
            </Typography>
            <br />
            Status: {task.status} - Priority: {task.priority}
          </>
        }
      />
    </ListItem>
  );
};

export default TaskItem;
