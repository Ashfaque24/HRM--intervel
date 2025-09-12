


import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import initialGoals from '../Data/goals';

export default function GoalManage() {
  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem("goals");
    return saved ? JSON.parse(saved) : initialGoals;
  });

  useEffect(() => {
    localStorage.setItem("goals", JSON.stringify(goals));
  }, [goals]);

  const updateGoalStatus = (goalId, status) => {
    setGoals((goals) =>
      goals.map((g) =>
        g.goalId === goalId ? { ...g, status } : g
      )
    );
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Manage Goals (Admin)
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Goal Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {goals.map((goal) => (
              <TableRow key={goal.goalId}>
                <TableCell>{goal.goalName}</TableCell>
                <TableCell>{goal.description}</TableCell>
                <TableCell>{goal.status}</TableCell>
                <TableCell>
                  {goal.status === "Pending" && (
                    <>
                      <Button color="primary" onClick={() => updateGoalStatus(goal.goalId, "In Progress")}>
                        Accept
                      </Button>
                      <Button color="error" onClick={() => updateGoalStatus(goal.goalId, "Rejected")}>
                        Reject
                      </Button>
                    </>
                  )}
                  {/* No other buttons here */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
