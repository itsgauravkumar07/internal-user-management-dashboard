
# Internal User Management Dashboard

A **frontend-only internal admin dashboard** built as part of my **#30DaysRemoteInternship** challenge.

This project focuses on **role-based UI, state management, and realistic internal dashboard workflows**, similar to tools used inside small teams and startups.

---

## 🎯 Project Objective

The goal of this project is to **practice and demonstrate core frontend engineering skills** by building a realistic internal dashboard, including:

- Role-based UI rendering  
- Shared global state using Context API  
- Clean component and layout structure  
- Simple but realistic user and request workflows  

This project intentionally avoids backend complexity to keep the focus on **frontend fundamentals**.

---

## 🧠 Core Concept

The app simulates two roles:

### Admin
- Manages users  
- Assigns roles and statuses  
- Reviews and handles access or role change requests  

### Member
- Views users (read-only)  
- Submits access or role change requests  
- Tracks request status  

A **role selection screen** is used to preview admin and member experiences.  
This is **not authentication**, but a deliberate simulation of role-based behavior in a frontend-only environment.

---

## 🧩 Features

- Role-based dashboard experience (Admin vs Member)  
- Persistent layout with sidebar and navbar  
- User management UI  
- Access / role request workflow  
- Global state management using Context API  
- Clean, responsive admin-style layout  

---

## 🛠 Tech Stack

- React  
- JavaScript (ES6+)  
- Tailwind CSS  
- React Router  
- Context API  

**No backend. No authentication. Mock data only.**

---

## 📐 Design Decisions

- **Frontend-only by design**  
  The project prioritizes UI logic, state flow, and component structure.

- **Role-based simulation instead of auth**  
  This allows clear demonstration of permissions and workflows without backend dependencies.

- **Desktop-first, mobile-safe layout**  
  Optimized for internal dashboard usage while remaining responsive.

---

## 📂 Project Structure (Simplified)

```text
src/
├─ components/ # Reusable UI components
├─ pages/ # Dashboard, Users, Requests, Role Select
├─ layouts/ # App layout (Navbar + Sidebar)
├─ context/ # Global state (Context API)
├─ App.jsx
└─ main.jsx
```

---

## 🚧 Current Status

- Building the core features...  

The project is being built **step by step** as part of the 30-day challenge.

---

## 📅 Challenge Context

This project is part of my **30DaysRemoteInternship** challenge, where I:

- Build one realistic frontend project deeply  
- Share progress daily on X  
- Focus on fundamentals, clarity, and consistency  
- Prepare for frontend internship opportunities  

---

## 📷 Demo

Demo video and screenshots will be added once core features are completed.

---

## 📝 Notes

This project uses **mock data and simulated roles** to focus on frontend architecture and UX patterns commonly seen in internal tools.

---

## App link : 

https://internal-user-management-dashboard.vercel.app/

---

## 📬 Feedback

Feedback, suggestions, and reviews are welcome.
