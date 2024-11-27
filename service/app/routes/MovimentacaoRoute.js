import express from "express";
import { movimentacao, movimentacaoExtrato, registraDividendo } from "../controllers/MovimentacaoController.js";

const MovimentacaoRouter = express.Router();

MovimentacaoRouter.post("/", movimentacao);
MovimentacaoRouter.post("/extrato", movimentacaoExtrato);
MovimentacaoRouter.post("/dividendo", registraDividendo);

export default MovimentacaoRouter;