// src/TaskList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for API requests
import './TaskList.css'; // Import the CSS file for styling
import { getToken } from '../Utils/Common';

const Dashboard = () => {
  // State variables for tasks, new task, edit task, and filter
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTask, setEditTask] = useState({ text: '', status: 'TODO', description:'',dueDate:"2024-08-05"});
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch tasks from the API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const headers = { 'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json',};
        const response = await axios.get('http://127.0.0.1:8080/api/tasks', { headers });
        setTasks(response.data);
        console.log(response.data)
        setLoading(false);
      } catch (err) {
        console.error('Error fetching tasks:', err);
        setError('Failed to fetch tasks. Please try again later.');
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Add a new task to the list
  const addTask = async () => {
    if (newTask.trim()) {
      try {
        setLoading(true);
        const headers = { 'Authorization': `Bearer ${getToken()}`,
        'Content-Type': 'application/json',};
        console.log(newTask)
        const task = {
          "title": newTask,
          "description":newTask,
          "status":"TODO",
          "dueDate":"2024-08-05"
      }
      const newTaskObj = {
        id: tasks.length + 1,
        title: newTask,
        status: 'TODO',
        description: newTask,
        dueDate: "2024-08-05" // Default status for new tasks
      };
        const response = await axios.post('http://127.0.0.1:8080/api/tasks', task, {headers});
        setTasks([...tasks, newTaskObj]);
        setNewTask('');
        setLoading(false);
      } catch (err) {
        console.error('Error adding task:', err);
        setError('Failed to add task. Please try again.');
        setLoading(false);
      }
    }
  };

  // Delete a task from the list
  const deleteTask = async (id) => {
    try {
      setLoading(true);
      const headers = { 'Authorization': `Bearer ${getToken()}`}
      await axios.delete(`http://127.0.0.1:8080/api/tasks/${id}`, {headers});
      setTasks(tasks.filter((task) => task.id !== id));
      setLoading(false);
    } catch (err) {
      console.error('Error deleting task:', err);
      setError('Failed to delete task. Please try again.');
      setLoading(false);
    }
  };

  // Edit a task in the list
  const startEditingTask = (task) => {
    setEditTaskId(task.id);
    setEditTask({ title: task.title, status: task.status, description: task.description, dueDate: "2024-08-05" });
    setError(null); // Reset error message when starting to edit
  };

  const saveEditTask = async (id) => {
    try {
      setLoading(true);
      let task = {}
      for(const i in tasks){
        if(tasks[i].id === id){
          task = tasks[i]
        }
      }
      console.log(task)
      const headers = { 'Authorization': `Bearer ${getToken()}`}
      const response = await axios.post(`http://127.0.0.1:8080/api/tasks/${id}`,editTask, {headers});
      
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, ...editTask } : task // Update the task with the edited task details
        )
      );
      setEditTaskId(null);
      setEditTask({ title: '', status: 'TODO', description: '', dueDate: "2024-08-05" });
      setLoading(false);
    } catch (err) {
      console.error('Error updating task:', err);
      setError('Failed to update task. Please try again.');
      setLoading(false);
    }
  };

  // Change task status
  const changeTaskStatus = async (id, newStatus) => {
    console.log(id, newStatus)
    let task = {}
    for(const i in tasks){
      if(tasks[i].id === id){
        task = tasks[i]
      }
    }
    task.status = newStatus;
    console.log(task)
    try {
      setLoading(true);
      const headers = { 'Authorization': `Bearer ${getToken()}`}
      const response = await axios.post(`http://127.0.0.1:8080/api/tasks/${id}`,task, {headers});
      setLoading(false);
    } catch (err) {
      console.error('Error updating task status:', err);
      setError('Failed to update task status. Please try again.');
      setLoading(false);
    }
  };

  // Filter tasks by status
  const filteredTasks = tasks.filter((task) =>
    filter === 'All' ? true : task.status === filter
  );

  return (
    <div className="task-list">
    <h2>Task List</h2>
    {error && <p className="error">{error}</p>}
    <div className="add-task">
      <input
        type="text"
        placeholder="Add a new task..."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
    </div>
    <div className="filter-tasks">
      <label>Filter by status:</label>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="All">All</option>
        <option value="TODO">To Do</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="DONE">Complete</option>
      </select>
    </div>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Task</th>
          <th>Description</th>
          <th>Status</th>
          <th>Due Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredTasks.map((task) => (
          <tr key={task.id}>
            <td>{task.id}</td>
            <td>
              {editTaskId === task.id ? (
                <input
                  type="text"
                  value={editTask.title}
                  onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
                />
              ) : (
                <span>{task.title}</span>
              )}
            </td>
            <td>
            {editTaskId === task.id ? (
                <input
                  type="text"
                  value={editTask.description}
                  onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
                />
              ) : (
                <span>{task.description}</span>
              )}
            </td>
            <td>
              {editTaskId === task.id ? (
                <select
                  value={editTask.status}
                  onChange={(e) => setEditTask({ ...editTask, status: e.target.value })}
                >
                  <option value="TODO">To Do</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="DONE">Complete</option>
                </select>
              ) : (
                <select
                  value={task.status}
                  onChange={(e) => changeTaskStatus(task.id, e.target.value)}
                >
                  <option value="TODO">To Do</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="DONE">Complete</option>
                </select>
              )}
            </td>
            <td>
            {editTaskId === task.id ? (
                <input
                  type="date"
                  value={editTask.dueDate}
                  onChange={(e) => setEditTask({ ...editTask, dueDate: e.target.value })}
                />
              ) : (
              <span>{task.dueDate}</span>
              )}
            </td>
            <td>
              {editTaskId === task.id ? (
                <>
                  <button onClick={() => saveEditTask(task.id)}>Save</button>
                  <button onClick={() => setEditTaskId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={() => startEditingTask(task)}>Edit</button>
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

export default Dashboard;
