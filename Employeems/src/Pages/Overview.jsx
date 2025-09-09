
// import React, { useState, useEffect } from "react";

// const Overview = () => {
//   // Timer states
//   const [isCheckedIn, setIsCheckedIn] = useState(false);
//   const [totalElapsedTime, setTotalElapsedTime] = useState(0); // Total time in seconds
//   const [checkInTime, setCheckInTime] = useState(null);
//   const [displayTime, setDisplayTime] = useState("00 : 00 : 00");
//   const [sessions, setSessions] = useState([]); // Track all check-in/out sessions

//   // Update display time every second when checked in
//   useEffect(() => {
//     let interval;
    
//     if (isCheckedIn && checkInTime) {
//       interval = setInterval(() => {
//         const now = Date.now();
//         const currentSessionTime = Math.floor((now - checkInTime) / 1000);
//         const totalTime = totalElapsedTime + currentSessionTime;
        
//         const hours = Math.floor(totalTime / 3600);
//         const minutes = Math.floor((totalTime % 3600) / 60);
//         const seconds = totalTime % 60;
        
//         setDisplayTime(
//           `${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`
//         );
//       }, 1000);
//     } else {
//       // When not checked in, show the accumulated time
//       const hours = Math.floor(totalElapsedTime / 3600);
//       const minutes = Math.floor((totalElapsedTime % 3600) / 60);
//       const seconds = totalElapsedTime % 60;
      
//       setDisplayTime(
//         `${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`
//       );
//     }

//     return () => {
//       if (interval) clearInterval(interval);
//     };
//   }, [isCheckedIn, checkInTime, totalElapsedTime]);

//   const handleCheckIn = () => {
//     const now = Date.now();
//     setCheckInTime(now);
//     setIsCheckedIn(true);
    
//     console.log(`Checked in at: ${new Date(now).toLocaleTimeString()}`);
//   };

//   const handleCheckOut = () => {
//     if (checkInTime) {
//       const now = Date.now();
//       const sessionTime = Math.floor((now - checkInTime) / 1000);
//       const newTotalTime = totalElapsedTime + sessionTime;
      
//       // Add this session to history
//       setSessions(prev => [...prev, {
//         checkIn: checkInTime,
//         checkOut: now,
//         duration: sessionTime
//       }]);
      
//       setTotalElapsedTime(newTotalTime);
//       setCheckInTime(null);
//       setIsCheckedIn(false);
      
//       console.log(`Checked out at: ${new Date(now).toLocaleTimeString()}`);
//       console.log(`Session duration: ${Math.floor(sessionTime / 3600)}h ${Math.floor((sessionTime % 3600) / 60)}m ${sessionTime % 60}s`);
//       console.log(`Total time today: ${Math.floor(newTotalTime / 3600)}h ${Math.floor((newTotalTime % 3600) / 60)}m ${newTotalTime % 60}s`);
//     }
//   };

//   const resetTimer = () => {
//     setTotalElapsedTime(0);
//     setCheckInTime(null);
//     setIsCheckedIn(false);
//     setSessions([]);
//     setDisplayTime("00 : 00 : 00");
    
//     // Clear localStorage
//     localStorage.removeItem('totalElapsedTime');
//     localStorage.removeItem('checkInTime');
//     localStorage.removeItem('isCheckedIn');
//     localStorage.removeItem('sessions');
//   };

