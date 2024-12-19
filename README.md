# Backend for Portfolio Website

This is the backend API developed for my portfolio website. It handles authentication, user management, and testimonial submissions. The backend is built using **Node.js**, **Express**, and **Sequelize**, with a focus on scalability and security.

---

## Features

- **Authentication**: User registration and login using JWT tokens.
- **Role Management**: Implements role-based access control for different user roles.
- **CRUD Operations**:
  - Create, read, update, and delete testimonials.
  - Manage users and roles.
- **Input Validation**: Validates user input using **Joi** to ensure security and consistency.

---

## Technologies Used

- **Node.js**: Server-side JavaScript runtime.
- **Express**: Web framework for building APIs.
- **Sequelize**: ORM for managing database interactions.
- **JWT**: Secure authentication with JSON Web Tokens.
- **Joi**: Input validation library.
- **MySQL**: Relational database for persistent data storage.

---

## Project Structure

```plaintext
backend/
├── controllers/         # Handles the logic for API routes
├── middlewares/         # Middleware for JWT validation and role-based authorization
├── models/              # Database models using Sequelize
├── routes/              # Defines API endpoints
├── validations/         # Input validation using Joi
├── config/              # Database and server configuration
├── .env                 # Environment variables (not included in the repo)
├── index.js             # Main entry point of the application

### Database Schema
![Database Schema](path/to/database-schema-image.png)

### Postman Example
![Postman Request](path/to/postman-request-image.png)

