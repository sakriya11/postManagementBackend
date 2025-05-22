import { body } from "express-validator";

const authValidator = {
  register: [
   
    
    body("email")
      .isEmail()
      .withMessage("Email must be a valid email")
      .normalizeEmail(),
      
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password is minimum 8 chars long."),
  ],
  login: [
    body("email")
      .isEmail()
      .withMessage("Email must be a valid email")
      .normalizeEmail(),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password is minimum 8 chars long."),
  ],
};

export default authValidator;
