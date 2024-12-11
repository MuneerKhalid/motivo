import React, { useState } from "react";
import {
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
  Typography,
  Snackbar,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import axiosInstance from "../../axiosConfig";
import TaskModal from "./TaskModal";

interface TaskItemProps {
  task: any;
  setTasks: React.Dispatch<React.SetStateAction<any[]>>;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, setTasks }) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  const handleCheckboxChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newStatus = event.target.checked ? "completed" : "pending";
    try {
      await axiosInstance.patch(`/task/updateStatus/${task._id}`, {
        status: newStatus,
      });
      setTasks((prev) =>
        prev.map((t) => (t._id === task._id ? { ...t, status: newStatus } : t))
      );
      setSnackbarMessage("Status Updated successfully");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  const handleDeleteClick = async () => {
    try {
      await axiosInstance.delete(`/task/delete/${task._id}`);
      setTasks((prev) => prev.filter((t) => t._id !== task._id));
      setSnackbarMessage("Task Deleted");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
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

  const handleEditClick = () => {
    setOpenEditModal(true); 
  };

  return (
    <>
      <ListItem disablePadding>
        <Checkbox
          checked={task.status === "completed"}
          onChange={handleCheckboxChange}
          inputProps={{ "aria-label": `Checkbox for task ${task.title}` }}
        />
        <ListItemText
          primary={task.title}
          secondary={
            <>
              <Typography>{task.description}</Typography>
              <Typography>
                Status: {task.status} - Priority: {task.priority}
              </Typography>
              <Typography>
                {" "}
                Due Date:{" "}
                {task.dueDate ? calculateTimeLeft(task.dueDate) : "No due date"}
              </Typography>
            </>
          }
        />
        <IconButton edge="start" onClick={handleEditClick}>
          <Edit />
        </IconButton>
        <IconButton edge="end" onClick={handleDeleteClick}>
          <Delete />
        </IconButton>
      </ListItem>

      <TaskModal
        open={openEditModal}
        handleClose={() => setOpenEditModal(false)}
        setTasks={setTasks}
        task={task}
      />

      <Snackbar
        open={openSnackbar}
        message={snackbarMessage}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </>
  );
};

export default TaskItem;
