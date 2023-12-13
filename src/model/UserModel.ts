import mongoose, { Schema, model } from "mongoose";
import { TUser } from "../users/UserInterface";

const userSchema = new Schema<TUser>({
  userId: { type: String, unique: true },
  username: { type: String, unique: true },
  password: { type: String },
  fullName: {
    firstName: { type: String },
    lastName: { type: String },
  },
  age: { type: Number },
  email: { type: String },
  isActive: { type: Boolean },
  address: {
    street: { type: String },
    city: { type: String },
    country: { type: String },
  },
  orders: [
    {
      productName: { type: String },
      price: { type: String },
      quantity: { type: String },
    },
  ],
});

export const UserModel = model<TUser>('user', userSchema);
