import express from "express";
import { extrato, transacao } from "../controllers/TransacaoController.js";

const TransacaoRouter = express.Router();

TransacaoRouter.post("/", transacao);
TransacaoRouter.post("/extrato", extrato);

export default TransacaoRouter;