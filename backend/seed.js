const bcrypt = require("bcrypt");
const AuthUser = require("./models/AuthUsers");
const AppUser = require("./models/AppUser");
const Request = require("./models/Request");

async function seedAuthUsers(appUsers){
  const count = await AuthUser.countDocuments();
  if(count > 0) return;

  const hashed = await bcrypt.hash("123456", 10);

  await AuthUser.insertMany([
    {
      email: "admin@test.com",
      password: hashed,
      role: "admin",
      appUserId: appUsers[0]._id
    },
    {
      email: "member@test.com",
      password: hashed,
      role: "member",
      appUserId: appUsers[1]._id
    }
  ]);

  console.log("✅ Auth users seeded");
}

async function seedAppUsers(){
  const count = await AppUser.countDocuments();
  if(count > 0) {
    return await AppUser.find();
  }

  const users = await AppUser.insertMany([
    { name: "Demo Admin", role: "admin", status: "Active" },
    { name: "Demo Member", role: "member", status: "Active" },
    { name: "Ravi Kumar", role: "member", status: "Active" },
    { name: "Anjali Sharma", role: "member", status: "Inactive" }
  ]);

  console.log("✅ AppUsers seeded");

  return users;
}

async function seedRequests(){
  const count = await Request.countDocuments();
  if(count > 0) return;

  const users = await AppUser.find();
  if(users.length < 3) return;

  await Request.insertMany([
    {
      userId: users[1]._id,
      userName: users[1].name,
      type: "role_change",
      requestedValue: "admin",
      status: "pending"
    },
    {
      userId: users[2]._id,
      userName: users[2].name,
      type: "access_request",
      requestedValue: "Active",
      status: "pending"
    }
  ]);

  console.log("✅ Requests seeded");
}

module.exports = {
  seedAuthUsers,
  seedAppUsers,
  seedRequests
};