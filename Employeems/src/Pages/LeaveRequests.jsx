

import React, { useState, useMemo } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, MenuItem, Select, Typography } from '@mui/material';
import { Plus } from 'lucide-react';
import LeaveRequestData from '../Data/LeaveRequestData';

export default function LeaveRequestsDataGrid() {
  const [statusFilter, setStatusFilter] = useState('All Requests');
  const [leaveTypeFilter, setLeaveTypeFilter] = useState('All Leave Types');
  const [pageSize, setPageSize] = useState(20);

  const uniqueLeaveTypes = useMemo(() => {
    const types = [...new Set(LeaveRequestData.map(item => item.leaveType))];
    return ['All Leave Types', ...types];
  }, []);

  const uniqueStatuses = useMemo(() => {
    const statuses = [...new Set(LeaveRequestData.map(item => item.status))];
    return ['All Requests', ...statuses.map(status =>
      status.charAt(0).toUpperCase() + status.slice(1)
    )];
  }, []);

  const filteredData = useMemo(() => {
    return LeaveRequestData.filter(item => {
      const statusMatch = statusFilter === 'All Requests' ||
        item.status.toLowerCase() === statusFilter.toLowerCase();
      const leaveTypeMatch = leaveTypeFilter === 'All Leave Types' ||
        item.leaveType === leaveTypeFilter;
      return statusMatch && leaveTypeMatch;
    });
  }, [statusFilter, leaveTypeFilter]);

  const columns = [
    { field: 'status', headerName: 'Status', width: 120 },
    { field: 'employeeName', headerName: 'Employee Name', width: 180 },
    { field: 'leaveType', headerName: 'Leave Type', width: 150 },
    {
      field: 'leavePeriod',
      headerName: 'Leave Period',
      width: 200,
      renderCell: (params) => {
        const leavePeriod = params.row.leavePeriod;
        if (!leavePeriod || !leavePeriod.from || !leavePeriod.to) {
          return <span style={{ color: '#999' }}>N/A</span>;
        }
        const fromDate = new Date(leavePeriod.from).toLocaleDateString('en-GB');
        const toDate = new Date(leavePeriod.to).toLocaleDateString('en-GB');
        return `${fromDate} - ${toDate}`;
      }
    },
    {
      field: 'noOfDays',
      headerName: 'Days/Hours',
      width: 130,
      renderCell: (params) => `${params.row.noOfDays} Day${params.row.noOfDays > 1 ? 's' : ''}`,
    },
    {
      field: 'dateOfRequest',
      headerName: 'Date of Request',
      width: 160,
      renderCell: (params) =>
        params.row.dateOfRequest
          ? new Date(params.row.dateOfRequest).toLocaleDateString('en-GB')
          : 'N/A',
    },
  ];

  return (
    <Box sx={{ p: 3, bgcolor: '#f9fafb', minHeight: '100vh' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
          bgcolor: 'white',
          p: 2,
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        {/* Left - Leave Type Filter */}
        <Select
          size="small"
          value={leaveTypeFilter}
          onChange={(e) => setLeaveTypeFilter(e.target.value)}
        >
          {uniqueLeaveTypes.map((type) => (
            <MenuItem key={type} value={type}>{type}</MenuItem>
          ))}
        </Select>

        {/* Right - Status Filter + Add Button */}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Select
            size="small"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            {uniqueStatuses.map((status) => (
              <MenuItem key={status} value={status}>{status}</MenuItem>
            ))}
          </Select>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Plus size={16} />}
          >
            Add Request
          </Button>
        </Box>
      </Box>

      {/* DataGrid */}
      <Box sx={{ height: 500, bgcolor: 'white', borderRadius: 2, boxShadow: 1 }}>
        <DataGrid
          rows={filteredData.map((item, index) => ({
            id: index + 1,
            ...item,
          }))}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newSize) => setPageSize(newSize)}
          rowsPerPageOptions={[20, 50, 100]}
          pagination
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>

      <Typography sx={{ mt: 2, color: 'text.secondary' }}>
        Total Record Count: <b>{filteredData.length}</b>
      </Typography>
    </Box>
  );
}
