// src/components/TaskModal.tsx
import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import TaskForm from "./TaskForm";

interface TaskModalProps {
  open: boolean;
  handleClose: () => void;
  setTasks: React.Dispatch<React.SetStateAction<any[]>>;
}

const TaskModal: React.FC<TaskModalProps> = ({ open, handleClose, setTasks }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Task</DialogTitle>
      <DialogContent>
        <TaskForm handleClose={handleClose} setTasks={setTasks} />
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
