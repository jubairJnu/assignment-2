import { UserModel } from "../model/UserModel";
import { TOrder, TUser } from "./UserInterface";

const createUserIntoDB = async (user: TUser) => {
  const result = await UserModel.create(user);
  return result;
};

//get all user

const getAllUsersFromDB = async () => {
  const result = await UserModel.find();
  return result;
};

//get single user
const getSingleUserFromDB = async (userId: string) => {
  const result = await UserModel.findOne({ userId: userId }).select(
    "-password"
  );
  return result;
};

//update a user
const updateAUserIntoDB = async (
  userId: string,
  updatedUserData: TUser
): Promise<TUser | null> => {
  const result = await UserModel.findOneAndUpdate(
    { userId: userId }, // Use { userId: userId } instead of { userId: userId }
    updatedUserData,
    { new: true, runValidators: true }
  );
  return result;
};

const deleteUserFromDB = async (userId: string): Promise<TUser | null> => {
  const result = await UserModel.findOneAndDelete({ userId: userId });
  return result;
};

//orders----------
const getUserOrderFromDB = async (userId: string) => {
  const result = await UserModel.findOne({ userId: userId });
  const data = {
    orders: result?.orders,
  };
  return data;
};

const UpdateOrdersIntoDB = async (
  userId: string,
  updatedOrdersData: TOrder
): Promise<TUser | null> => {
  const result = await UserModel.findByIdAndUpdate(
    { userId: userId.toString() },
    {
      $push: {
        orders: { $each: updatedOrdersData },
      },
    },
    { new: true, runValidators: true }
  );

  return result;
};

//calculate totalPrice

const calculateTotalPrice = async (userId: string) => {
  const user = await UserModel.findOne({ userId: userId });
  if (!user) {
    return null;
  }
  //calculation

  const totalPrice = user.orders.reduce((acc, order) => {
    return acc + order.price * order.quantity;
  }, 0);

  return totalPrice;
};

export const UserService = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateAUserIntoDB,
  deleteUserFromDB,
  UpdateOrdersIntoDB,
  getUserOrderFromDB,
  calculateTotalPrice,
};
