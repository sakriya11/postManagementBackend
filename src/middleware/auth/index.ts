import { Response, NextFunction, Request } from "express";
import config from "../../config";
import jwt from 'jsonwebtoken';
import User from "../../models/user";
import { IReqUser,Decoded } from "../../helper/interface";


const authMiddleware = {
    verifyToken: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { host, authorization } = req.headers;
      const validHosts = config.frontend.hosts.split(",");
      let accessToken;
      if (validHosts.includes(host)) {
        accessToken = req.cookies?.accessToken;
      }

      if (!accessToken) {
        if (!authorization) {
          res
            .status(403)
            .send({ ok: false, message: "Not authorized. Please login." });
          return;
        }
        accessToken = authorization.split("Bearer ")[1];
        if (!accessToken) {
          throw "Token should be Bearer token";
        }
      }
      const decoded = jwt.verify(accessToken, config.jwt.secret, {
        issuer: config.jwt.issuer,
      });

      const user = await User.findById((decoded as Decoded).id).select(
        "-password"
      );
      if (user) (req  as IReqUser).user = user;
      else {
        res.status(401).send({
          ok: false,
          message: "Signed user not found. Please login again",
        });
        return;
      }
      next();
    } catch (error) {
      if (
        error.name === "TokenExpiredError" ||
        error.name === "JsonWebTokenError"
      ) {
        res.status(401).send({
          ok: false,
          code: error.name,
          message: "Session Expired. Please Login again",
        });
        return;
      }
      console.error(error);

      res.status(422).send({
        ok: false,
        error: true,
        message: "Please login and try again.",
      });
    }
  },
  
  hasRole: (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
      try {
        const user = (req as IReqUser).user;
        if (roles.includes(String(user?.role))) {
          next();
        } else {
          res
            .status(403)
            .send({ message: "User doesn't have enough permission." });
          return;
        }
      } catch (error) {
        console.error(error);
        res.status(422).send({ message: "Please login and try again." });
      }
    };
  },
}

export default authMiddleware