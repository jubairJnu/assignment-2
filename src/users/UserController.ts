import { Request, Response } from "express";
import { UserService } from "./UserService";

const createUser = async (req: Request, res: Response) => {
  try {
    const { users: userData } = req.body;
    const result = await UserService.createUserIntoDB(userData);
    res.status(200).json({
      success: true,
      message: "User created successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went Wrong!",
      error: error,
    });
  }
};

//get all user
const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getAllUsersFromDB();
    res.status(200).json({
      success: true,
      message: "Users fetched successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went Wrong!",
      error: error,
    });
  }
};

export const UserController = {
  createUser,
  getUsers,
};
