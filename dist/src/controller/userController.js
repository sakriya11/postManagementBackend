"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const token_1 = __importDefault(require("../models/token"));
const emailverification_1 = require("../services/emailverification");
const generator_1 = require("../helper/generator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const userServices_1 = require("../services/userServices");
const userController = {
    userRegistration: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { fullname, email, password, confirmpassword, role } = req.body;
            const emailExist = yield user_1.default.findOne({
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
            const registerUser = yield (0, userServices_1.createUser)(fullname, email, password, role);
            const emailVerificationToken = yield token_1.default.create({
                user: registerUser.id,
                token: (0, generator_1.genRandomNumber)(),
            });
            const option = (0, emailverification_1.mailOption)(registerUser.email, registerUser.fullname, emailVerificationToken.token);
            yield (0, emailverification_1.sendEmail)(option, emailverification_1.transport);
            res.status(200).send({
                message: "Enter the code provided to your email",
            });
        }
        catch (error) {
            console.log("registration error", error);
            res.status(500).send({
                message: "Registration error",
            });
        }
    }),
    emailVerification: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { verificationCode } = req.body;
            const verifyCode = Number(verificationCode);
            const tokenExist = yield token_1.default.findOne({
                token: verifyCode,
            });
            if (tokenExist) {
                yield user_1.default.findByIdAndUpdate(tokenExist.user, {
                    emailVerified: true,
                });
                res.status(200).send({
                    message: "Email verified and user registered succesfully",
                });
                return;
            }
            else {
                res.status(409).send({
                    message: "Email verification failed please sign up and resend the verification code ",
                });
                return;
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).send({
                message: "email not verified",
            });
            return;
        }
    }),
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const user = yield user_1.default.findOne({ email: email });
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
            const passwordIsValid = bcryptjs_1.default.compareSync(password, user.password);
            if (!passwordIsValid) {
                res.status(409).send({
                    message: "Incorrect password",
                });
                return;
            }
            const token = jsonwebtoken_1.default.sign({
                id: user.id,
            }, config_1.default.jwt.secret, {
                expiresIn: config_1.default.jwt.token_ttl_seconds,
                issuer: config_1.default.jwt.issuer,
            });
            const resUser = user.toJSON();
            delete resUser.password;
            res.status(200).send({
                message: "Logged in succesfully",
                accessToken: token,
                user: resUser,
            });
            return;
        }
        catch (error) {
            console.log(error);
            res.status(500).send({
                message: "An error occurred during login.",
            });
            return;
        }
    }),
    faceRegistration: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const file = req.file;
            const { fullname, email, password, confirmpassword, role } = req.body;
            const emailExist = yield user_1.default.findOne({
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
            yield (0, userServices_1.createUser)(fullname, email, password, role, file === null || file === void 0 ? void 0 : file.path, true);
            res.status(200).send({
                message: "Successfully registered",
            });
            return;
        }
        catch (error) {
            console.log(error);
            res.status(500).send({
                message: "An error occurred during face registration",
            });
            return;
        }
    }),
    faceLogin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const file = req.file;
            const user = yield user_1.default.findOne({
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
            const token = jsonwebtoken_1.default.sign({
                id: user.id,
            }, config_1.default.jwt.secret, {
                expiresIn: config_1.default.jwt.token_ttl_seconds,
                issuer: config_1.default.jwt.issuer,
            });
            const resUser = user.toJSON();
            delete resUser.password;
            res.status(200).send({
                message: "Logged in succesfully",
                accessToken: token,
                user: resUser,
            });
            return;
        }
        catch (error) {
            console.log(error);
            res.status(500).send({
                message: "An error occurred during login.",
            });
            return;
        }
    }),
};
exports.default = userController;
//# sourceMappingURL=userController.js.map