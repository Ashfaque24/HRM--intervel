import express from "express";
import con from "../utils/db.js";

const attendanceRouter = express.Router();

// Input validation middleware
const validateEmail = (req, res, next) => {
  const { email } = req.body;
  
  if (!email) {
    return res.json({ success: false, error: "Email is required" });
  }
  
  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.json({ success: false, error: "Invalid email format" });
  }
  
  next();
};

// CHECK-IN (START OR RESUME)
attendanceRouter.post("/check-in", validateEmail, (req, res) => {
  const { email } = req.body;

  const findUserQuery = `SELECT id FROM users WHERE email = ? LIMIT 1`;
  con.query(findUserQuery, [email], (err, result) => {
    if (err) {
      console.error("Database error in check-in:", err);
      return res.json({ success: false, error: "Database error" });
    }
    if (result.length === 0) {
      return res.json({ success: false, error: "Email not found" });
    }

    const userId = result[0].id;

    const selectQuery = `
      SELECT id, check_in, check_out, total_duration
      FROM attendance
      WHERE user_id = ? AND date = CURDATE()
      ORDER BY id DESC LIMIT 1
    `;
    con.query(selectQuery, [userId], (selectErr, rows) => {
      if (selectErr) {
        console.error("Database error in attendance select:", selectErr);
        return res.json({ success: false, error: "Database error" });
      }

      if (rows.length === 0) {
        // First check-in today
        const insertQuery = `
          INSERT INTO attendance (user_id, check_in, date, total_duration)
          VALUES (?, NOW(), CURDATE(), 0)
        `;
        con.query(insertQuery, [userId], (insertErr) => {
          if (insertErr) {
            console.error("Database error in attendance insert:", insertErr);
            return res.json({ success: false, error: "Failed to check-in" });
          }
          return res.json({
            success: true,
            message: "Checked in successfully (new session)",
            total_duration: 0
          });
        });
      } else {
        const { id, check_out, total_duration } = rows[0];

        if (!check_out) {
          // User is already checked in, return current status
          const currentTotal = (total_duration || 0) + Math.floor((new Date() - new Date(rows[0].check_in)) / 1000);
          return res.json({ 
            success: true, 
            message: "Already checked in - timer continues", 
            total_duration: currentTotal
          });
        }

        // Resume session - update check_in time but keep the existing total_duration
        const resumeQuery = `
          UPDATE attendance
          SET check_in = NOW(), check_out = NULL
          WHERE id = ?
        `;
        con.query(resumeQuery, [id], (resumeErr) => {
          if (resumeErr) {
            console.error("Database error in resume:", resumeErr);
            return res.json({ success: false, error: "Failed to resume check-in" });
          }
          console.log("Resuming session with total_duration:", total_duration); // Debug log
          return res.json({
            success: true,
            message: "Session resumed",
            total_duration: total_duration || 0
          });
        });
      }
    });
  });
});

// CHECK-OUT (PAUSE)
attendanceRouter.post("/check-out", validateEmail, (req, res) => {
  const { email } = req.body;

  const findUserQuery = `SELECT id FROM users WHERE email = ? LIMIT 1`;
  con.query(findUserQuery, [email], (err, result) => {
    if (err) {
      console.error("Database error in check-out:", err);
      return res.json({ success: false, error: "Database error" });
    }
    if (result.length === 0) {
      return res.json({ success: false, error: "Email not found" });
    }

    const userId = result[0].id;

    const selectQuery = `
      SELECT id, check_in, total_duration
      FROM attendance
      WHERE user_id = ? AND date = CURDATE() AND check_out IS NULL
      ORDER BY id DESC LIMIT 1
    `;
    con.query(selectQuery, [userId], (selectErr, rows) => {
      if (selectErr) {
        console.error("Database error in check-out select:", selectErr);
        return res.json({ success: false, error: "Database error" });
      }
      if (rows.length === 0) {
        return res.json({ success: false, message: "No active session to check out" });
      }

      const { id, check_in, total_duration } = rows[0];
      console.log("Check-out: Current total_duration:", total_duration, "check_in time:", check_in); // Debug log
      
      const updateQuery = `
        UPDATE attendance
        SET check_out = NOW(),
            total_duration = total_duration + TIME_TO_SEC(TIMEDIFF(NOW(), check_in))
        WHERE id = ?
      `;
      con.query(updateQuery, [id], (updateErr) => {
        if (updateErr) {
          console.error("Database error in check-out update:", updateErr);
          return res.json({ success: false, error: "Failed to check-out" });
        }

        // Return updated total duration
        const getDurationQuery = `SELECT total_duration FROM attendance WHERE id = ?`;
        con.query(getDurationQuery, [id], (durationErr, durationRows) => {
          if (durationErr) {
            console.error("Database error in duration fetch:", durationErr);
            return res.json({ success: false, error: "Failed to fetch duration" });
          }

          console.log("Check-out: Updated total_duration:", durationRows[0].total_duration); // Debug log
          return res.json({
            success: true,
            message: "Checked out (session paused)",
            total_duration: durationRows[0].total_duration
          });
        });
      });
    });
  });
});

// GET CURRENT STATUS
attendanceRouter.get("/status/:email", (req, res) => {
  const { email } = req.params;
  
  if (!email) {
    return res.json({ success: false, error: "Email is required" });
  }
  
  const findUserQuery = `SELECT id FROM users WHERE email = ? LIMIT 1`;
  con.query(findUserQuery, [email], (err, result) => {
    if (err) {
      console.error("Database error in status check:", err);
      return res.json({ success: false, error: "Database error" });
    }
    if (result.length === 0) {
      return res.json({ success: false, error: "Email not found" });
    }

    const userId = result[0].id;
    
    const selectQuery = `
      SELECT id, check_in, check_out, total_duration
      FROM attendance
      WHERE user_id = ? AND date = CURDATE()
      ORDER BY id DESC LIMIT 1
    `;
    con.query(selectQuery, [userId], (selectErr, rows) => {
      if (selectErr) {
        console.error("Database error in status select:", selectErr);
        return res.json({ success: false, error: "Database error" });
      }
      
      if (rows.length === 0) {
        return res.json({
          success: true,
          checked_in: false,
          total_duration: 0,
          message: "No attendance record for today"
        });
      }
      
      const { check_out, total_duration, check_in } = rows[0];
      
      if (!check_out) {
        // User is currently checked in, calculate current total including time since check-in
        const currentTotal = (total_duration || 0) + Math.floor((new Date() - new Date(check_in)) / 1000);
        return res.json({
          success: true,
          checked_in: true,
          total_duration: currentTotal
        });
      } else {
        // User is checked out, return saved total
        return res.json({
          success: true,
          checked_in: false,
          total_duration: total_duration || 0
        });
      }
    });
  });
});

export default attendanceRouter;