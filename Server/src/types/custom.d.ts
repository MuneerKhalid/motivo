import { IUser } from "../Models/User/User";

declare namespace Express {
  export interface Request {
    user?: IUser;
  }
}
