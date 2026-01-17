import { RequestHandler } from "express";
import { prisma } from "../../lib/prisma";

const createUsageLog: RequestHandler = async (req, res) => {
    // console.log(req.user)
  try {
    const payload = req.body;
    const log = await prisma.usageLog.create({
      data: { ...payload, userId: req.user.id },
    });

    res.send({ message: "log added", data: log });
  } catch (error) {
    res.send({ message: "log creation error", error });
  }
};

const getUsageLogs: RequestHandler = async (req, res) => {
  try {
    const log = await prisma.usageLog.findMany({
      include: { equipment: true },
    });

    res.send({ message: "logs", data: log });
  } catch (error) {
    res.send({ message: "log getting error", error });
  }
};

const updateUsageLog: RequestHandler = async (req, res) => {
  const { id } = req.params;
  if(!id || typeof id !== "string") return res.send("Please Provide an id")

  try {
    const log = await prisma.usageLog.update({
      where: { id },
      data: {
        endTime: new Date(),
      },
    });

    res.send({ message: "log", data: log });
  } catch (error) {
    res.send({ message: "log getting error", error });
  }
};

export const logController = {
  createUsageLog,
  getUsageLogs,
  updateUsageLog,
};