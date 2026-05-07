const mongoose = require("mongoose");
const { seedAuthUsers, seedAppUsers, seedRequests } = require("./seed");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URL)
.then(async () =>{
    console.log("MongoDB connected");

    const users = await seedAppUsers();
    await seedAuthUsers(users);
    await seedRequests();

    console.log("✅ Seeding complete");
})
.catch(err => console.log("❌ MongoDB ERROR" , err));