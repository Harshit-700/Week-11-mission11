
# Sprint 11 — CineStream Integrated MERN Stack Project

Sprint 11 is a fully integrated MERN Stack application built using React.js, Vite, Node.js, Express.js, MongoDB Atlas, and Mongoose ODM. The project combines frontend and backend architectures into a single scalable full-stack application pipeline.

The application demonstrates frontend-backend integration, REST API communication, MongoDB cloud database connectivity, and modern React-based UI development practices.

---
#📸 Screenshot- ![img alt](https://github.com/Harshit-700/Week-11-mission11/blob/1055ed5a889551a1fda9b4f04efcb8fb3f10b189/Screenshot%20(438).png)


🔗 Live Demo frontend url:https://week-11-mission11-3tsj.vercel.app/
🔗 Live Demo url:https://week-11-mission11-1.onrender.com/

## 📁 Project Structure

```txt
integrated-project/
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── .env
│
├── backend/
│   ├── routes/
│   ├── models/
│   ├── db.js
│   ├── Post.js
│   ├── server.js
│   ├── package.json
│   ├── .env
│   └── Sprint10_Postman_Collection.json
│
└── README.md
```

---

## ✨ Features

**MERN Stack Integration** — Frontend and backend connected using REST APIs.

**React + Vite Frontend** — Fast and modern frontend development environment.

**Express.js Backend** — Lightweight and scalable backend server.

**MongoDB Atlas Database** — Cloud database integration using MongoDB Atlas.

**Mongoose ODM** — Schema-based database modeling and validation.

**RESTful API Architecture** — Structured API routes for scalable backend communication.

**Dynamic API Communication** — Frontend fetches and submits data using API requests.

**Environment Variable Support** — Secure configuration using dotenv.

**Error Handling System** — Centralized backend error and validation handling.

**JSON API Responses** — Standardized structured API responses.

**Postman API Testing** — Backend APIs tested successfully using Postman.

---

##  Getting Started

### 1. Clone Repository

```bash
git clone <your-repository-url>
```

---

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

---

### 3. Install Backend Dependencies

```bash
cd backend
npm install
```

---

### 4. Configure Environment Variables

Frontend `.env`

```env
VITE_API_URL=http://localhost:5000
```

Backend `.env`

```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/databaseName
```

---

### 5. Start Backend Server

```bash
cd backend
npm start
```

Expected Output:

```bash
 MongoDB Connected
 API running on Port 5000
```

---

### 6. Start Frontend Server

```bash
cd frontend
npm run dev
```

Expected Output:

```bash
VITE vX.X.X ready in XXX ms
➜ Local: http://localhost:5173/
```

---

## 🔗 API Endpoints

| Method | Endpoint         | Description           |
| ------ | ---------------- | --------------------- |
| GET    | `/`              | Health check endpoint |
| GET    | `/api/posts`     | Retrieve all posts    |
| POST   | `/api/posts`     | Create a new post     |
| DELETE | `/api/posts/:id` | Delete post using ID  |

---

## 📥 Sample Request Body

### Create Blog Post

```json
{
  "title": "First MERN Post",
  "content": "Frontend successfully connected with backend API"
}
```

---

## 📤 Sample API Response

```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "6650ab1234567890abcdef12",
      "title": "First MERN Post",
      "content": "Frontend successfully connected with backend API"
    }
  ]
}
```

---

## 🧪 API Testing

All backend APIs were tested successfully using:

* Postman
* Browser API testing
* Frontend integration requests

Verified functionalities:

| Operation          | Status  |
| ------------------ | ------- |
| MongoDB Connection | Working |
| Backend Server     | Working |
| Frontend Server    | Working |
| API Integration    | Working |
| GET Requests       | Working |
| POST Requests      | Working |
| DELETE Requests    | Working |
| Validation Errors  | Working |

---

## 🧩 Backend Functionalities

| Functionality       | Description                        |
| ------------------- | ---------------------------------- |
| Database Connection | Connects server with MongoDB Atlas |
| Create Post API     | Inserts data into MongoDB          |
| Fetch Posts API     | Retrieves stored documents         |
| Delete Post API     | Removes documents dynamically      |
| Mongoose Validation | Validates request fields           |
| Error Handling      | Handles API and database errors    |
| REST API Routing    | Manages scalable endpoints         |

---

## 🎨 Frontend Functionalities

| Functionality           | Description                      |
| ----------------------- | -------------------------------- |
| React Components        | Modular frontend UI architecture |
| API Fetch Requests      | Retrieves backend data           |
| Dynamic Rendering       | Displays posts dynamically       |
| Form Submission         | Sends data to backend APIs       |
| Vite Development Server | Fast frontend build system       |
| Responsive UI           | User-friendly interface design   |

---

## ⚡ Full Stack Highlights

| Technology    | Purpose                   |
| ------------- | ------------------------- |
| React.js      | Frontend UI library       |
| Vite          | Frontend development tool |
| Node.js       | Backend runtime           |
| Express.js    | REST API framework        |
| MongoDB Atlas | Cloud database storage    |
| Mongoose      | MongoDB ODM               |
| dotenv        | Environment configuration |
| Postman       | API testing               |

---

## 🛠️ Built With

* React.js
* Vite
* Node.js
* Express.js
* MongoDB Atlas
* Mongoose ODM
* JavaScript (ES6+)
* REST APIs
* Postman
* dotenv

---

## 💡 Future Improvements

* Add JWT authentication system
* Add protected routes
* Add update/edit functionality
* Implement image uploads
* Add pagination and filtering
* Deploy frontend and backend separately
* Add admin dashboard
* Improve UI animations and responsiveness
* Add automated testing

---

## 🌍 Deployment

Frontend deployment options:

* Vercel
* Netlify

Backend deployment options:

* Render
* Railway
* Cyclic

Production-ready configuration:

```javascript
const PORT = process.env.PORT || 5000;
```

---

## 📄 License

This project is open source and available under the MIT License.


