import { Request, Response } from "express";
import { UserService } from "./UserService";

const createUser = async(req:Request, res:Response) =>{
  try{
    const user = req.body;
    const result = await UserService.createUserIntoDB(user);
    res.status(200).json({
      "success": true,
    "message": "User created successfully!",
    "data":result
    })
  }
  catch(error){
   res.status(500).json({
    "success": false,
    "message": "Something went Wrong!",
    "error":error
   })
  }
};

export const UserController = {
  createUser
}