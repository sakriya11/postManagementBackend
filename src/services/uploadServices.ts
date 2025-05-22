import { Request, Response } from "express";
import Upload  from "../models/upload"; 
import { IReqUser } from "../helper/interface"; 

export const handleUpload = async ({
  req,
  res,
  fileKey,
  successMessage,
}: {
  req: Request;
  res: Response;
  fileKey: "img" | "pdf";
  successMessage: string;
}): Promise<void> => {
  try {
    const { title,date,description,role } = req.body;
    const file = req.file;
    // const user = (req as IReqUser).user;

   console.log("role",role)

    if (!file) {
      res.status(404).send({
        ok: false,
        message: "File not found",
      });
      return;
    }

    const uploadData = {
      title,
      date,
      description,
      // user: user._id,
      [fileKey]: file.path,
      role
    };

    const upload = await Upload.create(uploadData);

    res.status(200).send({
      ok: true,
      message: successMessage,
      data: upload,
    });
    
  } catch (error) {
    console.error("upload_error", error);
    res.status(500).send({
      msg: "Error in upload",
    });
    
  }
};
