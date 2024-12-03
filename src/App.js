import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskDashboard from "./components/TaskDashboard";
import "./App.css";
import "./index.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/tasks" element={<TaskDashboard />} />
          <Route path="/" element={<TaskDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