//   const styles = {
//     container: {
//       display: 'flex',
//       gap: '16px',
//       padding: '16px',
//       backgroundColor: '#f4f7fa',
//       minHeight: '100vh',
//       fontFamily: 'system-ui, -apple-system, sans-serif'
//     },
//     profileCard: {
//       width: '300px',
//       borderRadius: '12px',
//       padding: '24px',
//       backgroundColor: 'white',
//       boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
//       height: 'fit-content'
//     },
//     profileContainer: {
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center'
//     },
//     avatar: {
//       width: '80px',
//       height: '80px',
//       borderRadius: '50%',
//       marginBottom: '8px',
//       objectFit: 'cover'
//     },
//     name: {
//       fontSize: '20px',
//       fontWeight: '600',
//       margin: '0 0 4px 0',
//       color: '#1a1a1a'
//     },
//     role: {
//       fontSize: '14px',
//       color: '#666',
//       margin: '0'
//     },
//     status: {
//       fontSize: '14px',
//       fontWeight: '600',
//       margin: '8px 0 0 0'
//     },
//     timer: {
//       fontSize: '36px',
//       fontWeight: '600',
//       margin: '16px 0',
//       fontFamily: 'monospace',
//       color: '#1a1a1a'
//     },
//     buttonContainer: {
//       display: 'flex',
//       gap: '8px',
//       flexDirection: 'column',
//       width: '100%'
//     },
//     button: {
//       padding: '8px 16px',
//       border: 'none',
//       borderRadius: '6px',
//       fontSize: '14px',
//       fontWeight: '500',
//       cursor: 'pointer',
//       transition: 'all 0.2s ease'
//     },
//     checkOutButton: {
//       backgroundColor: '#dc2626',
//       color: 'white'
//     },
//     checkInButton: {
//       backgroundColor: '#16a34a',
//       color: 'white'
//     },
//     resetButton: {
//       backgroundColor: 'white',
//       color: '#666',
//       border: '1px solid #ddd',
//       marginTop: '8px'
//     },
//     divider: {
//       height: '1px',
//       backgroundColor: '#eee',
//       margin: '16px 0',
//       border: 'none'
//     },
//     reportingSection: {
//       textAlign: 'left'
//     },
//     rightContainer: {
//       flexGrow: 1,
//       display: 'flex',
//       flexDirection: 'column',
//       gap: '16px'
//     },
//     card: {
//       backgroundColor: 'white',
//       borderRadius: '8px',
//       padding: '16px',
//       boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
//     },
//     greetingCard: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center'
//     },
//     greetingText: {
//       fontSize: '20px',
//       fontWeight: '600',
//       margin: '0 0 4px 0'
//     },
//     greetingSubtext: {
//       fontSize: '14px',
//       color: '#666',
//       margin: '0'
//     },
//     leafImage: {
//       width: '60px',
//       height: '60px'
//     },
//     scheduleCard: {
//       padding: '24px'
//     },
//     scheduleTitle: {
//       fontSize: '20px',
//       fontWeight: '600',
//       margin: '0 0 8px 0'
//     },
//     scheduleDates: {
//       fontSize: '14px',
//       color: '#666',
//       margin: '0 0 16px 0'
//     },
//     scheduleBox: {
//       backgroundColor: '#eef6ff',
//       padding: '16px',
//       borderRadius: '8px'
//     },
//     scheduleHeader: {
//       fontSize: '14px',
//       marginBottom: '8px'
//     },
//     dayGrid: {
//       display: 'grid',
//       gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
//       gap: '16px'
//     },
//     dayItem: {
//       textAlign: 'center'
//     },
//     dayDate: {
//       fontSize: '14px',
//       margin: '0 0 2px 0',
//       fontWeight: '500'
//     },
//     dayStatus: {
//       fontSize: '12px',
//       margin: '0'
//     },
//     activityCard: {
//       padding: '24px'
//     },
//     activityTitle: {
//       fontSize: '20px',
//       fontWeight: '600',
//       margin: '0 0 16px 0'
//     },
//     activityItem: {
//       fontSize: '14px',
//       color: '#666',
//       margin: '4px 0'
//     }
//   };

