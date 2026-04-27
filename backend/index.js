const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();

const users = [];

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend running");
});

 app.post("/signup", async (req, res) =>{
    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json({ message: "Email and password both required" });
    }

    const existingUser = users.find(u => u.email === email);
    if(existingUser){
        return res.status(400).json({ message: "User is already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
        id: users.length + 1,
        email,
        password: hashedPassword,
        role: "member"
    };

    users.push(newUser);
    
    res.json({message: "User created"});
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

     if(!email || !password){
        return res.status(400).json({ message: "Email and password both required" });
    }

    const user = users.find(u => u.email === email);

    if(!user){
        return res.status(401).json({ message: "User not find" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(401).json({ message: "Invalid passowrd" });
    }

    const token = jwt.sign(
        {userId: user.id, role: user.role },
        "secret123",
        {expiresIn: "1h" }
    );

    res.json({ token });
    
})

app.listen(4000, () => {
    console.log("server was running in port 4000");
});