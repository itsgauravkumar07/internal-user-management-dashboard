# 📌 Internal User Management Dashboard

A **full-stack internal admin dashboard** built as part of my **#30DaysRemoteInternship challenge**.

This project simulates real-world internal tools used by startups for managing users, roles, and access workflows.

---

## 🎯 Project Objective

The goal of this project is to demonstrate **end-to-end full-stack development skills**:

- Role-based UI rendering
- Backend API design (Node + Express)
- Database modeling with MongoDB
- Authentication using JWT
- Real-world request/approval workflows
- Clean frontend architecture with React

---

## 🧠 Core Concept

The system supports two roles:

### 🔐 Admin
- Manage users (create, update, delete)
- Assign roles and statuses
- Approve/reject requests

### 👤 Member
- View users (read-only)
- Submit role/access requests
- Track request status

---

## 🔐 Authentication System

- JWT-based authentication
- Role-based access control (RBAC)
- Protected backend routes
- Demo login via role selection screen

---

## 🧩 Features

### 🖥 Frontend
- Role-based dashboard (Admin / Member)
- Global state management (Context API)
- Clean admin UI (Sidebar + Navbar)
- Request workflow UI
- Responsive layout

### ⚙ Backend
- REST APIs (Express)
- JWT authentication middleware
- CRUD operations for users
- Request approval system

### 🗄 Database
- MongoDB Atlas
- Mongoose models:
  - AuthUser (login users)
  - AppUser (managed users)
  - Request (workflow system)

### 🎯 Demo Data (Seeded)
- Pre-created admin & member accounts
- Sample users
- Sample requests

---

## 🛠 Tech Stack

### Frontend
- React
- JavaScript (ES6+)
- Tailwind CSS
- React Router
- Context API

### Backend
- Node.js
- Express.js
- JWT (Authentication)
- bcrypt (Password hashing)

### Database
- MongoDB Atlas
- Mongoose

---

## 📐 Architecture Overview

```text
Frontend (React)
   ↓
API Layer (Express)
   ↓
Authentication (JWT Middleware)
   ↓
Database (MongoDB)
```

---

## 📂 Project Structure

```text
backend/
├─ models/ # MongoDB schemas
├─ seed.js # Demo data seeding
├─ db.js # DB connection
├─ index.js # API routes

frontend/
├─ components/
├─ pages/
├─ context/
├─ layouts/
```


---

## 🚀 Demo Login

Use the role selection screen for demo login


---

## 🌐 Live Demo

🔗 https://internal-user-management-dashboard.vercel.app/

📹 Demo Video  
https://www.youtube.com/watch?v=JRiDMn_0jFk

---

## 🚧 Current Status

- ✅ Full-stack version completed  
- ✅ Backend + Database integrated  
- ✅ Real API workflows implemented  

---

## 📅 Challenge Context

This project is part of my **#30DaysRemoteInternship challenge**, where I:

- Build real-world projects
- Share progress daily on X
- Focus on fundamentals + execution
- Prepare for remote frontend roles

---

## 🧠 Key Learnings

- JWT authentication flow
- MongoDB data modeling
- Frontend–backend integration
- Role-based system design
- Debugging real-world issues (auth, IDs, async state)

---

## 📬 Feedback

Feedback, suggestions, and improvements are always welcome.