# Prompts.md

# Sprint 11 – Prompts Documentation

This document contains the complete collection of structured prompts used during the development of the Sprint 11 Integrated MERN Stack Application.

---

## 1. MERN Stack Project Integration

Create a fully integrated MERN Stack application using React.js, Vite, Node.js, Express.js, MongoDB Atlas, and Mongoose.

The application should:

* Combine frontend and backend into a unified project structure
* Support scalable full-stack architecture
* Enable frontend-backend API communication
* Maintain clean folder organization


---

## 2. React Frontend Setup

Build a frontend application using React.js and Vite.

The frontend should:

* Use reusable React components
* Render dynamic content from APIs
* Support fast Vite development server
* Include modular project architecture
* Handle API requests cleanly
* Maintain responsive UI structure

---

## 3. Express Backend Server Configuration

Create a backend REST API server using Node.js and Express.js.

The backend should:

* Initialize successfully
* Use Express middleware architecture
* Support scalable API routing
* Handle JSON request bodies
* Connect frontend requests with backend APIs
* Display clean server startup messages

---

## 4. MongoDB Atlas Database Integration

Configure MongoDB Atlas as the cloud database solution.

The backend should:

* Use MongoDB Atlas connection strings from environment variables
* Establish connections using Mongoose ODM
* Handle successful and failed database connections properly
* Store application data persistently
* Exit the process safely if database connection fails

---

## 5. Mongoose Schema Architecture

Create a Mongoose schema and model for storing blog posts.

Each post should contain:

* Title
* Content
* Created timestamp

The schema should include:

* Required field validation
* String trimming
* Maximum character limits
* Automatic timestamps
* Clean JSON formatting

---

## 6. RESTful API Route Development

Design RESTful API endpoints using Express Router.

The backend should support:

* GET `/`
* GET `/api/posts`
* POST `/api/posts`
* DELETE `/api/posts/:id`

All routes should:

* Return structured JSON responses
* Use proper HTTP status codes
* Support frontend integration
* Handle errors properly

---

## 7. Frontend API Integration

Integrate the React frontend with the Express backend APIs.

The frontend should:

* Fetch data from backend APIs dynamically
* Display posts on the UI
* Submit forms using POST requests
* Handle loading and error states
* Update UI after API operations

---

## 8. Validation and Error Handling System

Implement centralized validation and error handling.

The backend should:

* Handle invalid MongoDB requests
* Catch Mongoose validation errors
* Prevent empty form submissions
* Return structured JSON error responses
* Include global error handling middleware
* Include 404 middleware support

---

## 9. Environment Variable Management

Implement environment variable support using dotenv.

The project should:

* Store sensitive credentials securely
* Load MongoDB connection strings safely
* Configure ports dynamically
* Maintain reusable `.env.example` templates
* Separate frontend and backend environment variables

---

## 10. Full Stack Testing Workflow

Test the integrated MERN application.

The testing process should verify:

* Backend API functionality
* MongoDB database operations
* Frontend-backend communication
* Form submission workflows
* Dynamic UI rendering
* API error handling
* CRUD operations

---

## 11. Deployment Preparation

Prepare the MERN Stack application for deployment.

The application should:

* Support frontend deployment on Vercel or Netlify
* Support backend deployment on Render or Railway
* Use production-ready environment variables
* Configure dynamic server ports
* Maintain scalable deployment architecture

---

## 12. Future Scalability Planning

Design the project for future scalability.

Future improvements may include:

* JWT authentication
* User authorization system
* Update/edit functionality
* Pagination and filtering
* Image uploads with cloud storage
* Admin dashboard integration

