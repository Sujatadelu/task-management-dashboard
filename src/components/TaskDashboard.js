import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Container, Typography, Grid, Button, TextField } from "@mui/material";
import TaskFormModal from "./TaskFormModal";
import TaskCard from "./TaskCard";
import { reorderTasks } from "../redux/taskSlice";
import "../styles/dashboard.css";

function TaskDashboard() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);

  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "All") return true;
      if (filter === "Completed") return task.completed;
      if (filter === "Pending") return !task.completed;
      if (filter === "Overdue")
        return new Date(task.dueDate) < new Date() && !task.completed;
      return true;
    })
    .filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedTasks = Array.from(tasks);
    const [movedTask] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, movedTask);
    dispatch(reorderTasks(reorderedTasks));
  };

  return (
    <Container maxWidth="lg" className="dashboard-container">
      <div className="dashboard-left">
        <Typography variant="h5" gutterBottom className="filters-heading">
          Filters
        </Typography>
        {["All", "Completed", "Pending", "Overdue"].map((status) => (
          <Button
            key={status}
            variant={filter === status ? "contained" : "outlined"}
            onClick={() => setFilter(status)}
            className="filter-button"
          >
            {status}
          </Button>
        ))}
      </div>

      <div className="dashboard-right">
        <Typography variant="h4" gutterBottom>
          Task Management Dashboard
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => setModalOpen(true)}
          className="add-task-button"
        >
          Add Task
        </Button>

        <TextField
          fullWidth
          placeholder="Search tasks by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="tasks">
            {(provided) => (
              <Grid
                container
                spacing={2}
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="tasks-grid"
              >
                {filteredTasks.map((task, index) => (
                  <Draggable
                    key={task.id}
                    draggableId={task.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <Grid item xs={12} sm={6} md={4}>
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TaskCard task={task} />
                        </div>
                      </Grid>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Grid>
            )}
          </Droppable>
        </DragDropContext>

        {isModalOpen && <TaskFormModal onClose={() => setModalOpen(false)} />}
      </div>
    </Container>
  );
}

export default TaskDashboard;