//   return (
//     <div style={styles.container}>
//       {/* LEFT: Profile Card */}
//       <div style={styles.profileCard}>
//         <div style={styles.profileContainer}>
//           {/* Profile image */}
//           <img 
//             src="/Images/profile.jpg" 
//             alt="Profile"
//             style={styles.avatar}
//             onError={(e) => {
//               e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNDAiIGZpbGw9IiNFNUU3RUIiLz4KPGNpcmNsZSBjeD0iNDAiIGN5PSIzMiIgcj0iMTIiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTIwIDYwQzIwIDUyLjI2ODQgMjYuMjY4NCA0NiAzNCA0Nkg0NkM1My43MzE2IDQ2IDYwIDUyLjI2ODQgNjAgNjBWNjhIMjBWNjBaIiBmaWxsPSIjOUNBM0FGIi8+Cjwvc3ZnPgo=';
//             }}
//           />
//           <h2 style={styles.name}>ASHFAQ K</h2>
//           <p style={styles.role}>MERN Stack Developer Intern</p>
//           <p style={{
//             ...styles.status,
//             color: isCheckedIn ? '#16a34a' : '#ea580c'
//           }}>
//             {isCheckedIn ? "Remote In" : "Checked Out"}
//           </p>
//           <div style={styles.timer}>
//             {displayTime}
//           </div>
          
//           <div style={styles.buttonContainer}>
//             {isCheckedIn ? (
//               <button 
//                 style={{
//                   ...styles.button,
//                   ...styles.checkOutButton
//                 }}
//                 onClick={handleCheckOut}
//                 onMouseOver={(e) => e.target.style.backgroundColor = '#b91c1c'}
//                 onMouseOut={(e) => e.target.style.backgroundColor = '#dc2626'}
//               >
//                 Check Out
//               </button>
//             ) : (
//               <button 
//                 style={{
//                   ...styles.button,
//                   ...styles.checkInButton
//                 }}
//                 onClick={handleCheckIn}
//                 onMouseOver={(e) => e.target.style.backgroundColor = '#15803d'}
//                 onMouseOut={(e) => e.target.style.backgroundColor = '#16a34a'}
//               >
//                 Check In
//               </button>
//             )}
            
//             {/* Reset button for testing/new day */}
//             {(totalElapsedTime > 0 || isCheckedIn) && (
//               <button 
//                 style={{
//                   ...styles.button,
//                   ...styles.resetButton
//                 }}
//                 onClick={resetTimer}
//                 onMouseOver={(e) => e.target.style.backgroundColor = '#f5f5f5'}
//                 onMouseOut={(e) => e.target.style.backgroundColor = 'white'}
//               >
//                 Reset Timer
//               </button>
//             )}
//           </div>
//         </div>

//         <hr style={styles.divider} />

//         <div style={styles.reportingSection}>
//           <p style={{ fontSize: '14px', margin: '0 0 4px 0', fontWeight: '600' }}>
//             Reporting To:
//           </p>
//           <p style={{ fontSize: '14px', color: '#666', margin: '0 0 4px 0' }}>
//             INTFE0215 - SHAHIDA P A
//           </p>
//           <p style={{ 
//             fontSize: '14px', 
//             margin: '0',
//             color: isCheckedIn ? '#16a34a' : '#dc2626'
//           }}>
//             {isCheckedIn ? "Currently checked in" : "Yet to check-in"}
//           </p>
          
//           {/* Show session history */}
//           {sessions.length > 0 && (
//             <div style={{ marginTop: '16px' }}>
//               <p style={{ fontSize: '12px', color: '#666', margin: '0' }}>
//                 Today's Sessions: {sessions.length}
//               </p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* RIGHT: Good Morning + Work Schedule */}
//       <div style={styles.rightContainer}>
//         {/* Good Morning Card */}
//         <div style={{ ...styles.card, ...styles.greetingCard }}>
//           <div>
//             <h3 style={styles.greetingText}>
//               Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 17 ? 'Afternoon' : 'Evening'} ASHFAQ K
//             </h3>
//             <p style={styles.greetingSubtext}>
//               {isCheckedIn ? "You're currently checked in. Have a productive day!" : "Ready to start your day?"}
//             </p>
//           </div>
//           {/* Leaf image placeholder */}
//           <div style={{
//             width: '60px',
//             height: '60px',
//             backgroundColor: '#22c55e',
//             borderRadius: '50%',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             fontSize: '24px'
//           }}>
//             🌿
//           </div>
//         </div>

