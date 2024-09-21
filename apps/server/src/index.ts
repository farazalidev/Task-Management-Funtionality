import express, { Router } from "express";
import bodyParser from "body-parser";
import connectDb from "./config/db/connection";
import dotenv from "dotenv";
import { AuthRoutes } from "./routes/auth";
import cors from "cors";
import { WorkspaceRoutes } from "./routes/workspace";
dotenv.config();

const PORT = process.env.PORT || 8081;
const app = express();

const mainRouter = Router();
mainRouter.use("/api", [AuthRoutes, WorkspaceRoutes]);

app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(mainRouter);

const main = async () => {
  console.log("conneting db...");
  connectDb()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`server is listening on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.log(
        `failed to start application because database failed to connect... err:${err}`,
      );
    });
};

main();
