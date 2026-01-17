import { Request, Response, NextFunction } from "express";
// import { Role } from "../generated/prisma/enums";
import jwt, { JwtPayload } from "jsonwebtoken";
import { auth as betterAuth } from "../lib/auth";

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}

const auth = (resource: "user" | "equipment", action: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Authentication and authorization logic here

    // const token = req.headers.authorization?.split(" ")[1];
    // if (!token) return res.send("Please provide token");

    // try {
    //   const decoded = jwt.verify(token as string, "very secret");

    //   if (!decoded) return res.send("UnAuthorized");

    //   req.user = decoded as JwtPayload;

    //   if (roles && !roles.includes(req.user.role)) {
    //     return res.send("Forbidden");
    //   }

    try {
      // ===================================== better auth =================================
      const session = await betterAuth.api.getSession({
        headers: req.headers,
      });
      if (!session) res.status(401).send({ message: "Unauthorized!" });

      const hasPermission = await betterAuth.api.userHasPermission({
        body: {
          userId: session?.user.id,
          role: session?.user.role || ("user" as any),
          permission: { [resource]: [action] },
        },
      });
    //   console.log(hasPermission)
      if (!hasPermission || !hasPermission.success)
        res.status(401).send({
          message: `Forbidden: You do not have permission to ${action} ${resource}!`,
        });

      next();
    } catch (error) {
      console.error(error);
    }
  };
};

export default auth;
