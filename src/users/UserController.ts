import { Request, Response } from "express";
import { UserService } from "./UserService";

import userValidationSchema from "./UserZodValidation";

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;

    //data validation using zod
    const zodParseData = userValidationSchema.parse(userData);

    const result = await UserService.createUserIntoDB(zodParseData);
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

//get single user
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserService.getSingleUserFromDB(userId);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    }

    res.status(200).json({
      success: true,
      message: "User fetched successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};

//update user
const UpdateAUser = async (req: Request, res: Response) => {
  try {
    const updatedUserData = req.body;
    const { userId } = req.params;

    const result = await UserService.updateAUserIntoDB(userId, updatedUserData);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    }

    res.status(200).json({
      success: true,
      message: "User fetched successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User not found",
      error: {
        code: 500,
        description: "User not found!",
      },
    });
  }
};

//delete a user

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await UserService.deleteUserFromDB(userId);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};

//orders-----
const getUserOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserService.getSingleUserFromDB(userId);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    }

    res.status(200).json({
      success: true,
      message: "Order fetched successfully!",
      data: result.orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: {
        code: 500,
        description: "User not found!",
      },
    });
  }
};

const UpdateOrders = async (req: Request, res: Response) => {
  try {
    const OrderData = req.body;
    const { userId } = req.params;

    const result = await UserService.updateAUserIntoDB(userId, OrderData);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
    }

    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User not found",
      error: {
        code: 500,
        description: "User not found!",
      },
    });
  }
};

//caculate total price

const getTotalPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserService.calculateTotalPrice(userId);

    if (result === null) {
      res.status(404).json({
        success: false,
        message: "User not found",
        error: {
          code: 404,
          description: "User not found!",
        },
      });
      return;
    }

    // handle no order

    if (result === 0) {
      res.status(400).json({
        success: false,
        message: "There are no orders for this user",
        error: {
          code: 400,
          description: "There are no orders for this user",
        },
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Total price calculated successfully!",
      data: {
        totalPrice: result,
      },
    });
  } catch (error) {
    // Handle other errors
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: {
        code: 500,
        description: "Internal server error",
      },
    });
  }
};

//export
export const UserController = {
  createUser,
  getUsers,
  getSingleUser,
  UpdateAUser,
  deleteUser,
  UpdateOrders,
  getUserOrders,
  getTotalPrice,
};
