import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"; // Use import instead of require

const router = express.Router();
const saltRounds = 10; // Recommended: 10–12

// LOGIN ROUTE


router.post("/login", (req, res) => {
    const sql = `
      SELECT u.*, r.role_name 
      FROM users u
      LEFT JOIN roles r ON u.role_id = r.id
      WHERE u.email = ?
    `;
    con.query(sql, [req.body.email], (err, result) => {
      if (err) return res.json({ loginStatus: false, Error: "Query error" });
  
      if (result.length > 0) {
        const user = result[0];
        bcrypt.compare(req.body.password, user.password_hash, (err, isMatch) => {
          if (err) return res.json({ loginStatus: false, Error: "Password check failed" });
  
          if (isMatch) {
            const token = jwt.sign(
              { email: user.email, role: user.role_name, userId: user.id },
              "jwt_secret_key",
              { expiresIn: "1d" }
            );
  
            res.cookie("token", token, { httpOnly: true });
            return res.json({
              loginStatus: true,
              role: user.role_name, // <-- Use this in frontend
              email:user.email
            });
          } else {
            return res.json({ loginStatus: false, Error: "Wrong email or password" });
          }
        });
      } else {
        return res.json({ loginStatus: false, Error: "Wrong email or password" });
      }
    });
  });
  


// SIGNUP ROUTE

router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return res.json({ signupStatus: false, Error: "Missing required fields" });
  }

  // First, check if email already exists
  const checkEmailSql = "SELECT email FROM users WHERE email = ?";
  con.query(checkEmailSql, [email], (err, emailResults) => {
    if (err) {
      console.error("Email check error:", err);
      return res.json({ signupStatus: false, Error: "Database error" });
    }
    
    if (emailResults.length > 0) {
      return res.json({ signupStatus: false, Error: "Email already exists" });
    }

    // Check if this is the first user (should become admin)
    const countUsersSql = "SELECT COUNT(*) as userCount FROM users";
    con.query(countUsersSql, (err, countResults) => {
      if (err) {
        console.error("User count error:", err);
        return res.json({ signupStatus: false, Error: "Database error" });
      }

      const userCount = countResults[0].userCount;
      let roleId;
      
      if (userCount === 0) {
        // First user becomes Admin (assuming Admin role has id = 1)
        roleId = 1;
        console.log("Creating first user as Admin");
      } else {
        // Subsequent users become Employee (assuming Employee role has id = 4)
        roleId = 4;
        console.log("Creating user as Employee");
      }

      // Hash the password
      bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        if (err) {
          console.error("Hashing error:", err);
          return res.json({ signupStatus: false, Error: "Hashing error" });
        }

        // Insert user with appropriate role
        const sql = "INSERT INTO users (name, email, password_hash, role_id, is_active) VALUES (?, ?, ?, ?, ?)";
        con.query(sql, [name, email, hashedPassword, roleId, 1], (err, result) => {
          if (err) {
            console.error("Database query error:", err);
            return res.json({ signupStatus: false, Error: "Query error" });
          }

          const message = userCount === 0 
            ? "Admin account created successfully" 
            : "User account created successfully";

          return res.json({
            signupStatus: true,
            message: message,
            isFirstUser: userCount === 0
          });
        });
      });
    });
  });
});

  export { router as adminRouter };
  


