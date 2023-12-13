import express from "express";
import { UserController } from "./UserController";

const router = express.Router();
router.post("/api/users", UserController.createUser);
router.get("/api/users", UserController.getUsers);
router.get("/api/users/:userId", UserController.getSingleUser);

export const UserRoutes = router;
