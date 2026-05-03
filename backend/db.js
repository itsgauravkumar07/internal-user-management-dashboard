const mongoose = require("mongoose");
const { seedAuthUsers, seedAppUsers, seedRequests } = require("./seed");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URL)
.then(async () =>{
    console.log("MongoDB connected");

    await seedAuthUsers();
    await seedAppUsers();
    await seedRequests();

    console.log("✅ Seeding complete");
})
.catch(err => console.log("❌ MongoDB ERROR" , err));