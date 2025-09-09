// import express from "express";
// import con from "../utils/db.js";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt"; // Use import instead of require

// const router = express.Router();
// const saltRounds = 10; // Recommended: 10–12

// // Input validation middleware
// const validateLoginInput = (req, res, next) => {
//   const { email, password } = req.body;
  
//   if (!email || !password) {
//     return res.json({ loginStatus: false, Error: "Email and password are required" });
//   }
  
//   // Email format validation
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailRegex.test(email)) {
//     return res.json({ loginStatus: false, Error: "Invalid email format" });
//   }
  
//   if (password.length < 6) {
//     return res.json({ loginStatus: false, Error: "Password must be at least 6 characters long" });
//   }
  
//   next();
// };

// // LOGIN ROUTE
// router.post("/login", validateLoginInput, (req, res) => {
//     const sql = `
//       SELECT u.*, r.role_name 
//       FROM users u
//       LEFT JOIN roles r ON u.role_id = r.id
//       WHERE u.email = ?
//     `;
//     con.query(sql, [req.body.email], (err, result) => {
//       if (err) {
//         console.error("Database error in login:", err);
//         return res.json({ loginStatus: false, Error: "Database error" });
//       }
  
//       if (result.length > 0) {
//         const user = result[0];
        
//         // Check if user is active
//         if (!user.is_active) {
//           return res.json({ loginStatus: false, Error: "Account is deactivated" });
//         }
        
//         bcrypt.compare(req.body.password, user.password_hash, (err, isMatch) => {
//           if (err) {
//             console.error("Password comparison error:", err);
//             return res.json({ loginStatus: false, Error: "Authentication failed" });
//           }
  
//           if (isMatch) {
//             const token = jwt.sign(
//               { email: user.email, role: user.role_name, userId: user.id },
//               "jwt_secret_key",
//               { expiresIn: "1d" }
//             );
  
//             res.cookie("token", token, { httpOnly: true });
//             return res.json({
//               loginStatus: true,
//               role: user.role_name,
//               email: user.email
//             });
//           } else {
//             return res.json({ loginStatus: false, Error: "Invalid email or password" });
//           }
//         });
//       } else {
//         return res.json({ loginStatus: false, Error: "Invalid email or password" });
//       }
//     });
//   });
  


// // Signup validation middleware
// const validateSignupInput = (req, res, next) => {
//   const { name, email, password } = req.body;
  
//   if (!name || !email || !password) {
//     return res.json({ signupStatus: false, Error: "All fields are required" });
//   }
  
//   // Name validation
//   if (name.length < 2) {
//     return res.json({ signupStatus: false, Error: "Name must be at least 2 characters long" });
//   }
//   if (name.length > 50) {
//     return res.json({ signupStatus: false, Error: "Name must be less than 50 characters" });
//   }
  
//   // Email format validation
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailRegex.test(email)) {
//     return res.json({ signupStatus: false, Error: "Invalid email format" });
//   }
  
//   // Password strength validation
//   if (password.length < 8) {
//     return res.json({ signupStatus: false, Error: "Password must be at least 8 characters long" });
//   }
//   if (!/(?=.*[a-z])/.test(password)) {
//     return res.json({ signupStatus: false, Error: "Password must contain at least one lowercase letter" });
//   }
//   if (!/(?=.*[A-Z])/.test(password)) {
//     return res.json({ signupStatus: false, Error: "Password must contain at least one uppercase letter" });
//   }
//   if (!/(?=.*\d)/.test(password)) {
//     return res.json({ signupStatus: false, Error: "Password must contain at least one number" });
//   }
  
//   next();
// };

// // SIGNUP ROUTE
// router.post("/signup", validateSignupInput, (req, res) => {
//   const { name, email, password } = req.body;

//   // First, check if email already exists
//   const checkEmailSql = "SELECT email FROM users WHERE email = ?";
//   con.query(checkEmailSql, [email], (err, emailResults) => {
//     if (err) {
//       console.error("Email check error:", err);
//       return res.json({ signupStatus: false, Error: "Database error" });
//     }
    
//     if (emailResults.length > 0) {
//       return res.json({ signupStatus: false, Error: "Email already exists" });
//     }

//     // Check if this is the first user (should become admin)
//     const countUsersSql = "SELECT COUNT(*) as userCount FROM users";
//     con.query(countUsersSql, (err, countResults) => {
//       if (err) {
//         console.error("User count error:", err);
//         return res.json({ signupStatus: false, Error: "Database error" });
//       }

//       const userCount = countResults[0].userCount;
//       let roleId;
      
//       if (userCount === 0) {
//         // First user becomes Admin (assuming Admin role has id = 1)
//         roleId = 1;
//         console.log("Creating first user as Admin");
//       } else {
//         // Subsequent users become Employee (assuming Employee role has id = 4)
//         roleId = 4;
//         console.log("Creating user as Employee");
//       }

//       // Hash the password
//       bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
//         if (err) {
//           console.error("Hashing error:", err);
//           return res.json({ signupStatus: false, Error: "Hashing error" });
//         }

//         // Insert user with appropriate role
//         const sql = "INSERT INTO users (name, email, password_hash, role_id, is_active) VALUES (?, ?, ?, ?, ?)";
//         con.query(sql, [name, email, hashedPassword, roleId, 1], (err, result) => {
//           if (err) {
//             console.error("Database query error:", err);
//             return res.json({ signupStatus: false, Error: "Query error" });
//           }

//           const message = userCount === 0 
//             ? "Admin account created successfully" 
//             : "User account created successfully";

//           return res.json({
//             signupStatus: true,
//             message: message,
//             isFirstUser: userCount === 0
//           });
//         });
//       });
//     });
//   });
// });

//   export { router as adminRouter };
  

import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();
const saltRounds = 10;
const JWT_SECRET = "jwt_secret_key"; // Move this to .env in production

// LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ loginStatus: false, Error: "Email and password are required" });
  }

  const sql = `
    SELECT u.*, r.role_name 
    FROM users u
    LEFT JOIN roles r ON u.role_id = r.id
    WHERE u.email = ?
  `;

  con.query(sql, [email], (err, result) => {
    if (err) {
      console.error("Database error in login:", err);
      return res.json({ loginStatus: false, Error: "Database error" });
    }

    if (result.length === 0) {
      return res.json({ loginStatus: false, Error: "Invalid email or password" });
    }

    const user = result[0];

    if (!user.is_active) {
      return res.json({ loginStatus: false, Error: "Account is deactivated" });
    }

    bcrypt.compare(password, user.password_hash, (err, isMatch) => {
      if (err) {
        console.error("Password comparison error:", err);
        return res.json({ loginStatus: false, Error: "Authentication failed" });
      }

      if (!isMatch) {
        return res.json({ loginStatus: false, Error: "Invalid email or password" });
      }

      // Generate JWT Token
      const token = jwt.sign(
        { email: user.email, role: user.role_name, userId: user.id },
        JWT_SECRET,
        { expiresIn: "1d" }
      );

      return res.json({
        loginStatus: true,
        token, // Send token to frontend
        role: user.role_name,
        email: user.email,
      });
    });
  });
});