//         {/* Work Schedule Card */}
//         <div style={{ ...styles.card, ...styles.scheduleCard }}>
//           <h3 style={styles.scheduleTitle}>Work Schedule</h3>
//           <p style={styles.scheduleDates}>
//             31-Aug-2025 – 06-Sep-2025
//           </p>
//           <div style={styles.scheduleBox}>
//             <p style={styles.scheduleHeader}>
//               <strong>Technical</strong>{" "}
//               <span style={{ color: "#1976d2" }}>10:00 AM – 7:00 PM</span>
//             </p>
//             <div style={styles.dayGrid}>
//               <div style={styles.dayItem}>
//                 <p style={{ ...styles.dayDate, color: '#888' }}>Sun 31</p>
//                 <p style={styles.dayStatus}>Weekend</p>
//               </div>
//               <div style={styles.dayItem}>
//                 <p style={{ ...styles.dayDate, color: 'green' }}>Mon 01</p>
//                 <p style={{ ...styles.dayStatus, color: 'green' }}>Remote In</p>
//               </div>
//               <div style={styles.dayItem}>
//                 <p style={{ ...styles.dayDate, color: 'red' }}>Tue 02</p>
//                 <p style={{ ...styles.dayStatus, color: 'red' }}>Absent</p>
//               </div>
//               <div style={styles.dayItem}>
//                 <p style={{ 
//                   ...styles.dayDate, 
//                   color: isCheckedIn ? 'green' : '#ea580c'
//                 }}>
//                   Wed 03
//                 </p>
//                 <p style={{ 
//                   ...styles.dayStatus, 
//                   color: isCheckedIn ? 'green' : '#ea580c'
//                 }}>
//                   {isCheckedIn ? "Remote In" : "Checked Out"}
//                 </p>
//                 <p style={styles.dayStatus}>
//                   {Math.floor(totalElapsedTime / 3600).toString().padStart(2, '0')}:
//                   {Math.floor((totalElapsedTime % 3600) / 60).toString().padStart(2, '0')} Hrs
//                 </p>
//               </div>
//               <div style={styles.dayItem}>
//                 <p style={{ ...styles.dayDate, color: '#888' }}>Thu 04</p>
//                 <p style={styles.dayStatus}>Upcoming</p>
//               </div>
//               <div style={styles.dayItem}>
//                 <p style={{ ...styles.dayDate, color: '#888' }}>Fri 05</p>
//                 <p style={styles.dayStatus}>Upcoming</p>
//               </div>
//               <div style={styles.dayItem}>
//                 <p style={{ ...styles.dayDate, color: '#888' }}>Sat 06</p>
//                 <p style={styles.dayStatus}>Weekend</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Timer Details Card */}
//         {(isCheckedIn || totalElapsedTime > 0) && (
//           <div style={{ ...styles.card, ...styles.activityCard }}>
//             <h3 style={styles.activityTitle}>Today's Activity</h3>
//             <div>
//               <p style={styles.activityItem}>
//                 Status: {isCheckedIn ? "🟢 Currently Working" : "🟠 On Break"}
//               </p>
//               <p style={styles.activityItem}>
//                 Total Time: {displayTime}
//               </p>
//               <p style={styles.activityItem}>
//                 Sessions: {sessions.length} {isCheckedIn ? "(+ current session)" : ""}
//               </p>
//               {isCheckedIn && checkInTime && (
//                 <p style={styles.activityItem}>
//                   Current Session Started: {new Date(checkInTime).toLocaleTimeString()}
//                 </p>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Overview;












import React, { useState, useEffect } from "react";

// Dummy data for reporting, department members, schedule, holidays
const reporting = {
  name: "SHAHID P A",
  id: "INTFE0215",
  status: "Yet to check-in",
};

const departmentMembers = [
  { id: "INTFE0215", name: "SHAHIDA P A", status: "Yet to check-in" },
  { id: "INTC0002", name: "INSAF P", status: "Remote In" },
];

const workSchedule = [
  { day: "Sun 31", label: "Weekend", hours: 0 },
  { day: "Mon 01", label: "Remote In", hours: 7 },
  { day: "Tue 02", label: "Absent", hours: 0 },
  { day: "Wed 03", label: "Remote In", hours: 7 },
  { day: "Thu 04", label: "Remote In", hours: 7 },
  { day: "Fri 05", label: "Absent", hours: 0 },
];

