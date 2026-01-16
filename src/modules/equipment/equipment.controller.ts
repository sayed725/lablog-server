import { RequestHandler } from "express";
import { prisma } from "../../lib/prisma";

const createEquipment: RequestHandler = async (req, res) => {
  try {
    const payload = req.body;

    const equipment = await prisma.equipment.create({
      data: payload,
    });

    res.send({ message: "Equipment Added", data: equipment });
  } catch (error) {
    console.error(error);
  }
};

const getEquipments: RequestHandler = async (req, res) => {
  try {
    const data = await prisma.equipment.findMany();
    res.send({ message: "Equipments", data });
  } catch (error) {
    console.error(error);
  }
};

export const equipmentController = {
  createEquipment,
  getEquipments,
};