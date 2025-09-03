

import { Router } from "express";
import con from "../utils/db.js";

const adminFunctions = Router();

// GET - All roles
adminFunctions.get("/roles", (req, res) => {
  const sql = "SELECT * FROM roles ORDER BY id ASC";
  con.query(sql, (err, result) => {
    if (err) {
      console.error("Database query error:", err);
      return res.json({ success: false, Error: "Failed to fetch roles" });
    }

    return res.json({
      success: true,
      roles: result
    });
  });
});

// POST - Add new role
adminFunctions.post("/add-role", (req, res) => {
  const { role_name, description } = req.body;

  if (!role_name || !role_name.trim()) {
    return res.json({ success: false, Error: "Role name is required" });
  }

  const checkRoleSql = "SELECT role_name FROM roles WHERE role_name = ?";
  con.query(checkRoleSql, [role_name.trim()], (err, result) => {
    if (err) {
      console.error("Role check error:", err);
      return res.json({ success: false, Error: "Database error" });
    }

    if (result.length > 0) {
      return res.json({ success: false, Error: "Role already exists" });
    }

    const insertRoleSql = "INSERT INTO roles (role_name, description) VALUES (?, ?)";
    con.query(insertRoleSql, [role_name.trim(), description?.trim() || null], (err, result) => {
      if (err) {
        console.error("Insert role error:", err);
        return res.json({ success: false, Error: "Failed to add role" });
      }

      return res.json({
        success: true,
        message: "Role added successfully",
        roleId: result.insertId
      });
    });
  });
});

// PUT - Update role
adminFunctions.put("/roles/:id", (req, res) => {
  const { id } = req.params;
  const { role_name, description } = req.body;

  if (!role_name || !role_name.trim()) {
    return res.json({ success: false, Error: "Role name is required" });
  }

  const checkDuplicateSql = "SELECT role_name FROM roles WHERE role_name = ? AND id != ?";
  con.query(checkDuplicateSql, [role_name.trim(), id], (err, duplicateResult) => {
    if (err) {
      console.error("Duplicate check error:", err);
      return res.json({ success: false, Error: "Database error" });
    }

    if (duplicateResult.length > 0) {
      return res.json({ success: false, Error: "Role name already exists" });
    }

    const updateRoleSql = "UPDATE roles SET role_name = ?, description = ? WHERE id = ?";
    con.query(updateRoleSql, [role_name.trim(), description?.trim() || null, id], (err) => {
      if (err) {
        console.error("Update role error:", err);
        return res.json({ success: false, Error: "Failed to update role" });
      }

      return res.json({
        success: true,
        message: "Role updated successfully"
      });
    });
  });
});

// DELETE - Delete role
adminFunctions.delete("/roles/:id", (req, res) => {
  const { id } = req.params;

  const checkRoleSql = "SELECT * FROM roles WHERE id = ?";
  con.query(checkRoleSql, [id], (err, result) => {
    if (err) {
      console.error("Role check error:", err);
      return res.json({ success: false, Error: "Database error" });
    }

    if (result.length === 0) {
      return res.json({ success: false, Error: "Role not found" });
    }

    const role = result[0];
    const protectedRoles = ["admin", "hr", "manager", "employee"];
    if (protectedRoles.includes(role.role_name.toLowerCase())) {
      return res.json({ success: false, Error: "Cannot delete system default roles" });
    }

    const checkUsersSql = "SELECT COUNT(*) as userCount FROM users WHERE role_id = ?";
    con.query(checkUsersSql, [id], (err, userResult) => {
      if (err) {
        console.error("User count check error:", err);
        return res.json({ success: false, Error: "Database error" });
      }

      if (userResult[0].userCount > 0) {
        return res.json({
          success: false,
          Error: `Cannot delete role. ${userResult[0].userCount} user(s) are assigned to this role.`
        });
      }

      const deleteRoleSql = "DELETE FROM roles WHERE id = ?";
      con.query(deleteRoleSql, [id], (err) => {
        if (err) {
          console.error("Delete role error:", err);
          return res.json({ success: false, Error: "Failed to delete role" });
        }

        return res.json({
          success: true,
          message: "Role deleted successfully"
        });
      });
    });
  });
});

// GET - Get role by ID
adminFunctions.get("/roles/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM roles WHERE id = ?";

  con.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Database query error:", err);
      return res.json({ success: false, Error: "Failed to fetch role" });
    }

    if (result.length === 0) {
      return res.json({ success: false, Error: "Role not found" });
    }

    return res.json({
      success: true,
      role: result[0]
    });
  });
});

export default adminFunctions;


