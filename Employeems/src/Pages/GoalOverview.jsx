


// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Rating,
//   Typography,
// } from "@mui/material";

// import initialGoals from "../Data/goals";

// export default function GoalOverview() {
//   const [goals, setGoals] = useState(() => {
//     const saved = localStorage.getItem("goals");
//     return saved ? JSON.parse(saved) : initialGoals;
//   });

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [ratingModalOpen, setRatingModalOpen] = useState(false); // Rating & Feedback modal
//   const [currentGoal, setCurrentGoal] = useState(null); // Goal being rated

//   const [newGoal, setNewGoal] = useState({
//     goalName: "",
//     description: "",
//     startDate: "",
//     endDate: "",
//     estimatedHours: "",
//   });

//   // Inputs for rating and feedback
//   const [rating, setRating] = useState(null);
//   const [feedback, setFeedback] = useState("");

//   useEffect(() => {
//     localStorage.setItem("goals", JSON.stringify(goals));
//   }, [goals]);

//   const openModal = () => {
//     setNewGoal({
//       goalName: "",
//       description: "",
//       startDate: "",
//       endDate: "",
//       estimatedHours: "",
//     });
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewGoal((prev) => ({ ...prev, [name]: value }));
//   };

//   const addGoal = () => {
//     if (!newGoal.goalName || !newGoal.startDate || !newGoal.endDate) {
//       alert("Please enter Goal Name, Start Date, and End Date.");
//       return;
//     }
//     const newId = goals.length ? Math.max(...goals.map((g) => g.goalId)) + 1 : 1;
//     const goalToAdd = {
//       goalId: newId,
//       goalName: newGoal.goalName,
//       description: newGoal.description,
//       startDate: newGoal.startDate,
//       endDate: newGoal.endDate,
//       estimatedHours: newGoal.estimatedHours ? Number(newGoal.estimatedHours) : 0,
//       status: "Pending",
//       rating: null,
//       feedback: "",
//     };
//     setGoals((prev) => [...prev, goalToAdd]);
//     closeModal();
//   };

//   // Open rating modal when marking completed
//   const openRatingModal = (goal) => {
//     setCurrentGoal(goal);
//     setRating(goal.rating || null);
//     setFeedback(goal.feedback || "");
//     setRatingModalOpen(true);
//   };

//   const closeRatingModal = () => {
//     setRatingModalOpen(false);
//     setCurrentGoal(null);
//     setRating(null);
//     setFeedback("");
//   };

//   // Submit rating and feedback, update status to Completed
//   const submitRatingFeedback = () => {
//     setGoals((prevGoals) =>
//       prevGoals.map((goal) =>
//         goal.goalId === currentGoal.goalId
//           ? { ...goal, status: "Completed", rating, feedback }
//           : goal
//       )
//     );
//     closeRatingModal();
//   };

//   return (
//     <Box sx={{ padding: 3 }}>
//       <Typography variant="h4" gutterBottom>
//         Goal Overview
//       </Typography>
//       <Button variant="contained" onClick={openModal} sx={{ mb: 2 }}>
//         Add Goal
//       </Button>

