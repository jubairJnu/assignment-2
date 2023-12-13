import { UserModel } from "../model/UserModel";
import { TUser } from "./UserInterface";

const createUserIntoDB = async (user: TUser) => {
  console.log("Input user data:", user);
  const result = await UserModel.create(user);
  return result;
};

export const UserService = {
  createUserIntoDB,
};
