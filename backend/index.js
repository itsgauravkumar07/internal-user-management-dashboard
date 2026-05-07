const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const connectDB = require("./db");

const app = express();

let AuthUser = require("./models/AuthUsers")
let AppUser = require("./models/AppUser");
let Request = require("./models/Request");

app.use(cors());
app.use(express.json());

app.use(async (req, res, next) => {
  await connectDB();
  next();
});

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
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
        {userId: user._id, appUserId: user.appUserId, role: user.role },
        process.env.JWT_SECRET,
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


//Get All App-user API
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

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server runnung on port ${PORT}`);
});