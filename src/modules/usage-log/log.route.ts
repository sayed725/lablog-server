import { Router } from "express";
import { logController } from "./log.controller";
import auth from "../../middleware/auth";
// import { Role } from "../../generated/prisma/enums";

const logRouter = Router();

logRouter.post("/", 
    auth(), 
    logController.createUsageLog);
logRouter.get("/", logController.getUsageLogs);
logRouter.patch("/:id", logController.updateUsageLog);

export default logRouter;