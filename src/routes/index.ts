import { Router } from "express";
import userRouter from "../modules/user/user.route";
import equipmentRouter from "../modules/equipment/equipment.route";


const routes = Router()

routes.use('/user', userRouter)
routes.use("/equipment", equipmentRouter);


export default routes;