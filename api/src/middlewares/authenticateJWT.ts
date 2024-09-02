import jwt, { Secret } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const jwt_secret = process.env.JWT_SECRET as Secret;

const generateToken = async function (user_id: number, duration: string) {
  const token = jwt.sign(
    {
      user_id,
    },
    jwt_secret,
    {
      expiresIn: duration,
    }
  );

  return token;
};

export interface UserRequest extends Request {
  user?: number;
}

type MyToken = {
  user_id: number;
  iat: number;
  exp: number;
};

// Verify JWT token
const verifyToken = (req: UserRequest, res: Response, next: NextFunction) => {
  console.log("Cookies", req.cookies);

  const { jwt: token } = req.cookies;

  if (!token) {
    return res
      .status(403)
      .json({ message: "A token is required for authentication" });
  }

  try {
    const { user_id } = jwt.verify(token, jwt_secret) as MyToken;

    req.user = user_id;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

export { generateToken, verifyToken };
