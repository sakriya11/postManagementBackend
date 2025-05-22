import multer from "multer";
import path from "path";
import fs from "fs";
import { Request } from "express";
import { IError } from "../helper/interface";

export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; //5MB




export const storage = (uploadPath: string): multer.StorageEngine => {
  return multer.diskStorage({
    destination(req: Request, file: Express.Multer.File, cb: CallableFunction) {
      try {
        const upload_folder = `uploads/${uploadPath}`;
        if (!fs.existsSync(upload_folder)) {
          fs.mkdirSync(upload_folder, { recursive: true });
        }
      } catch (error) {
        console.error(error);
        cb(new Error("Error with storage"), `uploads/${uploadPath}`);
      }
      cb(null, `uploads/${uploadPath}`);
    },
    filename(req: Request, file: Express.Multer.File, cb: CallableFunction) {
      cb(
        null,
        `${file.originalname}`
      );
    },
  });
};

export const ImageFileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: CallableFunction
): void => {
  const filetypes = /jpg|jpeg|png|svg/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
   
    const error: IError = new Error("Images only!");
    error.status = 409;
    error.fieldname = file.fieldname;
    cb(error);
    
  }
};

export const PdfFileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: CallableFunction
): void => {
  const filetypes = /pdf/;
  const whiteLists = ["application/pdf"];
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = whiteLists.includes(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    const error: IError = new Error("Pdf files only!");
    error.status = 409;
    error.fieldname = file.fieldname;
    cb(error);
  }
};
