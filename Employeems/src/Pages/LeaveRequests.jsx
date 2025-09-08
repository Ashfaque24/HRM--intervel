

// import React, { useState, useMemo } from 'react';
// import { ChevronDown, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
// // Import your data file
// import LeaveRequestData from '../Data/LeaveRequestData';

// const LeaveRequests = () => {
//   const [statusFilter, setStatusFilter] = useState('All Requests');
//   const [leaveTypeFilter, setLeaveTypeFilter] = useState('All Leave Types');
//   const [recordsPerPage, setRecordsPerPage] = useState(20);
//   const [currentPage, setCurrentPage] = useState(1);

//   // Get unique leave types from data for filter dropdown
//   const uniqueLeaveTypes = useMemo(() => {
//     const types = [...new Set(LeaveRequestData.map(item => item.leaveType))];
//     return ['All Leave Types', ...types];
//   }, []);

//   // Get unique statuses from data for filter dropdown
//   const uniqueStatuses = useMemo(() => {
//     const statuses = [...new Set(LeaveRequestData.map(item => item.status))];
//     return ['All Requests', ...statuses.map(status => 
//       status.charAt(0).toUpperCase() + status.slice(1)
//     )];
//   }, []);

//   // Filter data based on selected filters
//   const filteredData = useMemo(() => {
//     return LeaveRequestData.filter(item => {
//       const statusMatch = statusFilter === 'All Requests' || 
//         item.status.toLowerCase() === statusFilter.toLowerCase();
//       const leaveTypeMatch = leaveTypeFilter === 'All Leave Types' || 
//         item.leaveType === leaveTypeFilter;
      
//       return statusMatch && leaveTypeMatch;
//     });
//   }, [statusFilter, leaveTypeFilter]);

//   // Paginate filtered data
//   const paginatedData = useMemo(() => {
//     const startIndex = (currentPage - 1) * recordsPerPage;
//     const endIndex = startIndex + recordsPerPage;
//     return filteredData.slice(startIndex, endIndex);
//   }, [filteredData, currentPage, recordsPerPage]);

//   // Calculate total pages
//   const totalPages = Math.ceil(filteredData.length / recordsPerPage);

//   // Reset to first page when filters change
//   React.useEffect(() => {
//     setCurrentPage(1);
//   }, [statusFilter, leaveTypeFilter, recordsPerPage]);

//   // Format date function
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const options = { day: '2-digit', month: 'short', year: 'numeric' };
//     return date.toLocaleDateString('en-GB', options);
//   };

//   // Format leave period function
//   const formatLeavePeriod = (leavePeriod) => {
//     const fromDate = formatDate(leavePeriod.from);
//     const toDate = formatDate(leavePeriod.to);
//     return `${fromDate} - ${toDate}`;
//   };

//   // Format days function
//   const formatDays = (noOfDays) => {
//     return `${noOfDays} Day${noOfDays > 1 ? 's' : ''}`;
//   };

//   // Determine leave type (Paid/Unpaid) based on leave type
//   const getLeaveTypeCategory = (leaveType) => {
//     if (leaveType === 'Leave Without Pay') {
//       return 'Unpaid';
//     } else if (leaveType === 'Compensatory Off') {
//       return 'Compensatory Off';
//     } else {
//       return 'Paid';
//     }
//   };

//   const StatusIcon = ({ status }) => {
//     const getStatusColor = (status) => {
//       switch(status.toLowerCase()) {
//         case 'approved': return 'bg-green-500';
//         case 'pending': return 'bg-yellow-500';
//         case 'rejected': return 'bg-red-500';
//         case 'cancelled': return 'bg-gray-500';
//         default: return 'bg-gray-400';
//       }
//     };

//     return (
//       <div className={`w-5 h-5 rounded-full ${getStatusColor(status)} flex items-center justify-center`}>
//         <div className="w-2 h-2 bg-white rounded-full"></div>
//       </div>
//     );
//   };

//   const handlePreviousPage = () => {
//     setCurrentPage(prev => Math.max(prev - 1, 1));
//   };

//   const handleNextPage = () => {
//     setCurrentPage(prev => Math.min(prev + 1, totalPages));
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-semibold text-gray-800">Leave Requests</h1>
//           <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
//             <Plus size={18} />
//             Add Request
//           </button>
//         </div>

//         {/* Filters */}
//         <div className="bg-white rounded-lg shadow-sm mb-6 p-4">
//           <div className="flex gap-4 items-center">
//             {/* Leave Type Filter */}
//             <div className="relative">
//               <select 
//                 value={leaveTypeFilter}
//                 onChange={(e) => setLeaveTypeFilter(e.target.value)}
//                 className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               >
//                 {uniqueLeaveTypes.map((type) => (
//                   <option key={type} value={type}>{type}</option>
//                 ))}
//               </select>
//               <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
//             </div>

