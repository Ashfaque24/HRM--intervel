

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Holidays() {
  const [holidays, setHolidays] = useState([]);
  const [filteredHolidays, setFilteredHolidays] = useState([]);
  const [year, setYear] = useState("all");
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ id: null, holidayName: "", date: "", description: "" });
  const [isEdit, setIsEdit] = useState(false);
  const [saving, setSaving] = useState(false);

  // Fetch holidays from API
  const fetchHolidays = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/holidays");
      const data = await res.json();
      setHolidays(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch holidays", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHolidays();
  }, []);

  // Extract unique years from holidays for the year selector
  const years = [...new Set(holidays.map(h => new Date(h.date).getFullYear()))].sort((a, b) => b - a);

  // Filter holidays by selected year whenever holidays or year changes
  useEffect(() => {
    if (year === "all") {
      setFilteredHolidays(holidays);
    } else {
      setFilteredHolidays(holidays.filter(h => {
        const holidayYear = new Date(h.date).getFullYear().toString();
        return holidayYear === year.toString();
      }));
    }
  }, [holidays, year]);

  // Open add dialog
  const openAddDialog = () => {
    setForm({ id: null, holidayName: "", date: "", description: "" });
    setIsEdit(false);
    setDialogOpen(true);
  };

  // Open edit dialog
  const openEditDialog = (holiday) => {
    const formattedDate = holiday.date ? holiday.date.split("T")[0] : "";
    setForm({
      id: holiday.id,
      holidayName: holiday.holiday_name,
      date: formattedDate,
      description: holiday.description || "",
    });
    setIsEdit(true);
    setDialogOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Save (add or update)
  const handleSave = async () => {
    const { id, holidayName, date, description } = form;
    if (!holidayName || !date) {
      alert("Please fill in Holiday Name and Date");
      return;
    }
    setSaving(true);
    try {
      let res;
      if (isEdit) {
        res = await fetch(`http://localhost:3000/api/holidays/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ holidayName, date, description }),
        });
      } else {
        res = await fetch("http://localhost:3000/api/holidays", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ holidayName, date, description }),
        });
      }
      if (res.ok) {
        fetchHolidays();
        setDialogOpen(false);
      } else {
        const errorData = await res.json();
        alert("Failed to save holiday: " + (errorData.message || res.statusText));
      }
    } catch (error) {
      alert("Failed to save holiday: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  // Soft delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this holiday?")) return;
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/api/holidays/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchHolidays();
      } else {
        alert("Failed to delete holiday");
      }
    } catch (error) {
      alert("Failed to delete holiday: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "holiday_name", headerName: "Name", flex: 1 },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      renderCell: (params) => {
        const dateValue = params.value;
        if (!dateValue) return "";
        const d = new Date(dateValue);
        if (isNaN(d.getTime())) return "Invalid Date";
        return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
      },
    },
    { field: "description", headerName: "Description", flex: 2 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 120,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={() => openEditDialog(params.row)}
          key="edit"
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => handleDelete(params.id)}
          key="delete"
        />,
      ],
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 2 }}>
        <Typography variant="h5" fontWeight="bold">
          Holiday Calendar
        </Typography>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Year</InputLabel>
          <Select value={year} label="Year" onChange={(e) => setYear(e.target.value)}>
            <MenuItem value="all">All Years</MenuItem>
            {years.map((y) => (
              <MenuItem key={y} value={y.toString()}>
                {y}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" onClick={openAddDialog}>
          Add Holiday
        </Button>
      </Box>
      <Paper sx={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={filteredHolidays}
          columns={columns}
          pageSizeOptions={[10, 25, 50, 100]}
          loading={loading}
          getRowId={(row) => row.id}
          disableRowSelectionOnClick
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
        />
      </Paper>
      <Dialog open={dialogOpen} onClose={() => !saving && setDialogOpen(false)}>
        <DialogTitle>{isEdit ? "Edit Holiday" : "Add Holiday"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="holidayName"
            label="Holiday Name"
            fullWidth
            value={form.holidayName}
            onChange={handleFormChange}
            disabled={saving}
          />
          <TextField
            margin="dense"
            name="date"
            label="Date"
            type="date"
            fullWidth
            value={form.date}
            onChange={handleFormChange}
            InputLabelProps={{ shrink: true }}
            disabled={saving}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            fullWidth
            multiline
            minRows={2}
            value={form.description}
            onChange={handleFormChange}
            disabled={saving}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => !saving && setDialogOpen(false)} disabled={saving}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={!form.holidayName || !form.date || saving}
          >
            {isEdit ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

