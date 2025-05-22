import { NextFunction, Request, Response } from "express";
import { handleUpload } from "../services/uploadServices";
import { generateAiText } from "../services/cohere";

const uploadController = {
  formUploadWithImage: (req: Request, res: Response): Promise<void> =>
    handleUpload({
      req,
      res,
      fileKey: "img",
      successMessage: "Image uploaded successfully",
    }),

  uploadPdf: (req: Request, res: Response): Promise<void> =>
    handleUpload({
      req,
      res,
      fileKey: "pdf",
      successMessage: "PDF uploaded successfully",
    }),

  generateText: async (req: Request, res: Response,next:NextFunction): Promise<void> => {
    try {
      const  text  = req.body.text;
      const generatedText = await generateAiText(text);
      res.status(200).send({
        ok: true,
        generatedText,
      });
      return;
    } catch (error) {
      console.log(error);
      next(error)
    }
  },
};

export default uploadController;