// SIGNUP
router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({ signupStatus: false, Error: "All fields are required" });
  }

  const checkEmailSql = "SELECT email FROM users WHERE email = ?";
  con.query(checkEmailSql, [email], (err, emailResults) => {
    if (err) {
      console.error("Email check error:", err);
      return res.json({ signupStatus: false, Error: "Database error" });
    }

    if (emailResults.length > 0) {
      return res.json({ signupStatus: false, Error: "Email already exists" });
    }

    const countUsersSql = "SELECT COUNT(*) as userCount FROM users";
    con.query(countUsersSql, (err, countResults) => {
      if (err) {
        console.error("User count error:", err);
        return res.json({ signupStatus: false, Error: "Database error" });
      }

      const userCount = countResults[0].userCount;
      const roleId = userCount === 0 ? 1 : 4; // 1 = Admin, 4 = Employee

      bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        if (err) {
          console.error("Hashing error:", err);
          return res.json({ signupStatus: false, Error: "Hashing error" });
        }

        const sql = `
          INSERT INTO users (name, email, password_hash, role_id, is_active)
          VALUES (?, ?, ?, ?, 1)
        `;
        con.query(sql, [name, email, hashedPassword, roleId], (err) => {
          if (err) {
            console.error("Database query error:", err);
            return res.json({ signupStatus: false, Error: "Query error" });
          }

          return res.json({
            signupStatus: true,
            message:
              userCount === 0
                ? "Admin account created successfully!"
                : "User account created successfully!",
            isFirstUser: userCount === 0,
          });
        });
      });
    });
  });
});

export { router as authRouter };
