import { IUser } from "../models/user";
import { Request } from "express";

export interface IError extends Error {
  status?: number;
  fieldname?: string;
}

export interface Decoded extends Object {
  id: string;
}
export interface IReqUser extends Request {
  user: IUser;
}





























