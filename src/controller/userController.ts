import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcryptjs";
import Token from "../models/token";
import {
  mailOption,
  sendEmail,
  transport,
} from "../services/emailverification";
import { genRandomNumber } from "../helper/generator";
import jwt from "jsonwebtoken";
import config from "../config";
import { createUser } from "../services/userServices";

interface UserRegistration {
  fullname: string;
  email: string;
  password: string;
  confirmpassword: string;
  role: string;
  faceImgUrl?: string;
}

const userController = {
  userRegistration: async (req: Request, res: Response): Promise<void> => {
    try {
      const { fullname, email, password, confirmpassword, role } =
        req.body as UserRegistration;

      const emailExist = await User.findOne({
        email: email,
      });
      if (emailExist) {
        res.status(409).send({
          message: "Given email id already exist",
        });
        return;
      }
      if (password !== confirmpassword) {
        res.status(409).send({
          message: "Password and confirm password did not match",
        });
        return;
      }
      const registerUser = await createUser(fullname, email, password, role);
      const emailVerificationToken = await Token.create({
        user: registerUser.id,
        token: genRandomNumber(),
      });
      const option = mailOption(
        registerUser.email,
        registerUser.fullname,
        emailVerificationToken.token
      );
      await sendEmail(option, transport);

      res.status(200).send({
        message: "Enter the code provided to your email",
      });
    } catch (error) {
      console.log("registration error", error);
      res.status(500).send({
        message: "Registration error",
      });
    }
  },

  emailVerification: async (req: Request, res: Response): Promise<void> => {
    try {
      const { verificationCode } = req.body;
      const verifyCode = Number(verificationCode);

      const tokenExist = await Token.findOne({
        token: verifyCode,
      });

      if (tokenExist) {
        await User.findByIdAndUpdate(tokenExist.user, {
          emailVerified: true,
        });
        res.status(200).send({
          message: "Email verified and user registered succesfully",
        });
        return;
      } else {
        res.status(409).send({
          message:
            "Email verification failed please sign up and resend the verification code ",
        });
        return;
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "email not verified",
      });
      return;
    }
  },

  login: async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) {
        res.status(404).send({
          message: "User does not exist please register",
        });
        return;
      }
      if (user.emailVerified == false) {
        res.status(409).send({
          message: "Verify email and try logging back to your account",
        });
        return;
      }
      const passwordIsValid = bcrypt.compareSync(password, user.password);
      if (!passwordIsValid) {
        res.status(409).send({
          message: "Incorrect password",
        });
        return;
      }

      const token = jwt.sign(
        {
          id: user.id,
        },
        config.jwt.secret,
        {
          expiresIn: config.jwt.token_ttl_seconds,
          issuer: config.jwt.issuer,
        }
      );
      const resUser = user.toJSON();
      delete resUser.password;

      res.status(200).send({
        message: "Logged in succesfully",
        accessToken: token,
        user: resUser,
      });
      return;
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "An error occurred during login.",
      });
      return;
    }
  },

  faceRegistration: async (req: Request, res: Response): Promise<void> => {
    try {
      const file = req.file;
      const { fullname, email, password, confirmpassword, role } =
        req.body as UserRegistration;
      const emailExist = await User.findOne({
        email: email,
      });
      if (emailExist) {
        res.status(409).send({
          message: "Given email id already exist",
        });
        return;
      }
      if (password !== confirmpassword) {
        res.status(409).send({
          message: "Password and confirm password did not match",
        });
        return;
      }
      await createUser(fullname, email, password, role, file?.path, true);

      res.status(200).send({
        message: "Successfully registered",
      });
      return;
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "An error occurred during face registration",
      });
      return;
    }
  },
  faceLogin: async (req: Request, res: Response): Promise<void> => {
    try {
      const file = req.file;
      const user = await User.findOne({
        faceImgUrl: {
          $regex: new RegExp(file.originalname + "$"),
          $options: "i",
        },
      });
      console.log("user", user);

      if (!user) {
        res.status(404).send({
          message: "User does not exist please register",
        });
        return;
      }

      const token = jwt.sign(
        {
          id: user.id,
        },
        config.jwt.secret,
        {
          expiresIn: config.jwt.token_ttl_seconds,
          issuer: config.jwt.issuer,
        }
      );
      const resUser = user.toJSON();
      delete resUser.password;

      res.status(200).send({
        message: "Logged in succesfully",
        accessToken: token,
        user: resUser,
      });
      return;
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "An error occurred during login.",
      });
      return;
    }
  },
};

export default userController;
