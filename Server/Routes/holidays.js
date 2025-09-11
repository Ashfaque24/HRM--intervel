import express from "express";
import con from "../utils/db.js"; // ensure this is non-promise mysql connection

const router = express.Router();

// Get all holidays
router.get("/", (req, res) => {
  con.query(
    "SELECT * FROM holidays WHERE is_deleted = FALSE ORDER BY date ASC",
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Error fetching holidays", error: err.message });
      }
      res.json(results);
    }
  );
});

// Add new holiday
router.post("/", (req, res) => {
  const { holidayName, date, description } = req.body;
  if (!holidayName || !date) {
    return res.status(400).json({ message: "holidayName and date are required" });
  }

  con.query(
    "INSERT INTO holidays (holiday_name, date, description) VALUES (?, ?, ?)",
    [holidayName, date, description || null],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error adding holiday", error: err.message });
      }
      return res.status(201).json({
        id: result.insertId,
        holiday_name: holidayName,
        date,
        description,
      });
    }
  );
});

// Edit holiday
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { holidayName, date, description } = req.body;
  if (!holidayName || !date) {
    return res.status(400).json({ message: "holidayName and date are required" });
  }

  con.query(
    "UPDATE holidays SET holiday_name = ?, date = ?, description = ? WHERE id = ?",
    [holidayName, date, description || null, id],
    (err) => {
      if (err) {
        return res.status(500).json({ message: "Error updating holiday", error: err.message });
      }
      res.json({ id: parseInt(id), holiday_name: holidayName, date, description });
    }
  );
});

// Soft delete holiday
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  con.query(
    "UPDATE holidays SET is_deleted = TRUE WHERE id = ?",
    [id],
    (err) => {
      if (err) {
        return res.status(500).json({ message: "Error deleting holiday", error: err.message });
      }
      res.json({ message: "Holiday deleted (soft)", id: parseInt(id) });
    }
  );
});

export default router;

