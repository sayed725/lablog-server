import { User } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const register = async (payload: User) => {
//   const hashPassword = await bcrypt.hash(payload.password, 10);

  const user = await prisma.user.create({
    data: { ...payload },
  });

  return user;
};


export const userService = { register };