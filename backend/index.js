const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("./db");

const app = express();

// const users = [
//   {
//     id: 1,
//     email: "admin@test.com",
//     password: "$2b$10$rtJtV5UFpY8b9a/LV9OTc.qkodxS45FiQnIF9pYxZn66Kouj5UPiu",
//     role: "admin",
//   },
//   {
//     id: 2,
//     email: "member@test.com",
//     password: "$2b$10$rtJtV5UFpY8b9a/LV9OTc.qkodxS45FiQnIF9pYxZn66Kouj5UPiu",
//     role: "member",
//   }
// ];

let AuthUser = require("./models/AuthUsers")
let AppUser = require("./models/AppUser");
let Request = require("./models/Request");


// let appUsers = [
//   {
//     id: "u1",
//     name: "Demo Admin",
//     role: "admin",
//     status: "Active"
//   },
//   {
//     id: "u2",
//     name: "Demo Member",
//     role: "member",
//     status: "Active"
//   },
//   {
//     id: "u3",
//     name: "Ravina",
//     role: "member",
//     status: "Active"
//   },
//   {
//     id: "u4",
//     name: "Prabash",
//     role: "member",
//     status: "Active"
//   }
// ];

// let requests = [
//    {
//     id: "r1",
//     userId: "u2",
//     userName: "Demo Member",
//     type: "role_change",
//     requestedValue: "admin",
//     status: "pending",
//     createdAt: Date.now()
//   },
//   {
//     id: "r2",
//     userId: "u3",
//     userName: "Ravina - Demo Member",
//     type: "access_request",
//     requestedValue: "inactive",
//     status: "pending",
//     createdAt: Date.now()
//   }
// ];

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

    const user = await AuthUser.findOne({ email });

    if(!user){
        return res.status(401).json({ message: "User not find" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
        {userId: user._id, role: user.role },
        "secret123",
        {expiresIn: "1h" }
    );

    res.json({ token });
    
})

//Add new app-user API
app.post("/app-users", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin only" });
  }

  const { name, role, status } = req.body;

  if (!name || !role || !status) {
    return res.status(400).json({ message: "All fields required" });
  }

  const newUser = await AppUser.create({ name, role, status });

  res.json({ user: newUser });
});


//Get all App-user API
app.get("/app-users", authMiddleware, async (req, res) => {
 try {
  const users = await AppUser.find();
  res.json(users);
} catch (err) {
  res.status(500).json({ message: "Server error" });
}
});

//Edit app-user details API
app.put("/app-users/:id", authMiddleware, async (req, res) => {

  if (req.user.role !== "admin") {
  return res.status(403).json({ message: "Admin only" });
}
  const updatedUser = await AppUser.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json({ user: updatedUser });
});

//Delete API to delete app-user
app.delete("/app-users/:id", authMiddleware, async (req, res) => {

  if (req.user.role !== "admin") {
  return res.status(403).json({ message: "Admin only" });
}

 const deletedUser = await AppUser.findByIdAndDelete(req.params.id);

  res.json({ message: "User deleted", user: deletedUser });
});

//Create Request API
app.post("/requests", authMiddleware, async (req, res) => {

  if (!req.body.type || !req.body.requestedValue || !req.body.userId) {
    return res.status(400).json({ message: "All fields required" });
  }

  const appUser = await AppUser.findById(req.body.userId);

  const newRequest = await Request.create({
    userId: req.body.userId,
    userName: appUser?.name || "Unknown",
    type: req.body.type,
    requestedValue: req.body.requestedValue,
    status: "pending",
    createdAt: Date.now()
  });

  res.json({ request: newRequest });
})

//Get requests
app.get("/requests", authMiddleware, async (req, res) => {
  const requests = await Request.find();
  res.json(requests);
});

//Update request (Admin only)
app.put("/requests/:id", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin only" });
  }

  const request = await Request.findById(req.params.id);

  if (!request) {
    return res.status(404).json({ message: "Request not found" });
  }

  // update request status
  request.status = req.body.status;
  await request.save();
  
  // UPDATE USER IN DB
  if (req.body.status === "approved") {
    await AppUser.findByIdAndUpdate(
      request.userId,
      request.type === "role_change"
        ? { role: request.requestedValue }
        : { status: request.requestedValue }
    );
  }

  res.json({ request });
});

app.listen(4000, () => {
    console.log("server was running in port 4000");
});