const holidays = [
  { name: "Thiruvonam", date: "5-Sep, Friday" },
  { name: "Third Onam", date: "6-Sep, Saturday" },
  { name: "Mahanavami", date: "1-Oct, Wednesday" },
];

const Overview = () => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [totalElapsedTime, setTotalElapsedTime] = useState(0);
  const [checkInTime, setCheckInTime] = useState(null);
  const [displayTime, setDisplayTime] = useState("00 : 00 : 00");
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const savedCheckIn = localStorage.getItem("checkInTime");
    const savedIsCheckedIn = localStorage.getItem("isCheckedIn") === "true";
    const savedTotalTime = parseInt(localStorage.getItem("totalElapsedTime")) || 0;
    const savedSessions = JSON.parse(localStorage.getItem("sessions")) || [];

    setTotalElapsedTime(savedTotalTime);
    setSessions(savedSessions);

    if (savedIsCheckedIn && savedCheckIn) {
      setIsCheckedIn(true);
      setCheckInTime(parseInt(savedCheckIn));
    }
  }, []);

  useEffect(() => {
    let interval;
    if (isCheckedIn && checkInTime) {
      interval = setInterval(() => {
        const now = Date.now();
        const currentSession = Math.floor((now - checkInTime) / 1000);
        updateDisplay(totalElapsedTime + currentSession);
      }, 1000);
    } else {
      updateDisplay(totalElapsedTime);
    }
    return () => interval && clearInterval(interval);
  }, [isCheckedIn, checkInTime, totalElapsedTime]);

  const updateDisplay = (timeInSec) => {
    const hours = Math.floor(timeInSec / 3600);
    const minutes = Math.floor((timeInSec % 3600) / 60);
    const seconds = timeInSec % 60;

    setDisplayTime(
      `${hours.toString().padStart(2, "0")} : ${minutes
        .toString()
        .padStart(2, "0")} : ${seconds.toString().padStart(2, "0")}`
    );
  };

  const handleCheckIn = () => {
    const now = Date.now();
    setCheckInTime(now);
    setIsCheckedIn(true);

    localStorage.setItem("checkInTime", now.toString());
    localStorage.setItem("isCheckedIn", "true");
  };

  const handleCheckOut = () => {
    if (!checkInTime) return;
    const now = Date.now();
    const sessionTime = Math.floor((now - checkInTime) / 1000);
    const updatedTotal = totalElapsedTime + sessionTime;

    const newSessions = [
      ...sessions,
      { checkIn: checkInTime, checkOut: now, duration: sessionTime },
    ];

    setSessions(newSessions);
    setTotalElapsedTime(updatedTotal);
    setCheckInTime(null);
    setIsCheckedIn(false);

    localStorage.setItem("sessions", JSON.stringify(newSessions));
    localStorage.setItem("totalElapsedTime", updatedTotal.toString());
    localStorage.setItem("isCheckedIn", "false");
    localStorage.removeItem("checkInTime");
  };

  const resetTimer = () => {
    setTotalElapsedTime(0);
    setCheckInTime(null);
    setIsCheckedIn(false);
    setSessions([]);
    setDisplayTime("00 : 00 : 00");

    localStorage.removeItem("totalElapsedTime");
    localStorage.removeItem("checkInTime");
    localStorage.removeItem("isCheckedIn");
    localStorage.removeItem("sessions");
  };

  return (
    <div style={{ display: "flex", gap: "24px", padding: "24px", backgroundColor: "#f4f7fa", minHeight: "100vh" }}>
      {/* Left Panel */}
      <div style={{ width: "300px", background: "white", borderRadius: "12px", padding: "24px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <div style={{ textAlign: "center" }}>
          <img
            src="/Images/profile.jpg"
            alt="Profile"
            style={{ width: "80px", height: "80px", borderRadius: "50%", marginBottom: "8px" }}
          />
          <h2 style={{ fontSize: "20px", fontWeight: "600", margin: "0 0 4px" }}>ASHFAQ K</h2>
          <p style={{ fontSize: "14px", color: "#666" }}>MERN Stack Developer Intern</p>
          <p style={{ fontWeight: "600", color: isCheckedIn ? "#16a34a" : "#ea580c" }}>
            {isCheckedIn ? "Remote In" : "Checked Out"}
          </p>

          <div style={{ fontSize: "36px", fontWeight: "600", margin: "16px 0", fontFamily: "monospace" }}>
            {displayTime}
          </div>

          {isCheckedIn ? (
            <button
              style={{ backgroundColor: "#dc2626", color: "white", padding: "8px", border: "none", borderRadius: "6px", width: "100%" }}
              onClick={handleCheckOut}
            >
              Check Out
            </button>
          ) : (
            <button
              style={{ backgroundColor: "#16a34a", color: "white", padding: "8px", border: "none", borderRadius: "6px", width: "100%" }}
              onClick={handleCheckIn}
            >
              Check In
            </button>
          )}

          {(totalElapsedTime > 0 || isCheckedIn) && (
            <button
              style={{ marginTop: "8px", backgroundColor: "white", color: "#666", border: "1px solid #ddd", padding: "8px", borderRadius: "6px", width: "100%" }}
              onClick={resetTimer}
            >
              Reset Timer
            </button>
          )}

          {/* Reporting */}
          <div style={{ marginTop: "24px", textAlign: "left" }}>
            <h4 style={{ fontSize: "16px", marginBottom: "8px" }}>Reporting To</h4>
            <div style={{ fontSize: "14px", color: "#333" }}>
              {reporting.id} – {reporting.name} <span style={{ color: "red" }}>{reporting.status}</span>
            </div>
          </div>

          {/* Department Members */}
          <div style={{ marginTop: "24px", textAlign: "left" }}>
            <h4 style={{ fontSize: "16px", marginBottom: "8px" }}>Department Members</h4>
            {departmentMembers.map((member) => (
              <div key={member.id} style={{ fontSize: "14px", marginBottom: "4px", color: "#333" }}>
                {member.id} – {member.name} <span style={{ color: member.status === "Remote In" ? "#16a34a" : "red" }}>{member.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div style={{ flexGrow: 1 }}>
        <div style={{ background: "white", borderRadius: "12px", padding: "24px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", marginBottom: "24px" }}>
          <h3>Good {new Date().getHours() < 12 ? "Morning" : new Date().getHours() < 17 ? "Afternoon" : "Evening"}, Ashfaq!</h3>
          <p>{isCheckedIn ? "You're currently checked in. Have a productive day!" : "Ready to start your day?"}</p>
        </div>

        {/* Work Schedule */}
        <div style={{ background: "white", borderRadius: "12px", padding: "24px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", marginBottom: "24px" }}>
          <h4 style={{ marginBottom: "16px" }}>Work Schedule</h4>
          <div style={{ display: "flex", gap: "8px", overflowX: "auto" }}>
            {workSchedule.map((entry, index) => (
              <div key={index} style={{ flex: "0 0 80px", background: "#f1f5f9", borderRadius: "8px", padding: "8px", textAlign: "center" }}>
                <div style={{ fontWeight: "600", color: "#333" }}>{entry.label}</div>
                <div style={{ fontSize: "12px", color: "#555" }}>{entry.day}</div>
                <div style={{ fontSize: "14px", color: "#000", marginTop: "4px" }}>{entry.hours} hrs</div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Holidays */}
        <div style={{ background: "white", borderRadius: "12px", padding: "24px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <h4 style={{ marginBottom: "16px" }}>Upcoming Holidays</h4>
          <div style={{ display: "flex", gap: "8px" }}>
            {holidays.map((holiday, index) => (
              <div key={index} style={{ background: "#e0f2fe", padding: "8px 12px", borderRadius: "8px", fontSize: "14px", color: "#0284c7" }}>
                <div style={{ fontWeight: "600" }}>{holiday.name}</div>
                <div>{holiday.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
