import { IUser } from "../Models/UserModel";

declare namespace Express {
  export interface Request {
    user?: IUser;
  }
}
