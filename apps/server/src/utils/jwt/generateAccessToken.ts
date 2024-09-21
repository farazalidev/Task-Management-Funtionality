import { AccessToken, GenerateAccessTokenFn } from "./types";
import jwt from "jsonwebtoken";

export const generateAcessToken: GenerateAccessTokenFn = async ({
  user_id,
}) => {
  const token = jwt.sign({ user_id }, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });
  return token;
};

export const verifyAccessToken = async (
  token: string,
): Promise<AccessToken> => {
  try {
    const decoded_token = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as AccessToken;
    return decoded_token;
  } catch (error) {
    throw new Error("invalid or expired token");
  }
};
