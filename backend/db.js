const mongoose = require("mongoose");
const { seedAuthUsers, seedAppUsers, seedRequests } = require("./seed");

mongoose.connect("mongodb+srv://gaurav1234:gaurav1234@internal-admin.wrkqsjn.mongodb.net/?appName=Internal-admin")
.then(async () =>{
    console.log("MongoDB connected");

    await seedAuthUsers();
    await seedAppUsers();
    await seedRequests();

    console.log("✅ Seeding complete");
})
.catch(err => console.log(err));