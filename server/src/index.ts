import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';

// Route imports
import projectRoutes from "./routes/projectRoutes.ts"
import taskRoutes from "./routes/taskRoutes.ts"
import searchRoutes from "./routes/searchRoutes.ts"
import userRoutes from "./routes/userRoutes.ts";
import teamRoutes from "./routes/teamRoutes.ts"

// configuration
dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}))
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());


app.get("/", (req, res)=>{
    res.send("this is home route")
});

app.use("/projects", projectRoutes);
app.use("/tasks", taskRoutes);
app.use("/search", searchRoutes);
app.use("/users", userRoutes)
app.use("/teams", teamRoutes)

const port = Number(process.env.PORT) || 8000;

app.listen(port, "0.0.0.0", ()=>{
    console.log(`server running on port ${port}`)
})