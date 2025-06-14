import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';

// Route imports
import projectRoutes from "./routes/projectRoutes.ts"
import taskRoutes from "./routes/taskRoutes.ts"

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

const port = process.env.PORT || 8000;

app.listen(port, ()=>{
    console.log(`server running on port ${port}`)
})