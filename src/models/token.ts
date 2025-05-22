import mongoose, { model, Schema,Document } from "mongoose";
import { IUser } from "./user";

const tokenSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    token: { type: Number },
  },
  { timestamps: true }
);
export interface IToken extends Document {
  user: mongoose.Types.ObjectId
  token: number;
}
const token = model<IToken>("token", tokenSchema);

export default token;
