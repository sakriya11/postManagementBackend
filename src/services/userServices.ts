import bcrypt from "bcryptjs";
import User from "../models/user";

export const createUser = async (
  fullname: string,
  email: string,
  password: string,
  role: string,
  faceImgUrl?: string,
  emailVerified?: boolean
) => {
  return await User.create({
    fullname,
    email,
    password:bcrypt.hashSync(password),
    role,
    faceImgUrl,
    emailVerified,
  });
};
