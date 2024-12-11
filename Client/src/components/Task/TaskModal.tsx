// src/components/TaskModal.tsx
import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import TaskForm from "./TaskForm";

interface TaskModalProps {
  open: boolean;
  handleClose: () => void;
  setTasks: React.Dispatch<React.SetStateAction<any[]>>;
  task: any; // Add task prop to receive the task for editing
}

const TaskModal: React.FC<TaskModalProps> = ({ open, handleClose, setTasks, task }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent>
        <TaskForm
          handleClose={handleClose}
          setTasks={setTasks}
          task={task} // Pass the task to the TaskForm for editing
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskModal;
