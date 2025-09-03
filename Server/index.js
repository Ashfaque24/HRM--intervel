import express from "express";
import cors from 'cors'
import { adminRouter } from "./Routes/AdminRoutes.js";
import adminFunctions from "./Routes/admin.js";
import attendanceRouter from "./Routes/attentence.js";

const app = express();
app.use(cors({
    origin:["http://localhost:5173","http://localhost:5174"],
    methods:['GET','POST', 'PUT'],
    credentials: true
}))
app.use(express.json())
app.use('/auth', adminRouter)
app.use('/admin', adminFunctions)
app.use("/api/attendance", attendanceRouter);

app.listen(3000, () => {
  console.log("Server is running");
});