
// import express from "express";
// import con from "../utils/db.js";

// const attendanceRouter = express.Router();

// // CHECK-IN (START OR RESUME)
// attendanceRouter.post("/check-in", (req, res) => {
//   const { email } = req.body;

//   if (!email) {
//     return res.json({ success: false, error: "Email is required" });
//   }

//   // 1. Find user by email
//   const findUserQuery = `SELECT id FROM users WHERE email = ? LIMIT 1`;
//   con.query(findUserQuery, [email], (err, result) => {
//     if (err) return res.json({ success: false, error: "Database error" });
//     if (result.length === 0) return res.json({ success: false, error: "Email not found" });

//     const userId = result[0].id;

//     // 2. Check existing record for today
//     const selectQuery = `
//       SELECT id, check_in, check_out, total_duration
//       FROM attendance
//       WHERE user_id = ? AND date = CURDATE()
//       ORDER BY id DESC LIMIT 1
//     `;
//     con.query(selectQuery, [userId], (selectErr, rows) => {
//       if (selectErr) return res.json({ success: false, error: "Database error" });

//       if (rows.length === 0) {
//         // No record yet → create a new one
//         const insertQuery = `
//           INSERT INTO attendance (user_id, check_in, date, total_duration)
//           VALUES (?, NOW(), CURDATE(), 0)
//         `;
//         con.query(insertQuery, [userId], (insertErr) => {
//           if (insertErr) return res.json({ success: false, error: "Failed to check-in" });
//           return res.json({ success: true, message: "Checked in successfully (new session)" });
//         });
//       } else {
//         const { id, check_out } = rows[0];

//         if (!check_out) {
//           return res.json({ success: false, message: "You are already checked in" });
//         }

//         // Resume session → update check_in and keep total_duration intact
//         const resumeQuery = `
//           UPDATE attendance
//           SET check_in = NOW(), check_out = NULL
//           WHERE id = ?
//         `;
//         con.query(resumeQuery, [id], (resumeErr) => {
//           if (resumeErr) return res.json({ success: false, error: "Failed to resume check-in" });
//           return res.json({ success: true, message: "Session resumed" });
//         });
//       }
//     });
//   });
// });

// // CHECK-OUT (PAUSE)
// attendanceRouter.post("/check-out", (req, res) => {
//   const { email } = req.body;

//   if (!email) {
//     return res.json({ success: false, error: "Email is required" });
//   }

//   const findUserQuery = `SELECT id FROM users WHERE email = ? LIMIT 1`;
//   con.query(findUserQuery, [email], (err, result) => {
//     if (err) return res.json({ success: false, error: "Database error" });
//     if (result.length === 0) return res.json({ success: false, error: "Email not found" });

//     const userId = result[0].id;

//     // Find today's active session
//     const selectQuery = `
//       SELECT id, check_in, total_duration
//       FROM attendance
//       WHERE user_id = ? AND date = CURDATE() AND check_out IS NULL
//       ORDER BY id DESC LIMIT 1
//     `;
//     con.query(selectQuery, [userId], (selectErr, rows) => {
//       if (selectErr) return res.json({ success: false, error: "Database error" });
//       if (rows.length === 0) return res.json({ success: false, message: "No active session to check out" });

//       const { id, check_in, total_duration } = rows[0];
//       const updateQuery = `
//         UPDATE attendance
//         SET check_out = NOW(),
//             total_duration = total_duration + TIME_TO_SEC(TIMEDIFF(NOW(), check_in))
//         WHERE id = ?
//       `;
//       con.query(updateQuery, [id], (updateErr) => {
//         if (updateErr) return res.json({ success: false, error: "Failed to check-out" });
//         return res.json({ success: true, message: "Checked out (session paused)" });
//       });
//     });
//   });
// });

// export default attendanceRouter;

import express from "express";
import con from "../utils/db.js";

const attendanceRouter = express.Router();

// CHECK-IN (START OR RESUME)
attendanceRouter.post("/check-in", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.json({ success: false, error: "Email is required" });
  }

  const findUserQuery = `SELECT id FROM users WHERE email = ? LIMIT 1`;
  con.query(findUserQuery, [email], (err, result) => {
    if (err) return res.json({ success: false, error: "Database error" });
    if (result.length === 0) return res.json({ success: false, error: "Email not found" });

    const userId = result[0].id;

    const selectQuery = `
      SELECT id, check_in, check_out, total_duration
      FROM attendance
      WHERE user_id = ? AND date = CURDATE()
      ORDER BY id DESC LIMIT 1
    `;
    con.query(selectQuery, [userId], (selectErr, rows) => {
      if (selectErr) return res.json({ success: false, error: "Database error" });

      if (rows.length === 0) {
        // First check-in today
        const insertQuery = `
          INSERT INTO attendance (user_id, check_in, date, total_duration)
          VALUES (?, NOW(), CURDATE(), 0)
        `;
        con.query(insertQuery, [userId], (insertErr) => {
          if (insertErr) return res.json({ success: false, error: "Failed to check-in" });
          return res.json({
            success: true,
            message: "Checked in successfully (new session)",
            totalDuration: 0
          });
        });
      } else {
        const { id, check_out, total_duration } = rows[0];

        if (!check_out) {
          return res.json({ success: false, message: "You are already checked in", totalDuration: total_duration });
        }

        // Resume session
        const resumeQuery = `
          UPDATE attendance
          SET check_in = NOW(), check_out = NULL
          WHERE id = ?
        `;
        con.query(resumeQuery, [id], (resumeErr) => {
          if (resumeErr) return res.json({ success: false, error: "Failed to resume check-in" });
          return res.json({
            success: true,
            message: "Session resumed",
            totalDuration: total_duration
          });
        });
      }
    });
  });
});

// CHECK-OUT (PAUSE)
attendanceRouter.post("/check-out", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.json({ success: false, error: "Email is required" });
  }

  const findUserQuery = `SELECT id FROM users WHERE email = ? LIMIT 1`;
  con.query(findUserQuery, [email], (err, result) => {
    if (err) return res.json({ success: false, error: "Database error" });
    if (result.length === 0) return res.json({ success: false, error: "Email not found" });

    const userId = result[0].id;

    const selectQuery = `
      SELECT id, check_in, total_duration
      FROM attendance
      WHERE user_id = ? AND date = CURDATE() AND check_out IS NULL
      ORDER BY id DESC LIMIT 1
    `;
    con.query(selectQuery, [userId], (selectErr, rows) => {
      if (selectErr) return res.json({ success: false, error: "Database error" });
      if (rows.length === 0) return res.json({ success: false, message: "No active session to check out" });

      const { id, check_in, total_duration } = rows[0];
      const updateQuery = `
        UPDATE attendance
        SET check_out = NOW(),
            total_duration = total_duration + TIME_TO_SEC(TIMEDIFF(NOW(), check_in))
        WHERE id = ?
      `;
      con.query(updateQuery, [id], (updateErr) => {
        if (updateErr) return res.json({ success: false, error: "Failed to check-out" });

        // Return updated total duration
        const getDurationQuery = `SELECT total_duration FROM attendance WHERE id = ?`;
        con.query(getDurationQuery, [id], (durationErr, durationRows) => {
          if (durationErr) return res.json({ success: false, error: "Failed to fetch duration" });

          return res.json({
            success: true,
            message: "Checked out (session paused)",
            totalDuration: durationRows[0].total_duration
          });
        });
      });
    });
  });
});

export default attendanceRouter;
