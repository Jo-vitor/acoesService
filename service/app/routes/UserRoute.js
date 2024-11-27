import express from "express";
import { cadastro, login, rentabilidadeCarteira } from "../controllers/UserController.js";
import { validacaoToken } from "../auth/auth.js";

const UserRouter = express.Router();

UserRouter.post("/cadastro", cadastro);
UserRouter.post("/login", login);
UserRouter.post("/rentabilidade", validacaoToken, rentabilidadeCarteira);

export default UserRouter;
