import express from "express";
import dotenv from "dotenv";
// import "./schedulers/scheduler1.js";
// import "./schedulers/scheduler2.js";
import "./schedulers/scheduler3.js";

const app = express();

app.use(express.json());

app.listen(8800, () => console.log("Server running!"));
