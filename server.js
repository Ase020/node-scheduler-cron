import express from "express";
import dotenv from "dotenv";

const app = express();

app.use(express.json());

app.listen(8800, () => console.log("Server running!"));
