import React, { useState } from 'react';
import { registerUser } from '../services/userService'; // Import the service
import './RegisterForm.css'; // Ensure you have corresponding CSS for styling
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  
  const navigate = useNavigate(); // Hook for programmatic navigation
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleLoginRedirect = () => {
    navigate('/'); // Redirect to login page
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors and messages
    setErrors({});
    setMessage('');

    // Basic validation
    const newErrors = {};
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.email.includes('@')) {
      newErrors.email = 'Invalid email address';
    }
    console.log(formData);
    
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        await registerUser(formData); // Use the service function
        setMessage('Registration successful!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: ''
        });
      } catch (error) {
        console.log("Error response data:", error.response.data);

        if (error.response && error.response.data.errors) {
          // Extract and set errors from backend response
          const backendErrors = {};
          error.response.data.errors.forEach((err) => {
            if (err.path) {
              backendErrors[err.path] = err.msg;
            } else {
              // Log unexpected error format
              console.warn("Unexpected error format:", err);
            }
          });
          setErrors(backendErrors);
        } else {
          setMessage('Registration failed. Please try again.');
        }
      }
    }
  };

  return (
    <div className="register-form">
      <h2>Register</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        </div>

        <button type="submit">Register</button>
      </form>
      <div className="login-redirect">
        <p>Already have an account?</p>
        <button onClick={handleLoginRedirect} className="login-button">Go to Login</button>
      </div>
    </div>
  );
};

export default RegisterForm;
