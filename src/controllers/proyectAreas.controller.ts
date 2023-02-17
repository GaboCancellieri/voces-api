import { NextFunction, Request, Response } from "express";
import { ProyectAreas } from "../models";
import { CustomError } from "../types/IError";
import { IProyectAreas } from "../types/IProyectAreas";

const getAllProyectAreas = async (req: Request, res: Response) => {
  const proyectareas: IProyectAreas[] | null = await ProyectAreas.find();
  if (proyectareas) {
    return res.status(200).json(proyectareas);
  } else {
    return res.status(404).json({
      title: "Error!",
      message: "Elements not found",
    });
  }
};

const getProyectAreasById = (req: Request, res: Response) => {
  return res.status(200).json({
    message: `Exito! Su param es: ${req.params.id}`,
  });
};

const createProyectAreas = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description, imageURL } = req.body;
    if (title && description && imageURL) {
      const newProyectAreas = await ProyectAreas.insertMany([
        { title, description, imageURL },
      ]);
      res.status(201).json(newProyectAreas[0]);
    } else {
      throw new CustomError(400, "Parámetros incorrectos.");
    }
    return res;
  } catch (error: any) {
    next(error);
  }
};

const updateProyectAreas = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { title, description, imageURL } = req.body;
    if (id && title && description && imageURL) {
      const newProyectAreas = await ProyectAreas.findByIdAndUpdate(
        id,
        { title, description, imageURL },
        { new: true }
      );
      res.status(200).json(newProyectAreas);
    } else {
      throw new CustomError(400, "Parámetros incorrectos.");
    }
  } catch (error: any) {
    next(error);
  }
};

const deleteProyectAreas = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (id) {
      const deletedProyectAreas = await ProyectAreas.findByIdAndDelete(id);
      res.status(200).json(deletedProyectAreas);
    } else {
      throw new CustomError(400, "Parámetros incorrectos.");
    }
  } catch (error: any) {
    next(error);
  }
};

const ProyectAreasController = {
  getAllProyectAreas,
  getProyectAreasById,
  createProyectAreas,
  updateProyectAreas,
  deleteProyectAreas,
};

export default ProyectAreasController;
