import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteTask, toggleCompleteTask } from "../redux/taskSlice";
import "../styles/taskModel.css";

function TaskCard({ task }) {
  const dispatch = useDispatch();
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
    setConfirmModalOpen(false);
  };

  return (
    <Card className="task-card" variant="outlined">
      <CardContent>
        <Typography variant="h6">{task.title}</Typography>
        <Typography variant="body2" className="body-text">
          {task.description}
        </Typography>
        <Typography variant="body2" className="due-date">
          Due: {new Date(task.dueDate).toLocaleDateString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          className="complete-button"
          size="small"
          color={task.completed ? "secondary" : "primary"}
          onClick={() => dispatch(toggleCompleteTask(task.id))}
        >
          {task.completed ? "Unmark" : "Complete"}
        </Button>
        <Button
          className="delete-button"
          size="small"
          color="error"
          onClick={() => setConfirmModalOpen(true)}
        >
          Delete
        </Button>
      </CardActions>
      {isConfirmModalOpen && (
        <div className="confirmation-modal">
          <div className="modal-content">
            <Typography>Are you sure you want to delete this task?</Typography>
            <Button
              className="yes-button"
              variant="contained"
              color="error"
              onClick={handleDelete}
            >
              Yes
            </Button>
            <Button
              className="no-button"
              variant="outlined"
              onClick={() => setConfirmModalOpen(false)}
            >
              No
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}

export default TaskCard;
