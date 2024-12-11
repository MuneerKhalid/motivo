import React, { useState } from "react";
import {
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
  Typography,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import axiosInstance from "../../axiosConfig";
import TaskModal from "./TaskModal"; // Import the TaskModal component

interface TaskItemProps {
  task: any;
  setTasks: React.Dispatch<React.SetStateAction<any[]>>;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, setTasks }) => {
  const [openEditModal, setOpenEditModal] = useState(false); // State to control modal visibility

  const handleCheckboxChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newStatus = event.target.checked ? "completed" : "pending";
    try {
      await axiosInstance.patch(
        `/task/updateStatus/${task._id}`,
        { status: newStatus }
      );
      setTasks((prev) =>
        prev.map((t) => (t._id === task._id ? { ...t, status: newStatus } : t))
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteClick = async () => {
    try {
      await axiosInstance.delete(`/task/delete/${task._id}`);
      setTasks((prev) => prev.filter((t) => t._id !== task._id));
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
    setOpenEditModal(true); // Open the modal when the Edit button is clicked
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
              <Typography>Status: {task.status} - Priority: {task.priority}</Typography>
              <Typography>
                {" "}
                Due Date:{" "}
                {task.dueDate ? calculateTimeLeft(task.dueDate) : "No due date"}
              </Typography>
            </>
          }
        />
        <IconButton edge="end" onClick={handleEditClick}>
          <Edit />
        </IconButton>
        <IconButton edge="end" onClick={handleDeleteClick}>
          <Delete />
        </IconButton>
      </ListItem>

      {/* Add Task Modal for editing */}
      <TaskModal
        open={openEditModal}
        handleClose={() => setOpenEditModal(false)} // Close modal when the close button is clicked
        setTasks={setTasks}
        task={task} // Pass the task to edit
      />
    </>
  );
};

export default TaskItem;
