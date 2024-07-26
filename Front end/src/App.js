// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Pages/Dahsboard';
import Login from './Pages/Login';
import PrivateRoute from './Utils/PrivateRoutes';
import { getToken } from './Utils/Common';

function App() {
  const isAuthenticated = getToken(); // Replace with actual authentication logic

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login/>} />

        {/* Private Route */}
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Dashboard />
            </PrivateRoute>
          } 
        />

        {/* Login Route */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
