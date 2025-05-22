import express from "express";
import userRouter from "./user";
import adminRoutes from "./admin";
import authMiddleware from "../middleware/auth";

const routes = express();

routes.use(userRouter);
routes.use(
  "/admin",
  authMiddleware.verifyToken,
  authMiddleware.hasRole(["admin"]),
  adminRoutes
);


export default routes;
