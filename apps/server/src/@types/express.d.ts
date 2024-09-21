import { Types } from "mongoose";
import { UserSchemaType } from "../models/user.model";

export {};
declare global {
  namespace Express {
    interface Request {
      local_user?: UserSchemaType & { _id: Types.ObjectId };
      workspace?: any;
    }
  }
}
