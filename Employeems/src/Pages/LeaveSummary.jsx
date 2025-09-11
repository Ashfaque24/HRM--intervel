
import React, { useState, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, MoreHorizontal, Grid, List } from 'lucide-react';

const LeaveDashboardContent = () => {
  const [viewMode, setViewMode] = useState('cards');
  const [selectedYear, setSelectedYear] = useState(2025);
  const [leaveData, setLeaveData] = useState({});
  const [holidayData, setHolidayData] = useState([]);
  const [totalBooked, setTotalBooked] = useState(0);
  const [totalAbsent, setTotalAbsent] = useState(0);

  // Mock data for different years (added WFH Leave)
  const yearlyData = {
    2023: {
      leaveTypes: [
        { name: 'Casual Leave', icon: '🏖️', available: 3, booked: 6, color: '#E3F2FD', iconBg: '#2196F3' },
        { name: 'WFH Leave', icon: '💻', available: 2, booked: 1, color: '#FFF3E0', iconBg: '#FF9800' },
        { name: 'Compensatory Off', icon: '😊', available: 2, booked: 5, color: '#E8F5E8', iconBg: '#4CAF50' },
        { name: 'Earned Leave', icon: '👑', available: 5, booked: 2, color: '#E1F5FE', iconBg: '#03A9F4' },
        { name: 'Emergency WFH', icon: '🏠', available: 1, booked: 2, color: '#E0F2F1', iconBg: '#009688' },
        { name: 'Leave Without Pay', icon: '😔', available: 0, booked: 1, color: '#FCE4EC', iconBg: '#E91E63' },
        { name: 'Sick Leave', icon: '🩹', available: 6, booked: 3, color: '#F3E5F5', iconBg: '#9C27B0' },
        { name: 'Special Leave', icon: '✨', available: 0, booked: 0, color: '#E8F5E8', iconBg: '#4CAF50' }
      ],
      totalBooked: 20,
      totalAbsent: 2,
      holidays: [
        { date: '15 Aug 2023, Tue', name: 'Independence Day', nameEn: 'Independence Day' },
        { date: '02 Oct 2023, Mon', name: 'Gandhi Jayanti', nameEn: 'Gandhi Jayanti' },
        { date: '12 Oct 2023, Thu', name: 'Dussehra', nameEn: 'Dussehra' }
      ]
    },
    2024: {
      leaveTypes: [
        { name: 'Casual Leave', icon: '🏖️', available: 4, booked: 5, color: '#E3F2FD', iconBg: '#2196F3' },
        { name: 'WFH Leave', icon: '💻', available: 1, booked: 2, color: '#FFF3E0', iconBg: '#FF9800' },
        { name: 'Compensatory Off', icon: '😊', available: 1, booked: 6, color: '#E8F5E8', iconBg: '#4CAF50' },
        { name: 'Earned Leave', icon: '👑', available: 2, booked: 1, color: '#E1F5FE', iconBg: '#03A9F4' },
        { name: 'Emergency WFH', icon: '🏠', available: 0, booked: 1, color: '#E0F2F1', iconBg: '#009688' },
        { name: 'Leave Without Pay', icon: '😔', available: 0, booked: 2, color: '#FCE4EC', iconBg: '#E91E63' },
        { name: 'Sick Leave', icon: '🩹', available: 7, booked: 2, color: '#F3E5F5', iconBg: '#9C27B0' },
        { name: 'Special Leave', icon: '✨', available: 1, booked: 0, color: '#E8F5E8', iconBg: '#4CAF50' }
      ],
      totalBooked: 19,
      totalAbsent: 1,
      holidays: [
        { date: '26 Jan 2024, Fri', name: 'Republic Day', nameEn: 'Republic Day' },
        { date: '15 Aug 2024, Thu', name: 'Independence Day', nameEn: 'Independence Day' },
        { date: '02 Oct 2024, Wed', name: 'Gandhi Jayanti', nameEn: 'Gandhi Jayanti' },
        { date: '31 Oct 2024, Thu', name: 'Diwali', nameEn: 'Diwali' }
      ]
    },
    2025: {
      leaveTypes: [
        { name: 'Casual Leave', icon: '🏖️', available: 5, booked: 4, color: '#E3F2FD', iconBg: '#2196F3' },
        { name: 'WFH Leave', icon: '💻', available: 2, booked: 1, color: '#FFF3E0', iconBg: '#FF9800' },
        { name: 'Compensatory Off', icon: '😊', available: 3, booked: 4, color: '#E8F5E8', iconBg: '#4CAF50' },
        { name: 'Earned Leave', icon: '👑', available: 0, booked: 0, color: '#E1F5FE', iconBg: '#03A9F4' },
        { name: 'Emergency WFH', icon: '🏠', available: 0, booked: 0, color: '#E0F2F1', iconBg: '#009688' },
        { name: 'Leave Without Pay', icon: '😔', available: 0, booked: 0, color: '#FCE4EC', iconBg: '#E91E63' },
        { name: 'Sick Leave', icon: '🩹', available: 8, booked: 1, color: '#F3E5F5', iconBg: '#9C27B0' },
        { name: 'Special Leave', icon: '✨', available: 0, booked: 0, color: '#E8F5E8', iconBg: '#4CAF50' }
      ],
      totalBooked: 9,
      totalAbsent: 0,
      holidays: [
        { date: '05 Sep 2025, Fri', name: 'Thiruvonam', nameEn: 'Thiruvonam' },
        { date: '06 Sep 2025, Sat', name: 'Third Onam', nameEn: 'Third Onam' },
        { date: '01 Oct 2025, Wed', name: 'Mahanavami', nameEn: 'Mahanavami' },
        { date: '02 Oct 2025, Thu', name: 'Gandhijayanti/Vijayadashami', nameEn: 'Gandhijayanti/Vijayadashami' }
      ]
    },
    2026: {
      leaveTypes: [
        { name: 'Casual Leave', icon: '🏥', available: 9, booked: 0, color: '#E3F2FD', iconBg: '#2196F3' },
        { name: 'WFH Leave', icon: '💻', available: 5, booked: 0, color: '#FFF3E0', iconBg: '#FF9800' },
        { name: 'Compensatory Off', icon: '📌', available: 8, booked: 0, color: '#E8F5E8', iconBg: '#4CAF50' },
        { name: 'Earned Leave', icon: '💶', available: 10, booked: 0, color: '#E1F5FE', iconBg: '#03A9F4' },
        { name: 'Emergency WFH', icon: '💊', available: 5, booked: 0, color: '#E0F2F1', iconBg: '#009688' },
        { name: 'Leave Without Pay', icon: '⛑', available: 0, booked: 0, color: '#FCE4EC', iconBg: '#E91E63' },
        { name: 'Sick Leave', icon: '🩹', available: 12, booked: 0, color: '#F3E5F5', iconBg: '#9C27B0' },
        { name: 'Special Leave', icon: '💉', available: 2, booked: 0, color: '#E8F5E8', iconBg: '#4CAF50' }
      ],
      totalBooked: 0,
      totalAbsent: 0,
      holidays: [
        { date: '26 Jan 2026, Mon', name: 'Republic Day', nameEn: 'Republic Day' },
        { date: '15 Aug 2026, Sat', name: 'Independence Day', nameEn: 'Independence Day' },
        { date: '02 Oct 2026, Fri', name: 'Gandhi Jayanti', nameEn: 'Gandhi Jayanti' },
        { date: '20 Oct 2026, Tue', name: 'Karva Chauth', nameEn: 'Karva Chauth' }
      ]
    }
  };

  // Update data when year changes
  useEffect(() => {
    const currentYearData = yearlyData[selectedYear] || yearlyData[2025];
    setLeaveData(currentYearData.leaveTypes);
    setHolidayData(currentYearData.holidays);
    setTotalBooked(currentYearData.totalBooked);
    setTotalAbsent(currentYearData.totalAbsent);
  }, [selectedYear]);

  const handlePreviousYear = () => {
    setSelectedYear(prev => Math.max(prev - 1, 2023));
  };

  const handleNextYear = () => {
    setSelectedYear(prev => Math.min(prev + 1, 2026));
  };

  const getDateRange = (year) => {
    return `01 Jan ${year} - 31 Dec ${year}`;
  };

  // Scroll handler for card navigation
  const scrollCards = (direction) => {
    const container = document.querySelector('.leave-cards-container');
    if (container) {
      container.scrollBy({
        left: direction === 'left' ? -300 : 300,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '14px', color: '#666' }}>
            Leave booked this year: {totalBooked} day(s) | Absent: {totalAbsent}
          </span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Year selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button 
              style={{ 
                padding: '4px', 
                border: 'none', 
                backgroundColor: 'transparent', 
                cursor: 'pointer',
                borderRadius: '4px',
                opacity: selectedYear <= 2023 ? 0.5 : 1
              }}
              onClick={handlePreviousYear}
              disabled={selectedYear <= 2023}
            >
              <ChevronLeft size={20} color="#666" />
            </button>
            <span style={{ fontSize: '14px', color: '#333', minWidth: '200px', textAlign: 'center' }}>
              {getDateRange(selectedYear)}
            </span>
            <button 
              style={{ 
                padding: '4px', 
                border: 'none', 
                backgroundColor: 'transparent', 
                cursor: 'pointer',
                borderRadius: '4px',
                opacity: selectedYear >= 2026 ? 0.5 : 1
              }}
              onClick={handleNextYear}
              disabled={selectedYear >= 2026}
            >
              <ChevronRight size={20} color="#666" />
            </button>
          </div>
          
          {/* View toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <button 
              style={{ 
                padding: '8px', 
                border: 'none', 
                backgroundColor: viewMode === 'cards' ? '#e3f2fd' : 'transparent',
                cursor: 'pointer',
                borderRadius: '6px'
              }}
              onClick={() => setViewMode('cards')}
            >
              <Grid size={20} color="#666" />
            </button>
            <button 
              style={{ 
                padding: '8px', 
                border: 'none', 
                backgroundColor: viewMode === 'table' ? '#e3f2fd' : 'transparent',
                cursor: 'pointer',
                borderRadius: '6px'
              }}
              onClick={() => setViewMode('table')}
            >
              <List size={20} color="#666" />
            </button>
          </div>
          
          {/* Apply Leave */}
          <button 
            style={{ 
              backgroundColor: '#1976d2',
              color: 'white',
              border: 'none',
              padding: '8px 24px',
              borderRadius: '6px',
              fontSize: '14px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            Apply Leave
          </button>
          
          <button style={{ 
            padding: '8px', 
            border: 'none', 
            backgroundColor: 'transparent', 
            cursor: 'pointer',
            borderRadius: '4px'
          }}>
            <MoreHorizontal size={20} color="#666" />
          </button>
        </div>
      </div>

      {/* Leave Cards with Previous/Next buttons on both sides */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '32px'
      }}>
        {/* Previous Button */}
        <button
          style={{
            padding: '8px',
            border: 'none',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            borderRadius: '4px'
          }}
          onClick={() => scrollCards('left')}
        >
          <ChevronLeft size={24} color="#666" />
        </button>

        {/* Cards Container */}
        <div
          className="leave-cards-container"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '16px',
            marginBottom: '32px',
            maxWidth: '100%',
            overflowX: 'auto',
            scrollBehavior: 'smooth'
          }}
        >
          {leaveData.length > 0 && leaveData.map((leave, index) => (
            <div
              key={index}
              style={{
                height: '180px',
                backgroundColor: leave.color,
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                transition: 'transform 0.2s ease',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: leave.iconBg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    color: 'white'
                  }}
                >
                  {leave.icon}
                </div>
              </div>

              <div style={{
                textAlign: 'center',
                fontWeight: '500',
                marginBottom: '16px',
                fontSize: '14px',
                lineHeight: '1.2',
                color: '#333'
              }}>
                {leave.name}
              </div>

              <div style={{ marginTop: 'auto', textAlign: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', color: '#666' }}>Available</span>
                  <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>{leave.available}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', color: '#666' }}>Booked</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>{leave.booked}</span>
                    {leave.booked > 0 && (
                      <div
                        style={{
                          width: '16px',
                          height: '16px',
                          borderRadius: '50%',
                          backgroundColor: '#ff9800',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '10px',
                          color: 'white',
                          fontWeight: 'bold'
                        }}
                      >
                        !
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Next Button */}
        <button
          style={{
            padding: '8px',
            border: 'none',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            borderRadius: '4px'
          }}
          onClick={() => scrollCards('right')}
        >
          <ChevronRight size={24} color="#666" />
        </button>
      </div>

      {/* Upcoming Holidays */}
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        padding: '24px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
          <select 
            style={{
              border: 'none',
              backgroundColor: 'transparent',
              fontSize: '16px',
              fontWeight: '500',
              color: '#333',
              cursor: 'pointer',
              outline: 'none'
            }}
            defaultValue="upcoming-holidays"
          >
            <option value="upcoming-holidays">
              {selectedYear < 2025 ? `Holidays ${selectedYear}` : selectedYear === 2025 ? 'Upcoming Holidays' : `Holidays ${selectedYear}`}
            </option>
          </select>
        </div>
        
        <div>
          {holidayData.map((holiday, index) => (
            <div key={index}>
              <div style={{ display: 'flex', alignItems: 'center', padding: '16px 0' }}>
                <Calendar size={20} color="#666" style={{ marginRight: '16px' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '14px', color: '#666' }}>
                    {holiday.date}
                  </div>
                </div>
                <div style={{ flex: 2, textAlign: 'center' }}>
                  <div style={{ fontSize: '14px', fontWeight: '500', color: '#333' }}>
                    {holiday.name}
                  </div>
                </div>
                <div style={{ flex: 2, textAlign: 'right' }}>
                  <div style={{ fontSize: '14px', color: '#666' }}>
                    {holiday.nameEn}
                  </div>
                </div>
              </div>
              {index < holidayData.length - 1 && (
                <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: 0, opacity: 0.3 }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaveDashboardContent;


// import React, { useState, useRef, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   Divider,
//   Stack,
//   Paper,
//   IconButton,
//   useMediaQuery,
//   useTheme,
// } from "@mui/material";
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
// import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
// import ArrowRightIcon from "@mui/icons-material/ArrowRight";
// import TimerIcon from "@mui/icons-material/Timer";
// import BeachAccessIcon from "@mui/icons-material/BeachAccess";
// import HealingIcon from "@mui/icons-material/Healing";
// import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
// import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
// import BlockIcon from "@mui/icons-material/Block";
// import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
// import { DataGrid } from "@mui/x-data-grid";

// // Mock data here...

// // iconMap here...

// // getLeaveSummaryByYear and getHolidayListByYear here...

// const LeaveSummaryCard = ({ type, cardWidth }) => {
//   const { icon, color } = iconMap[type.leaveType] || {
//     icon: <CalendarMonthIcon sx={{ color: "white", fontSize: 28 }} />,
//     color: "#616161",
//   };

//   return (
//     <Paper
//       elevation={3}
//       sx={{
//         p: 2,
//         width: cardWidth,
//         flexShrink: 0,
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         borderRadius: 2,
//         boxSizing: "border-box",
//         minHeight: 200,
//       }}
//     >
//       <Typography
//         variant="h6"
//         fontWeight={600}
//         sx={{ mb: 2, textAlign: "center", textTransform: "capitalize" }}
//       >
//         {type.leaveType}
//       </Typography>
//       <Box
//         sx={{
//           mb: 3,
//           backgroundColor: color,
//           borderRadius: "50%",
//           width: 72,
//           height: 72,
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         {icon}
//       </Box>

//       <Stack sx={{ width: "100%" }} spacing={1}>
//         <Box
//           display="flex"
//           justifyContent="space-between"
//           alignItems="center"
//           sx={{ mb: 1 }}
//         >
//           <Typography variant="body2" color="textSecondary">
//             Available
//           </Typography>
//           <Typography variant="subtitle1" fontWeight="bold" color={color}>
//             {type.available}
//           </Typography>
//         </Box>
//         <Box display="flex" justifyContent="space-between" alignItems="center">
//           <Typography variant="body2" color="textSecondary">
//             Booked
//           </Typography>
//           <Box display="flex" alignItems="center" gap={0.5} ml={1}>
//             <Typography variant="subtitle1" fontWeight="bold" color="textPrimary">
//               {type.booked}
//             </Typography>
//             {type.booked > 0 && (
//               <TimerIcon fontSize="small" color="warning" sx={{ ml: 0.5 }} />
//             )}
//           </Box>
//         </Box>
//       </Stack>
//     </Paper>
//   );
// };

// const LeaveDashboard = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const currentYear = new Date().getFullYear();
//   const yearsAll = [...new Set(LeaveSummaryData.map((item) => item.year))].sort(
//     (a, b) => a - b
//   );

//   const [selectedYear, setSelectedYear] = useState(
//     yearsAll.includes(currentYear) ? currentYear : yearsAll[0]
//   );

//   const summary = getLeaveSummaryByYear(selectedYear);
//   const holidays = getHolidayListByYear(selectedYear);

//   const totalBookedDays = summary.reduce((total, lt) => total + (lt.booked || 0), 0);

//   const scrollRef = useRef(null);
//   const scrollAmount = 320;

//   const [canScrollLeft, setCanScrollLeft] = useState(false);
//   const [canScrollRight, setCanScrollRight] = useState(false);

//   useEffect(() => {
//     const container = scrollRef.current;
//     if (!container) return;

//     const updateScroll = () => {
//       setCanScrollLeft(container.scrollLeft > 0);
//       setCanScrollRight(
//         Math.ceil(container.scrollLeft + container.clientWidth) < container.scrollWidth
//       );
//     };

//     updateScroll();

//     container.addEventListener("scroll", updateScroll);
//     window.addEventListener("resize", updateScroll);

//     return () => {
//       container.removeEventListener("scroll", updateScroll);
//       window.removeEventListener("resize", updateScroll);
//     };
//   }, [summary]);

//   const handlePrevYear = () => {
//     const currentIndex = yearsAll.indexOf(selectedYear);
//     if (currentIndex > 0) setSelectedYear(yearsAll[currentIndex - 1]);
//   };

//   const handleNextYear = () => {
//     const currentIndex = yearsAll.indexOf(selectedYear);
//     if (currentIndex < yearsAll.length - 1)
//       setSelectedYear(yearsAll[currentIndex + 1]);
//   };

//   const scrollLeft = () => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
//     }
//   };

//   const scrollRight = () => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
//     }
//   };

//   const cardWidth = isMobile ? "80%" : 280;

//   const holidayColumns = [
//     {
//       field: "date",
//       headerName: "Date",
//       minWidth: 160,
//       flex: 1,
//       renderCell: (params) => (
//         <Typography fontWeight={500}>
//           {new Date(params.value).toLocaleDateString(undefined, {
//             day: "2-digit",
//             month: "short",
//             year: "numeric",
//             weekday: "short",
//           })}
//         </Typography>
//       ),
//     },
//     {
//       field: "holidayName",
//       headerName: "Holiday",
//       minWidth: 220,
//       flex: 2,
//       renderCell: (params) => (
//         <Box display="flex" alignItems="center">
//           <CalendarMonthIcon sx={{ mr: 1, color: "primary.main" }} />
//           <Typography>{params.value}</Typography>
//         </Box>
//       ),
//     },
//   ];

//   return (
//     <Box sx={{ p: 2, maxWidth: "100%", margin: "auto", minHeight: "100vh", background: "#edf0f5" }}>
//       {/* Top bar */}
//       <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         flexWrap="wrap"
//         gap={2}
//         mb={3}
//       >
//         <Stack direction="row" spacing={2} alignItems="center">
//           <Typography variant="body2" color="textSecondary">
//             Leave booked this year: <b>{totalBookedDays} day(s)</b>
//           </Typography>
//           <Divider orientation="vertical" flexItem />
//           <Typography variant="body2" color="textSecondary">
//             Absent: <b>0</b>
//           </Typography>
//         </Stack>

//         <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
//           <Paper elevation={1} sx={{ display: "flex", alignItems: "center", gap: 1, px: 1, py: 0.5, borderRadius: 2 }}>
//             <IconButton size="small" onClick={handlePrevYear} disabled={yearsAll.indexOf(selectedYear) === 0} aria-label="previous year">
//               <ArrowLeftIcon />
//             </IconButton>
//             <CalendarMonthIcon fontSize="medium" color="primary" />
//             <Typography variant="subtitle1" fontWeight={600} sx={{ minWidth: 50, textAlign: "center" }}>
//               {selectedYear}
//             </Typography>
//             <IconButton size="small" onClick={handleNextYear} disabled={yearsAll.indexOf(selectedYear) === yearsAll.length - 1} aria-label="next year">
//               <ArrowRightIcon />
//             </IconButton>
//           </Paper>
//           <Typography variant="body2" color="textSecondary" sx={{ whiteSpace: "nowrap" }}>
//             01-Jan-{selectedYear} - 31-Dec-{selectedYear}
//           </Typography>
//         </Box>
//       </Box>

//       {/* Scrollable summary cards */}
//       <Box sx={{ position: "relative", mb: 3 }}>
//         <Box sx={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)" }}>
//           <IconButton onClick={scrollLeft} disabled={!canScrollLeft}>
//             <ArrowLeftIcon />
//           </IconButton>
//         </Box>

//         <Box
//           ref={scrollRef}
//           sx={{
//             display: "flex",
//             overflowX: "auto",
//             scrollBehavior: "smooth",
//             gap: 2,
//             pb: 1,
//             mx: 4,
//             scrollbarWidth: "none",
//             "&::-webkit-scrollbar": { display: "none" },
//           }}
//         >
//           {summary.map((type, index) => (
//             <LeaveSummaryCard key={`${type.leaveType}-${index}`} type={type} cardWidth={cardWidth} />
//           ))}
//         </Box>

//         <Box sx={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)" }}>
//           <IconButton onClick={scrollRight} disabled={!canScrollRight}>
//             <ArrowRightIcon />
//           </IconButton>
//         </Box>
//       </Box>

//       {/* Holidays table */}
//       <Paper elevation={0} sx={{ p: 2 }}>
//         <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
//           {selectedYear < 2025 ? `Holidays ${selectedYear}` : selectedYear === 2025 ? 'Upcoming Holidays' : `Holidays ${selectedYear}`}
//         </Typography>

//         <Box sx={{ width: "100%" }}>
//           <DataGrid
//             rows={holidays.map((row, idx) => ({ id: idx, ...row }))}
//             columns={holidayColumns}
//             hideFooter
//             disableColumnMenu
//             autoHeight
//             sx={{
//               backgroundColor: "#fff",
//               "& .MuiDataGrid-cell": { alignItems: "center" },
//               borderRadius: 1,
//             }}
//           />
//         </Box>
//       </Paper>
//     </Box>
//   );
// };

// export default LeaveDashboard;
