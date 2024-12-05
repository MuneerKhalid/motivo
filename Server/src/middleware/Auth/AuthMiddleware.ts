import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IUser } from '../../Models/User/User';


// Extend the Request interface to include 'user'
interface AuthRequest extends Request {
  user?: IUser; // Only include the user ID here
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  let token: string | undefined;

  // Check for Bearer token in authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // If no token is found, respond with unauthorized
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
    return;
  }

  try {
    // Verify the token and decode the payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    // Attach the decoded user ID to the request object
    req.user = user as IUser;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};
