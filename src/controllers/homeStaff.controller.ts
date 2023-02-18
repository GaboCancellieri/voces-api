import { NextFunction, Request, Response } from "express";
import { HomeStaff } from "../models";
import { IHomeStaff } from "../types/IHomeStaff";
import { CustomError } from "../types/IError";

const getAllHomeStaff = async (req: Request, res: Response) => {
  const homeStaff: IHomeStaff[] | null = await HomeStaff.find();
  if (homeStaff) {
    return res.status(200).json(homeStaff);
  } else {
    return res.status(404).json({
      title: "Error!",
      message: "Elements not found",
    });
  }
};

const getHomeStaffById = (req: Request, res: Response) => {
  return res.status(200).json({
    message: `Exito! Su param es: ${req.params.id}`,
  });
};

const createHomeStaff = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description, imageURL } = req.body;
    if (title && description && imageURL) {
      const newHomeStaff = await HomeStaff.insertMany([
        { title, description, imageURL },
      ]);
      res.status(201).json(newHomeStaff[0]);
    } else {
      throw new CustomError(400, "Parámetros incorrectos.");
    }
    return res;
  } catch (error: any) {
    next(error);
  }
};

const updateHomeStaff = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { title, description, imageURL } = req.body;
    if (id && title && description && imageURL) {
      const newHomeStaff = await HomeStaff.findByIdAndUpdate(
        id,
        { title, description, imageURL },
        { new: true }
      );
      res.status(200).json(newHomeStaff);
    } else {
      throw new CustomError(400, "Parámetros incorrectos.");
    }
  } catch (error: any) {
    next(error);
  }
};

const deleteHomeStaff = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (id) {
      const deletedHomeStaff = await HomeStaff.findByIdAndDelete(id);
      res.status(200).json(deletedHomeStaff);
    } else {
      throw new CustomError(400, "Parámetros incorrectos.");
    }
  } catch (error: any) {
    next(error);
  }
};

const HomeStaffController = {
  getAllHomeStaff,
  getHomeStaffById,
  createHomeStaff,
  updateHomeStaff,
  deleteHomeStaff,
};

export default HomeStaffController;
