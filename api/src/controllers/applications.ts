import { Request, Response } from "express";
import { connection } from "../db"; // Import database connection
import { ResultSetHeader, RowDataPacket } from "mysql2";

// Create a new job application
const createApplication = async (req: Request, res: Response) => {
  const { job_title, company_name, application_date, status } = req.body;

  try {
    const [{ insertId }] = await connection.query<ResultSetHeader>(
      "INSERT INTO applications (job_title, company_name, application_date, status) VALUES (?, ?, ?, ?)",
      [job_title, company_name, application_date, status]
    );
    res
      .status(201)
      .json({ message: "Application created successfully", id: insertId });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Retrieve all job applications
const getAllApplications = async (req: Request, res: Response) => {
  try {
    const [rows] = await connection.query<RowDataPacket[]>(
      "SELECT * FROM applications"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Retrieve a single job application by ID
const getApplicationById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const [rows] = await connection.query<RowDataPacket[]>(
      "SELECT * FROM applications WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a job application by ID
const updateApplication = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { job_title, company_name, application_date, status } = req.body;

  try {
    const [result] = await connection.query<ResultSetHeader>(
      "UPDATE applications SET job_title = ?, company_name = ?, application_date = ?, status = ? WHERE id = ?",
      [job_title, company_name, application_date, status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json({ message: "Application updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a job application by ID
const deleteApplication = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const [result] = await connection.query<ResultSetHeader>(
      "DELETE FROM applications WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json({ message: "Application deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const applicationController = {
  createApplication,
  getAllApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
};
