import mongoose, { Schema, model } from "mongoose";
import { TUser } from "../users/UserInterface";
import bcrypt from "bcrypt";
import config from "../app/config";

const userSchema = new Schema<TUser>(
  {
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
        price: { type: Number },
        quantity: { type: Number },
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

//virtual

userSchema.virtual("totalPrice").get(function () {
  return this.orders[0].quantity * this.orders[0].price;
});

userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );

  next();
});

userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

export const UserModel = model<TUser>("user", userSchema);
