

import express from "express";
import con from "../utils/db.js";

const attendanceRouter = express.Router();

// Validate userId presence
const validateUserId = (req, res, next) => {
  const { userId } = req.body;
  if (!userId) {
    return res.json({ success: false, error: "userId is required" });
  }
  next();
};

// CHECK-IN
attendanceRouter.post("/check-in", validateUserId, (req, res) => {
  const { userId } = req.body;

  const selectQuery = `
    SELECT id, check_in, check_out, total_duration
    FROM attendance
    WHERE user_id = ? AND date = CURDATE()
    ORDER BY id DESC LIMIT 1
  `;
  con.query(selectQuery, [userId], (err, rows) => {
    if (err) return res.json({ success: false, error: "Database error" });

    if (rows.length === 0) {
      const insertQuery = `
        INSERT INTO attendance (user_id, check_in, date, total_duration)
        VALUES (?, NOW(), CURDATE(), 0)
      `;
      con.query(insertQuery, [userId], (insertErr) => {
        if (insertErr) return res.json({ success: false, error: "Failed to check-in" });
        return res.json({ success: true, checkedIn: true, totalDuration: 0, message: "Checked in successfully" });
      });
    } else {
      const { id, check_out, total_duration } = rows[0];
      if (!check_out) {
        const currentTotal = (total_duration || 0) + Math.floor((new Date() - new Date(rows[0].check_in)) / 1000);
        return res.json({ success: true, checkedIn: true, totalDuration: currentTotal, message: "Already checked in" });
      }

      const resumeQuery = `UPDATE attendance SET check_in = NOW(), check_out = NULL WHERE id = ?`;
      con.query(resumeQuery, [id], (resumeErr) => {
        if (resumeErr) return res.json({ success: false, error: "Failed to resume session" });
        return res.json({ success: true, checkedIn: true, totalDuration: total_duration || 0, message: "Session resumed" });
      });
    }
  });
});

// CHECK-OUT
attendanceRouter.post("/check-out", validateUserId, (req, res) => {
  const { userId } = req.body;

  const selectQuery = `
    SELECT id, check_in, total_duration
    FROM attendance
    WHERE user_id = ? AND date = CURDATE() AND check_out IS NULL
    ORDER BY id DESC LIMIT 1
  `;
  con.query(selectQuery, [userId], (err, rows) => {
    if (err) return res.json({ success: false, error: "Database error" });
    if (rows.length === 0) return res.json({ success: false, message: "No active session to check out" });

    const { id } = rows[0];
    const updateQuery = `
      UPDATE attendance
      SET check_out = NOW(),
          total_duration = total_duration + TIME_TO_SEC(TIMEDIFF(NOW(), check_in))
      WHERE id = ?
    `;
    con.query(updateQuery, [id], (updateErr) => {
      if (updateErr) return res.json({ success: false, error: "Failed to check-out" });

      con.query(`SELECT total_duration FROM attendance WHERE id = ?`, [id], (durationErr, durationRows) => {
        if (durationErr) return res.json({ success: false, error: "Failed to fetch duration" });
        return res.json({
          success: true,
          checkedIn: false,
          totalDuration: durationRows[0].total_duration,
          message: "Checked out successfully"
        });
      });
    });
  });
});

// GET STATUS
attendanceRouter.get("/status", (req, res) => {
  const { userId } = req.query;
  if (!userId) return res.json({ success: false, error: "userId is required" });

  const selectQuery = `
    SELECT id, check_in, check_out, total_duration
    FROM attendance
    WHERE user_id = ? AND date = CURDATE()
    ORDER BY id DESC LIMIT 1
  `;
  con.query(selectQuery, [userId], (err, rows) => {
    if (err) return res.json({ success: false, error: "Database error" });

    if (rows.length === 0) {
      return res.json({ success: true, checkedIn: false, totalDuration: 0, message: "No session today" });
    }

    const { check_in, check_out, total_duration } = rows[0];
    if (!check_out) {
      const currentTotal = (total_duration || 0) + Math.floor((new Date() - new Date(check_in)) / 1000);
      return res.json({ success: true, checkedIn: true, totalDuration: currentTotal });
    }

    return res.json({ success: true, checkedIn: false, totalDuration: total_duration || 0 });
  });
});

export default attendanceRouter;
