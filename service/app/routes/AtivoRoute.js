import express from "express";
import { pegaAtivos } from "../controllers/AtivoController.js";

const AtivoRouter = express.Router();

AtivoRouter.post("/", pegaAtivos);

export default AtivoRouter;