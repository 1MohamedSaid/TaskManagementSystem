import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for API requests
import './login.css'; // Import CSS for styling
import { setUserSession } from '../Utils/Common';

const AuthForm = () => {
  // State management
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Loading state for API calls
  const [error, setError] = useState(null);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous messages
    setMessage('');
    setError(null);

    // Simple client-side validation
    if (!email || !password) {
      setError('Both email and password are required.');
      return;
    }

    // Prepare request data
    const requestData = {
      email,
      password,
    };

    // Determine the API endpoint
    const apiEndpoint = isRegistering ? 'http://127.0.0.1:8080/api/auth/register' : 'http://127.0.0.1:8080/api/auth/login';

    try {
      setLoading(true);

      // API request
      const response = await axios.post(apiEndpoint, requestData, {
        headers: { 'Content-Type': 'application/json' },
      });

      setLoading(false);

      // Handle the response
      if (response.status === 200) {
        const data = response.data;
        console.log(data)

        if (data) {
          setMessage(isRegistering ? 'Registration successful!' : 'Login successful!');
          resetForm();

          // Handle login success (e.g., save token, redirect user)
          if (!isRegistering) {
            // Simulate saving the token in localStorage (or any state management tool)
            setUserSession(data);

            // Redirect user to the dashboard or home page
            window.location.href = '/dashboard'; // Change this to your dashboard path
          }
        } else {
          setError(data.message || 'An unexpected error occurred. Please try again.');
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  // Reset form fields
  const resetForm = () => {
    setEmail('');
    setPassword('');
  };

  // Toggle between Login and Register forms
  const toggleForm = () => {
    setIsRegistering(!isRegistering);
    resetForm();
    setMessage('');
    setError(null);
  };

  return (
    <div className="auth-form-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>{isRegistering ? 'Register' : 'Login'}</h2>

        {error && <p className="error">{error}</p>}
        {message && <p className="message">{message}</p>}

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading
            ? isRegistering
              ? 'Registering...'
              : 'Logging in...'
            : isRegistering
            ? 'Register'
            : 'Login'}
        </button>

        <button type="button" onClick={toggleForm} className="toggle-btn">
          {isRegistering ? 'Switch to Login' : 'Switch to Register'}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
