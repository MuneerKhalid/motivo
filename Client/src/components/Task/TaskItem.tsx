import React from "react";
import { ListItem, ListItemText, Checkbox, Typography, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
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

  const calculateTimeLeft = (dueDate: string) => {
    const now = new Date();
    const due = new Date(dueDate);
    const timeDiff = due.getTime() - now.getTime();

    if (timeDiff > 0) {
      const daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hoursLeft = Math.floor(
        (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutesLeft = Math.floor(
        (timeDiff % (1000 * 60 * 60)) / (1000 * 60)
      );

      if (daysLeft > 0) {
        return `${daysLeft} day(s) ${hoursLeft} hour(s) left`;
      } else if (hoursLeft > 0) {
        return `${hoursLeft} hour(s) ${minutesLeft} minute(s) left`;
      } else {
        return `${minutesLeft} minute(s) left`;
      }
    } else {
      const daysOverdue = Math.floor(
        Math.abs(timeDiff) / (1000 * 60 * 60 * 24)
      );
      const hoursOverdue = Math.floor(
        (Math.abs(timeDiff) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutesOverdue = Math.floor(
        (Math.abs(timeDiff) % (1000 * 60 * 60)) / (1000 * 60)
      );

      if (daysOverdue > 0) {
        return `Overdue by ${daysOverdue} day(s) ${hoursOverdue} hour(s)`;
      } else if (hoursOverdue > 0) {
        return `Overdue by ${hoursOverdue} hour(s) ${minutesOverdue} minute(s)`;
      } else {
        return `Overdue by ${minutesOverdue} minute(s)`;
      }
    }
  };

  const handleEditClick = (taskId: string) => {
    // Implement the edit functionality here
    // For example, open a modal or navigate to an edit page with taskId
    console.log("Edit task", taskId);
  };


  const handleDeleteClick = async (taskId: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:5000/api/task/delete/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <>
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
              <br />
              Due Date:{" "}
              {task.dueDate ? calculateTimeLeft(task.dueDate) : "No due date"}
            </>
          }
        />
        <IconButton
          edge="end"
          aria-label="edit"
          onClick={() => handleEditClick(task._id)}
        >
          <Edit />
        </IconButton>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => handleDeleteClick(task._id)}
        >
          <Delete />
        </IconButton>
      </ListItem>
    </>
  );
};

export default TaskItem;
