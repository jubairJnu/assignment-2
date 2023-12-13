import { UserModel } from "../model/UserModel";
import { TUser } from "./UserInterface";

const createUserIntoDB = async (user:TUser) => {
  const result = await UserModel.create(user);
  return result;
};

export const UserService = {
  createUserIntoDB
};