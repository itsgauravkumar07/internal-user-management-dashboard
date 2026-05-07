require("dotenv").config();

const connectDB = require("./db");

const {
  seedAuthUsers,
  seedAppUsers,
  seedRequests
} = require("./seed");

async function runSeed() {

  await connectDB();

  const users = await seedAppUsers();

  await seedAuthUsers(users);

  await seedRequests();

  console.log("✅ Seeding complete");

  process.exit();
}

runSeed();