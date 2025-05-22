import { model, Document, Schema } from "mongoose";
import { IUser } from "./user";

const uploadSchema = new Schema(
  {
    pdf: String,
    img:String,
    title:String,
    role:String,
    date:String,
    description:String
  },
  { timestamps: true }
);

export interface IUpload extends Document {
  pdf?: string;
  img?: string;
  title:string;
  role:string;
  date:string;
  description:string;
}

const upload = model<IUpload>("upload", uploadSchema);

export default upload;
