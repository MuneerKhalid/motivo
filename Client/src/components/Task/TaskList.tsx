// src/components/TaskList.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { List, Typography, IconButton, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TaskItem from "./TaskItem";
import TaskModal from "./TaskModal";

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/task/getTasks",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  if (loading) {
    return <Typography>Loading tasks...</Typography>;
  }

  if (tasks.length === 0) {
    return <Typography>No tasks available</Typography>;
  }

  return (
    <div>
      <Typography variant="h6">Your Tasks</Typography>

      <List>
        {tasks.map((task) => (
          <TaskItem key={task._id} task={task} setTasks={setTasks} />
        ))}
      </List>

      <Box
        display="flex"
        alignItems="center"
      >
        <IconButton color="primary" onClick={handleOpenModal}>
          <AddIcon />
        </IconButton>
        <Typography variant="body1" style={{ marginLeft: 8, color: "lightgray" }}>
          Add Task
        </Typography>
      </Box>

      <TaskModal open={openModal} handleClose={handleCloseModal} setTasks={setTasks} />
    </div>
  );
};

export default TaskList;