//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Goal Name</TableCell>
//               <TableCell>Description</TableCell>
//               <TableCell>Start Date</TableCell>
//               <TableCell>End Date</TableCell>
//               <TableCell>Estimated Hours</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Rating</TableCell>
//               <TableCell>Feedback</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {goals.map((goal) => (
//               <TableRow key={goal.goalId}>
//                 <TableCell>{goal.goalName}</TableCell>
//                 <TableCell>{goal.description}</TableCell>
//                 <TableCell>{goal.startDate}</TableCell>
//                 <TableCell>{goal.endDate}</TableCell>
//                 <TableCell>{goal.estimatedHours}</TableCell>
//                 <TableCell>{goal.status}</TableCell>
//                 <TableCell>
//                   {goal.rating !== null ? (
//                     <Rating value={goal.rating} readOnly />
//                   ) : (
//                     "-"
//                   )}
//                 </TableCell>
//                 <TableCell>{goal.feedback || "-"}</TableCell>
//                 <TableCell>
//                   {goal.status === "In Progress" && (
//                     <Button
//                       variant="contained"
//                       color="success"
//                       onClick={() => openRatingModal(goal)}
//                     >
//                       Mark Completed
//                     </Button>
//                   )}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Add Goal Modal */}
//       <Dialog open={isModalOpen} onClose={closeModal}>
//         <DialogTitle>Add New Goal</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Goal Name"
//             name="goalName"
//             fullWidth
//             margin="normal"
//             value={newGoal.goalName}
//             onChange={handleInputChange}
//           />
//           <TextField
//             label="Description"
//             name="description"
//             fullWidth
//             margin="normal"
//             multiline
//             rows={3}
//             value={newGoal.description}
//             onChange={handleInputChange}
//           />
//           <TextField
//             label="Start Date"
//             name="startDate"
//             type="date"
//             fullWidth
//             margin="normal"
//             InputLabelProps={{ shrink: true }}
//             value={newGoal.startDate}
//             onChange={handleInputChange}
//           />
//           <TextField
//             label="End Date"
//             name="endDate"
//             type="date"
//             fullWidth
//             margin="normal"
//             InputLabelProps={{ shrink: true }}
//             value={newGoal.endDate}
//             onChange={handleInputChange}
//           />
//           <TextField
//             label="Estimated Hours"
//             name="estimatedHours"
//             type="number"
//             fullWidth
//             margin="normal"
//             value={newGoal.estimatedHours}
//             onChange={handleInputChange}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={closeModal}>Cancel</Button>
//           <Button variant="contained" onClick={addGoal}>
//             Add
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Rating & Feedback Modal */}
//       <Dialog open={ratingModalOpen} onClose={closeRatingModal}>
//         <DialogTitle>Provide Rating & Feedback</DialogTitle>
//         <DialogContent>
//           <Typography component="legend" sx={{ mt: 1 }}>
//             Rating
//           </Typography>
//           <Rating
//             name="rating"
//             value={rating || 0}
//             onChange={(_, value) => setRating(value)}
//           />
//           <TextField
//             label="Feedback"
//             multiline
//             rows={4}
//             fullWidth
//             value={feedback}
//             onChange={(e) => setFeedback(e.target.value)}
//             sx={{ mt: 2 }}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={closeRatingModal}>Cancel</Button>
//           <Button variant="contained" onClick={submitRatingFeedback}>
//             Submit
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }






import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Rating,
  Typography,
} from "@mui/material";

import initialGoals from "../Data/goals";

