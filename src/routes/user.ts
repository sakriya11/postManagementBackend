import authController from "../controller/userController";
import { Router } from "express";
import authValidator from "../middleware/validators/authValidation";
import { validate } from "../middleware/validators";
import multer from "multer";
import {
  ImageFileFilter,
  MAX_IMAGE_SIZE,
  PdfFileFilter,
  storage,
} from "../middleware/upload";
import contentController from "../controller/content";
import uploadController from "../controller/uploadController";

const userRouter = Router();

userRouter
  .post(
    "/create/user",
    authValidator.register,
    validate,
    authController.userRegistration
  )
  .post("/login", authValidator.login, validate, authController.login)
  .post("/user/email/verification", authController.emailVerification)

  .post(
    "/face/registration",
    multer({
      storage: storage("img"),
      fileFilter: ImageFileFilter,
      limits: { fileSize: MAX_IMAGE_SIZE },
    }).single("image"),
    authController.faceRegistration
  )

  .post(
    "/face/login",
    multer({
      fileFilter: ImageFileFilter,
      limits: { fileSize: MAX_IMAGE_SIZE },
    }).single("image"),
    authController.faceLogin
  )

  .get("/view/img-content/:role", contentController.viewRoleBasedImgContent)
  .get("/view/pdf-content/:role", contentController.viewRoleBasedPdfContent)
  .post("/generate/text", uploadController.generateText)
  .post(
    "/upload/image",
    multer({
      storage: storage("img"),
      fileFilter: ImageFileFilter,
      limits: { fileSize: MAX_IMAGE_SIZE },
    }).single("image"),
    uploadController.formUploadWithImage
  )
  .post(
    "/upload/pdf",
    multer({
      storage: storage("pdf"),
      fileFilter: PdfFileFilter,
    }).single("pdf"),
    uploadController.uploadPdf
  );

export default userRouter;
