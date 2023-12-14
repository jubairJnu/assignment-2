import express, { Application, Request, Response } from "express";
import cors from "cors";
import { UserRoutes } from "./users/UserRouter";
const app: Application = express();

//parser
app.use(express.json());
app.use(cors());

app.use("/api/v1", UserRoutes);

app.get("/api/v1", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
