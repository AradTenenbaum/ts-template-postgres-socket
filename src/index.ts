import { config } from "dotenv";
import cors from "cors";
import express, { Application } from "express";
import { openConnection } from "./config/dbConnection";
import {runServer} from './config/server';

const exampleRoute = require("./model/Example/example.route");

// Config dotenv
config();

// Application
const app = express();

// Middlewars
app.use(express.json());
app.use(cors());

// Routes
app.use("/example", exampleRoute);

// DB Connection
openConnection();
runServer(app);