//             {/* Status Filter */}
//             <div className="relative">
//               <select 
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value)}
//                 className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               >
//                 {uniqueStatuses.map((status) => (
//                   <option key={status} value={status}>{status}</option>
//                 ))}
//               </select>
//               <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
//             </div>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50 border-b border-gray-200">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Employee Name
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Leave Type
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Type
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Leave Period
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Days/Hours Taken
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Date of Request
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {paginatedData.length > 0 ? (
//                   paginatedData.map((leave) => (
//                     <tr key={leave.requestId} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <StatusIcon status={leave.status} />
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         {leave.employeeName}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         {leave.leaveType}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         {getLeaveTypeCategory(leave.leaveType)}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         {formatLeavePeriod(leave.leavePeriod)}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         {formatDays(leave.noOfDays)}
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                         {formatDate(leave.dateOfRequest)}
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
//                       No leave requests found matching the selected filters.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           <div className="bg-white px-6 py-3 border-t border-gray-200 flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <span className="text-sm text-gray-700">
//                 Total Record Count: <span className="text-blue-600">{filteredData.length}</span>
//               </span>
//               <div className="flex items-center gap-2">
//                 <select 
//                   value={recordsPerPage}
//                   onChange={(e) => setRecordsPerPage(Number(e.target.value))}
//                   className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value={20}>20</option>
//                   <option value={50}>50</option>
//                   <option value={100}>100</option>
//                 </select>
//                 <span className="text-sm text-gray-700">Records per page</span>
//               </div>
//             </div>
            
//             <div className="flex items-center gap-2">
//               <button 
//                 onClick={handlePreviousPage}
//                 disabled={currentPage === 1}
//                 className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <ChevronLeft size={16} />
//               </button>
//               <span className="text-sm text-gray-700">
//                 {filteredData.length > 0 
//                   ? `${(currentPage - 1) * recordsPerPage + 1} - ${Math.min(currentPage * recordsPerPage, filteredData.length)}`
//                   : '0 - 0'
//                 }
//               </span>
//               <button 
//                 onClick={handleNextPage}
//                 disabled={currentPage === totalPages || totalPages === 0}
//                 className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 <ChevronRight size={16} />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LeaveRequests;;



import React, { useState, useMemo } from 'react';
import { ChevronDown, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import LeaveRequestData from '../Data/LeaveRequestData';

const LeaveRequests = () => {
  const [statusFilter, setStatusFilter] = useState('All Requests');
  const [leaveTypeFilter, setLeaveTypeFilter] = useState('All Leave Types');
  const [recordsPerPage, setRecordsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  // Get unique leave types from data for filter dropdown
  const uniqueLeaveTypes = useMemo(() => {
    const types = [...new Set(LeaveRequestData.map(item => item.leaveType))];
    return ['All Leave Types', ...types];
  }, []);

  // Get unique statuses from data for filter dropdown
  const uniqueStatuses = useMemo(() => {
    const statuses = [...new Set(LeaveRequestData.map(item => item.status))];
    return ['All Requests', ...statuses.map(status => 
      status.charAt(0).toUpperCase() + status.slice(1)
    )];
  }, []);

  // Filter data based on selected filters
  const filteredData = useMemo(() => {
    return LeaveRequestData.filter(item => {
      const statusMatch = statusFilter === 'All Requests' || 
        item.status.toLowerCase() === statusFilter.toLowerCase();
      const leaveTypeMatch = leaveTypeFilter === 'All Leave Types' || 
        item.leaveType === leaveTypeFilter;
      
      return statusMatch && leaveTypeMatch;
    });
  }, [statusFilter, leaveTypeFilter]);

  // Paginate filtered data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage, recordsPerPage]);

  const totalPages = Math.ceil(filteredData.length / recordsPerPage);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, leaveTypeFilter, recordsPerPage]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  };

  const formatLeavePeriod = (leavePeriod) => {
    const fromDate = formatDate(leavePeriod.from);
    const toDate = formatDate(leavePeriod.to);
    return `${fromDate} - ${toDate}`;
  };

  const formatDays = (noOfDays) => {
    return `${noOfDays} Day${noOfDays > 1 ? 's' : ''}`;
  };

  const StatusIcon = ({ status }) => {
    const getStatusColor = (status) => {
      switch(status.toLowerCase()) {
        case 'approved': return 'bg-green-500';
        case 'pending': return 'bg-yellow-500';
        case 'rejected': return 'bg-red-500';
        case 'cancelled': return 'bg-gray-500';
        default: return 'bg-gray-400';
      }
    };

    return (
      <div className={`w-5 h-5 rounded-full ${getStatusColor(status)} flex items-center justify-center`}>
        <div className="w-2 h-2 bg-white rounded-full"></div>
      </div>
    );
  };

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Leave Requests</h1>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <Plus size={18} />
            Add Request
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm mb-6 p-4">
          <div className="flex gap-4 items-center">
            {/* Leave Type Filter */}
            <div className="relative">
              <select 
                value={leaveTypeFilter}
                onChange={(e) => setLeaveTypeFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {uniqueLeaveTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {uniqueStatuses.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leave Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Leave Period</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days/Hours Taken</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Request</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedData.length > 0 ? (
                  paginatedData.map((leave) => (
                    <tr key={leave.requestId} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusIcon status={leave.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{leave.employeeName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{leave.leaveType}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatLeavePeriod(leave.leavePeriod)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDays(leave.noOfDays)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(leave.dateOfRequest)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                      No leave requests found matching the selected filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-white px-6 py-3 border-t border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-700">
                Total Record Count: <span className="text-blue-600">{filteredData.length}</span>
              </span>
              <div className="flex items-center gap-2">
                <select 
                  value={recordsPerPage}
                  onChange={(e) => setRecordsPerPage(Number(e.target.value))}
                  className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
                <span className="text-sm text-gray-700">Records per page</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-sm text-gray-700">
                {filteredData.length > 0 
                  ? `${(currentPage - 1) * recordsPerPage + 1} - ${Math.min(currentPage * recordsPerPage, filteredData.length)}`
                  : '0 - 0'
                }
              </span>
              <button 
                onClick={handleNextPage}
                disabled={currentPage === totalPages || totalPages === 0}
                className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveRequests;
