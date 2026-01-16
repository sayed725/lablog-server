import { RequestHandler } from "express";
import { userService } from "./user.service";

const register: RequestHandler = async (req, res) => {
  const payload = req.body;

  const user = await userService.register(payload);

  res.send({ message: "Registered Successfully", data: user });
};


export const userController = {
  register,
};