export default function GoalOverview() {
  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem("goals");
    return saved ? JSON.parse(saved) : initialGoals;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [ratingModalOpen, setRatingModalOpen] = useState(false);

  const [newGoal, setNewGoal] = useState({
    goalName: "",
    description: "",
    startDate: "",
    endDate: "",
    estimatedHours: "",
  });

  const [editGoal, setEditGoal] = useState(null);
  const [currentGoal, setCurrentGoal] = useState(null);
  const [rating, setRating] = useState(null);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    localStorage.setItem("goals", JSON.stringify(goals));
  }, [goals]);

  // Add Goal
  const openModal = () => {
    setNewGoal({
      goalName: "",
      description: "",
      startDate: "",
      endDate: "",
      estimatedHours: "",
    });
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGoal((prev) => ({ ...prev, [name]: value }));
  };

  const addGoal = () => {
    if (!newGoal.goalName || !newGoal.startDate || !newGoal.endDate) {
      alert("Please enter Goal Name, Start Date, and End Date.");
      return;
    }
    const newId = goals.length ? Math.max(...goals.map((g) => g.goalId)) + 1 : 1;
    const goalToAdd = {
      goalId: newId,
      goalName: newGoal.goalName,
      description: newGoal.description,
      startDate: newGoal.startDate,
      endDate: newGoal.endDate,
      estimatedHours: newGoal.estimatedHours ? Number(newGoal.estimatedHours) : 0,
      status: "Pending",
      rating: null,
      feedback: "",
    };
    setGoals((prev) => [...prev, goalToAdd]);
    closeModal();
  };

  // Edit Goal
  const openEditModal = (goal) => {
    setEditGoal({ ...goal });
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditGoal(null);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditGoal((prev) => ({ ...prev, [name]: value }));
  };

  const updateGoal = () => {
    setGoals((prev) =>
      prev.map((g) => (g.goalId === editGoal.goalId ? { ...editGoal } : g))
    );
    closeEditModal();
  };

  // Delete Goal
  const deleteGoal = (goalId) => {
    setGoals((prev) => prev.filter((g) => g.goalId !== goalId));
  };

  // Rating Modal
  const openRatingModal = (goal) => {
    setCurrentGoal(goal);
    setRating(goal.rating || null);
    setFeedback(goal.feedback || "");
    setRatingModalOpen(true);
  };

  const closeRatingModal = () => {
    setRatingModalOpen(false);
    setCurrentGoal(null);
    setRating(null);
    setFeedback("");
  };

  const submitRatingFeedback = () => {
    setGoals((prevGoals) =>
      prevGoals.map((goal) =>
        goal.goalId === currentGoal.goalId
          ? { ...goal, status: "Completed", rating, feedback }
          : goal
      )
    );
    closeRatingModal();
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Goal Overview
      </Typography>
      <Button variant="contained" onClick={openModal} sx={{ mb: 2 }}>
        Add Goal
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Goal Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Estimated Hours</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Feedback</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {goals.map((goal) => (
              <TableRow key={goal.goalId}>
                <TableCell>{goal.goalName}</TableCell>
                <TableCell>{goal.description}</TableCell>
                <TableCell>{goal.startDate}</TableCell>
                <TableCell>{goal.endDate}</TableCell>
                <TableCell>{goal.estimatedHours}</TableCell>
                <TableCell>{goal.status}</TableCell>
                <TableCell>
                  {goal.rating !== null ? (
                    <Rating value={goal.rating} readOnly />
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell>{goal.feedback || "-"}</TableCell>
                <TableCell>
                  {goal.status === "In Progress" && (
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => openRatingModal(goal)}
                    >
                      Mark Completed
                    </Button>
                  )}

                  {goal.status === "Pending" && (
                    <>
                      <Button
                        variant="outlined"
                        color="primary"
                        sx={{ ml: 1 }}
                        onClick={() => openEditModal(goal)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        sx={{ ml: 1 }}
                        onClick={() => deleteGoal(goal.goalId)}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Goal Modal */}
      <Dialog open={isModalOpen} onClose={closeModal}>
        <DialogTitle>Add New Goal</DialogTitle>
        <DialogContent>
          <TextField
            label="Goal Name"
            name="goalName"
            fullWidth
            margin="normal"
            value={newGoal.goalName}
            onChange={handleInputChange}
          />
          <TextField
            label="Description"
            name="description"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            value={newGoal.description}
            onChange={handleInputChange}
          />
          <TextField
            label="Start Date"
            name="startDate"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={newGoal.startDate}
            onChange={handleInputChange}
          />
          <TextField
            label="End Date"
            name="endDate"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={newGoal.endDate}
            onChange={handleInputChange}
          />
          <TextField
            label="Estimated Hours"
            name="estimatedHours"
            type="number"
            fullWidth
            margin="normal"
            value={newGoal.estimatedHours}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Cancel</Button>
          <Button variant="contained" onClick={addGoal}>
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Goal Modal */}
      <Dialog open={editModalOpen} onClose={closeEditModal}>
        <DialogTitle>Edit Goal</DialogTitle>
        <DialogContent>
          <TextField
            label="Goal Name"
            name="goalName"
            fullWidth
            margin="normal"
            value={editGoal?.goalName || ""}
            onChange={handleEditInputChange}
          />
          <TextField
            label="Description"
            name="description"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            value={editGoal?.description || ""}
            onChange={handleEditInputChange}
          />
          <TextField
            label="Start Date"
            name="startDate"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={editGoal?.startDate || ""}
            onChange={handleEditInputChange}
          />
          <TextField
            label="End Date"
            name="endDate"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={editGoal?.endDate || ""}
            onChange={handleEditInputChange}
          />
          <TextField
            label="Estimated Hours"
            name="estimatedHours"
            type="number"
            fullWidth
            margin="normal"
            value={editGoal?.estimatedHours || ""}
            onChange={handleEditInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditModal}>Cancel</Button>
          <Button variant="contained" onClick={updateGoal}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Rating & Feedback Modal */}
      <Dialog open={ratingModalOpen} onClose={closeRatingModal}>
        <DialogTitle>Provide Rating & Feedback</DialogTitle>
        <DialogContent>
          <Typography component="legend" sx={{ mt: 1 }}>
            Rating
          </Typography>
          <Rating
            name="rating"
            value={rating || 0}
            onChange={(_, value) => setRating(value)}
          />
          <TextField
            label="Feedback"
            multiline
            rows={4}
            fullWidth
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeRatingModal}>Cancel</Button>
          <Button variant="contained" onClick={submitRatingFeedback}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
