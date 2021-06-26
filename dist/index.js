"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const dbConnection_1 = require("./config/dbConnection");
const server_1 = require("./config/server");
const exampleRoute = require("./model/Example/example.route");
// Config dotenv
dotenv_1.config();
// Application
const app = express_1.default();
// Middlewars
app.use(express_1.default.json());
app.use(cors_1.default());
// Routes
app.use("/example", exampleRoute);
// DB Connection
dbConnection_1.openConnection();
server_1.runServer(app);
