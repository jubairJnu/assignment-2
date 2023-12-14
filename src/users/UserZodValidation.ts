import { z, object, string, number, boolean, array } from "zod";

const orderValidationSchema = object({
  productName: string(),
  price: number(),
  quantity: number(),
});

export const userValidationSchema = object({
  userId: string(),
  username: string(),
  password: string(),
  fullName: object({
    firstName: string(),
    lastName: string(),
  }),
  age: number(),
  email: string(),
  isActive: boolean(),
  hobbies: array(z.string()),
  address: object({
    street: string(),
    city: string(),
    country: string(),
  }),
  orders: array(orderValidationSchema).optional(),
});

export default userValidationSchema;
