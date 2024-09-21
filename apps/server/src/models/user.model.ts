import mongoose from "mongoose";
import { collectionNames } from "./names";

export type UserSchemaType = {
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
};

export const UserSchema = new mongoose.Schema<UserSchemaType>(
  {
    first_name: { type: String, required: true },
    last_name: { type: String },
    email: { type: String, required: true },
    password: { type: String, requried: true },
  },
  { timestamps: true },
);

UserSchema.set("toJSON", {
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  },
});

export const UserModel = mongoose.model(collectionNames.USER, UserSchema);
