import { RequestHandler } from "express";
import { verifyAccessToken } from "../utils/jwt/generateAccessToken";
import { UserModel } from "../models/user.model";

export const authorize: RequestHandler = async (req, res, next) => {
  try {
    const authHeader =
      (req.headers.authorization as string) ||
      (req.headers.Authorization as string);

    if (authHeader && authHeader.startsWith("Bearer ")) {
      const accessToken = authHeader.split(" ")[1];

      const decodedToken = await verifyAccessToken(accessToken);

      const existingUser = await UserModel.findOne({
        _id: decodedToken.user_id,
      });

      if (!existingUser) {
        return res.status(400).json({ message: "entity does not exists" });
      }
      req.local_user = existingUser;
      next();
    } else {
      return res
        .status(400)
        .json({ message: "Authorization header is missing or invalid" });
    }
  } catch (error) {
    return res.status(401).json({ message: "failed to authorize", error });
  }
};
