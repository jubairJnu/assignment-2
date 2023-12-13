import express from "express";
import { UserController } from "./UserController";

const router = express.Router();
router.post("/api/users", UserController.createUser);

export const UserRoutes = router;
