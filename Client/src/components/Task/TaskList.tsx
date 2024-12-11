import React, { useEffect, useState } from "react";
import { List, Typography, IconButton, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TaskItem from "./TaskItem";
import TaskModal from "./TaskModal";
import axiosInstance from "../../axiosConfig";


const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axiosInstance.get(`/task/getTasks`);
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

  if (loading) return <Typography>Loading tasks...</Typography>;

  return (
    <div>
      <Typography variant="h6">Your Tasks</Typography>
      <List>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskItem key={task._id} task={task} setTasks={setTasks} />
          ))
        ) : (
          <Typography>No tasks available</Typography>
        )}
      </List>
      <Box display="flex" alignItems="center" p={2}>
        <IconButton color="primary" onClick={handleOpenModal}>
          <AddIcon />
        </IconButton>
        <Typography variant="body1" style={{ marginLeft: 8, color: "gray" }}>
          Add Task
        </Typography>
      </Box>
      <TaskModal
        open={openModal}
        handleClose={handleCloseModal}
        setTasks={setTasks}
      />
    </div>
  );
};

export default TaskList;
