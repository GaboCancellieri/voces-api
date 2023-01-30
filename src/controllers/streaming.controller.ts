import { NextFunction, Request, Response } from "express";
import { Show } from "../models";
import { CustomError } from "../types/IError";
import { IShow } from "../types/IShow";

const getAllShows = async (req: Request, res: Response) => {
  const shows: IShow[] | null = await Show.find();
  if (shows) {
    return res.status(200).json(shows);
  } else {
    return res.status(404).json({
      title: "Error!",
      message: "Elements not found",
    });
  }
};

const getShowById = (req: Request, res: Response) => {
  return res.status(200).json({
    message: `Exito! Su param es: ${req.params.id}`,
  });
};

const createShow = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, link, imageURL, isFeatured } = req.body;
    if (title && description && link && imageURL) {
      const newShow = await Show.insertMany([
        { title, description, link, imageURL, isFeatured },
      ]);
      res.status(201).json(newShow[0]);
    } else {
      throw new CustomError(400, "Parámetros incompletos.");
    }
    return res;
  } catch (error: any) {
    next(error);
  }
};

const updateShow = async (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (error: any) {
    next(error);
  }
};

const deleteShow = async (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (error: any) {
    next(error);
  }
};

const StreamingController = {
  getAllShows,
  getShowById,
  createShow,
  updateShow,
  deleteShow,
};

export default StreamingController;
