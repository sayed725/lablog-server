import { User } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const register = async (payload: User) => {
  const hashPassword = await bcrypt.hash(payload.password, 10);

  const user = await prisma.user.create({
    data: { ...payload, password: hashPassword },
  });

  return user;
};


const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Invalid user");

  const matchPass = await bcrypt.compare(password, user.password);
  if (!matchPass) throw new Error("Invalid Password");

  const token = jwt.sign({ id: user.id, role: user.role }, "very secret", {
    expiresIn: "7d",
  });

  return token;
};



export const userService = { register, login };