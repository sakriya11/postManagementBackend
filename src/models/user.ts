import { Schema, Document, model } from "mongoose";

const userSchema = new Schema(
  {
    fullname: String,
    email: {
      type: String,
      required: [true, "Email address is required"],
      unique: true,
    },
    password: String,
    emailVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["admin", "teacher", "child"],
      default: "child",
    },
    faceImgUrl: String,
  },
  { timestamps: true }
);

export interface IUser extends Document {
  fullname: string;
  email: string;
  password: string;
  emailVerified: boolean;
  role: string;
  faceImgUrl: string;
}


const User = model<IUser>("User", userSchema);

export default User;
