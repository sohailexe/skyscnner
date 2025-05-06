import { User } from "../routes/user/user.model";
import { Otp } from "../routes/user/otp.model";

export const cleanDatabase = async () => {
  try {
    await User.deleteMany({});
    await Otp.deleteMany({});
    console.log("Database cleaned successfully.");
  } catch (error) {
    console.error("Error cleaning the database:", error);
  } finally {
    process.exit(0);
  }
};
