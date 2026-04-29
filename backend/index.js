const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

const users = [
  {
    id: 1,
    email: "admin@test.com",
    password: "$2b$10$rtJtV5UFpY8b9a/LV9OTc.qkodxS45FiQnIF9pYxZn66Kouj5UPiu",
    role: "admin",
    status: "Active"
  },
  {
    id: 2,
    email: "member@test.com",
    password: "$2b$10$rtJtV5UFpY8b9a/LV9OTc.qkodxS45FiQnIF9pYxZn66Kouj5UPiu",
    role: "member",
    status: "Active"
  }
];

let appUsers = [
  {
    id: "u1",
    name: "Demo Admin",
    role: "admin",
    status: "Active"
  },
  {
    id: "u2",
    name: "Demo Member",
    role: "member",
    status: "Active"
  },
  {
    id: "u3",
    name: "Ravina",
    role: "member",
    status: "Active"
  },
  {
    id: "u4",
    name: "Prabash",
    role: "member",
    status: "Active"
  }
];

let requests = [
   {
    id: "r1",
    userId: "u2",
    userName: "Demo Member",
    type: "role_change",
    requestedValue: "admin",
    status: "pending",
    createdAt: Date.now()
  },
  {
    id: "r2",
    userId: "u3",
    userName: "Ravina - Demo Member",
    type: "access_request",
    requestedValue: "inactive",
    status: "pending",
    createdAt: Date.now()
  }
];

app.use(cors());
app.use(express.json());


const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, "secret123");
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};

app.get("/", (req, res) => {
    res.send("Backend running");
});

//Login API
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

     if(!email || !password){
        return res.status(400).json({ message: "Email and password both required" });
    }

    const user = users.find(u => u.email === email.trim());

    if(!user){
        return res.status(401).json({ message: "User not find" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
        {userId: user.id, role: user.role },
        "secret123",
        {expiresIn: "1h" }
    );

    res.json({ token });
    
})

//Add new app-user API
app.post("/app-users", authMiddleware, (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin only" });
  }

  const { name, role, status } = req.body;

  const newUser = {
    id: crypto.randomUUID(),
    name,
    role,
    status
  };

  appUsers.push(newUser);

  res.json({ user: newUser });
});

//Get all App-user API
app.get("/app-users", (req, res) => {
  res.json(appUsers);
});

//Edit app-user details API
app.put("/app-users/:id", authMiddleware, (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin only" });
  }

  const { id } = req.params;
  const { name, role, status } = req.body;

  const userIndex = appUsers.findIndex(u => u.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  appUsers[userIndex] = {
    ...appUsers[userIndex],
    name,
    role,
    status
  };

  res.json({ user: appUsers[userIndex] });
});

//Delete API to delete app-user
app.delete("/app-users/:id", authMiddleware, (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin only" });
  }

  const { id } = req.params;

  const index = appUsers.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  const deletedUser = appUsers[index];

  appUsers.splice(index, 1);

  res.json({ message: "User deleted", user: deletedUser });
});

//Create Request API
app.post("/requests", authMiddleware, (req, res) => {
  const { type, requestedValue } = req.body;

  if(!type || !requestedValue) {
    return res.status(400).json({ message: "All fields required" });
  }

  const newRequest = {
    id: crypto.randomUUID(),
    userId: req.user.userId,
    userName: req.user.role === "admin" ? "Demo Admin" : "Demo Member",
    type,
    requestedValue,
    status: "pending",
    createdAt: Date.now()
  };

  requests.push(newRequest);

  res.json({ request: newRequest });
})

//Get requests
app.get("/requests", authMiddleware, (req, res) => {
  res.json(requests);
});

//Update request (Admin only)
app.put("/requests/:id", authMiddleware, (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin only" });
  }

  const { id } = req.params;
  const { status } = req.body;

  const request = requests.find(r => r.id === id);
  if (!request) {
    return res.status(404).json({ message: "Request not found" });
  }

  // update request status
  request.status = status;

  const user = appUsers.find(u => u.id === request.userId);

  if (user && status === "approved") {
    if (request.type === "role_change") {
      user.role = request.requestedValue;
    }

    if (request.type === "access_request") {
      user.status = request.requestedValue;
    }
  }

  res.json({ request });
});

app.listen(4000, () => {
    console.log("server was running in port 4000");
});