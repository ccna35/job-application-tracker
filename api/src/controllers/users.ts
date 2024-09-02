import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { connection } from "../db"; // Assume db.ts handles MySQL connection
import { RowDataPacket } from "mysql2";

const signup = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  // check if user already exists
  const [existingUsers] = await connection.query<RowDataPacket[]>(
    "SELECT * FROM users WHERE username = ?",
    [username]
  );

  if (existingUsers.length > 0)
    return res.status(400).json({ message: "User already exists" });

  try {
    await connection.query<RowDataPacket[]>(
      "INSERT INTO users (username, password_hash) VALUES (?, ?)",
      [username, hashedPassword]
    );
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    return res.status(500).json({ message: "User creation failed" });
  }
};

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const [results] = await connection.query<RowDataPacket[]>(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );

    if (results.length === 0)
      return res.status(400).json({ message: "Invalid credentials" });

    const user = results[0];
    const isValidPassword = await bcrypt.compare(password, user.password_hash);

    if (!isValidPassword)
      return res.status(400).json({ message: "Invalid credentials" });

    return res.json({ message: "Login successful" });
  } catch (error) {
    return res.status(500).json({ message: "Login failed" });
  }
};

export const userController = {
  signup,
  login,
};
