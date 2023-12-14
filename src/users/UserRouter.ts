import express from "express";
import { UserController } from "./UserController";

const router = express.Router();
router.post("/api/users", UserController.createUser);
router.get("/api/users", UserController.getUsers);
router.get("/api/users/:userId", UserController.getSingleUser);
router.put("/api/users/:userId", UserController.UpdateAUser);
router.get("/api/users/:userId/orders", UserController.getUserOrders);
router.put("/api/users/:userId/orders", UserController.UpdateOrders);
router.delete("/api/users/:userId", UserController.deleteUser);

export const UserRoutes = router;
