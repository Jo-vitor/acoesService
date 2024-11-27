import express, {json} from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./app/config/database.js";
import { validacaoToken } from "./app/auth/auth.js";
import UserRouter from "./app/routes/UserRoute.js";
import TransacaoRouter from "./app/routes/TransacaoRoute.js";
import MovimentacaoRouter from "./app/routes/MovimentacaoRoute.js";
import AtivoRouter from "./app/routes/AtivoRoute.js";
dotenv.config();

const app = express()
app.use(cors());
app.use(json());

app.use('/cliente', UserRouter);

app.use('/transacao', validacaoToken, TransacaoRouter);
app.use('/movimentacao', validacaoToken, MovimentacaoRouter);
app.use('/ativo', validacaoToken, AtivoRouter);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync({ force: true });
    console.log("All models were synchronized successfully.");
    
    app.listen(5000, "0.0.0.0", () => {
      console.log(`Server is up and running on port 5000`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
