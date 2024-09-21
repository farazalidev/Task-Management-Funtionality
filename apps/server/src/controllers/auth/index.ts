import { RequestHandler } from "express";
import {
  LoginSchemaBody,
  RegisterSchemaBody,
} from "../../utils/validations/auth";
import { UserModel } from "../../models/user.model";
import bcrypt from "bcrypt";
import { generateAcessToken } from "../../utils/jwt/generateAccessToken";

export const loginController: RequestHandler = async (req, res, _next) => {
  try {
    const { email, password } = req.body as LoginSchemaBody;

    const user = await UserModel.findOne({ email }).select("+password");

    if (!user) {
      return res
        .status(404)
        .json({ message: "provided email or password invalid" });
    }

    const isValidPassword = await bcrypt.compare(
      password,
      user?.password as string,
    );

    if (!isValidPassword) {
      return res
        .status(200)
        .json({ message: "provided email or password invalid" });
    }
    const accessToken = await generateAcessToken({
      user_id: user._id.toString(),
    });
    return res.status(200).json({ message: "login successful", accessToken });
  } catch (error) {
    return res.status(500).json({ message: "internal server error", error });
  }
};

export const RegisterController: RequestHandler = async (req, res) => {
  try {
    debugger;
    const { email, first_name, last_name, password } =
      req.body as RegisterSchemaBody;

    const existedUser = await UserModel.findOne({ email });
    if (existedUser) {
      return res.status(400).json({
        message: "user already existed with this email, try to login",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      email,
      first_name,
      last_name,
      password: hashedPassword,
    });

    const accessToken = await generateAcessToken({
      user_id: newUser._id.toString(),
    });

    await newUser.save();

    return res.status(201).json({ message: "reg successful", accessToken });
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json({ message: "failed to register", error: "internal server error" });
  }
};
