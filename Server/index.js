import express from "express";
import cors from 'cors'
import { adminRouter } from "./Routes/AdminRoutes.js";
import adminFunctions from "./Routes/admin.js";
const app = express();
app.use(cors({
    origin:["http://localhost:5173"],
    methods:['GET','POST', 'PUT'],
    credentials: true
}))
app.use(express.json())
app.use('/auth', adminRouter)
app.use('/admin', adminFunctions)

app.listen(3000, () => {
  console.log("Server is running");
});