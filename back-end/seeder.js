import users from "./data/users.js";
import User from "./models/userModel.js";

import connectDB from "./config/db.js";
import "dotenv/config";

connectDB();

const importData = async () => {
  try {
    await User.deleteMany(); // Clear existing data
    await User.insertMany(users); // Insert new data

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.log(`Error: ${error.message}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.log(`Error: ${error.message}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
