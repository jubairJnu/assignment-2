import express from "express";
import { UserController } from "./UserController";

const router = express.Router();
router.post("/api/users", UserController.createUser);
router.get("/api/users", UserController.getUsers);

export const UserRoutes = router;
