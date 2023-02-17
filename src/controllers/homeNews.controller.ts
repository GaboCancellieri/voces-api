import { NextFunction, Request, Response } from "express";
import { HomeNews } from "../models";
import { IHomeNews } from "../types/IHomeNews";
import { CustomError } from "../types/IError";

const getAllHomeNews = async (req: Request, res: Response) => {
  const homeNews: IHomeNews[] | null = await HomeNews.find();
  if (homeNews) {
    return res.status(200).json(homeNews);
  } else {
    return res.status(404).json({
      title: "Error!",
      message: "Elements not found",
    });
  }
};

const getHomeNewsById = (req: Request, res: Response) => {
  return res.status(200).json({
    message: `Exito! Su param es: ${req.params.id}`,
  });
};

const createHomeNews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { imageURL } = req.body;
    if (imageURL) {
      const newHomeNews = await HomeNews.insertMany([{ imageURL }]);
      res.status(201).json(newHomeNews[0]);
    } else {
      throw new CustomError(400, "Parámetros incorrectos.");
    }
    return res;
  } catch (error: any) {
    next(error);
  }
};

const updateHomeNews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { imageURL } = req.body;
    if (imageURL) {
      const newHomeNews = await HomeNews.findByIdAndUpdate(
        id,
        { imageURL },
        { new: true }
      );
      res.status(200).json(newHomeNews);
    } else {
      throw new CustomError(400, "Parámetros incorrectos.");
    }
  } catch (error: any) {
    next(error);
  }
};

const deleteHomeNews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (id) {
      const deletedHomeNews = await HomeNews.findByIdAndDelete(id);
      res.status(200).json(deletedHomeNews);
    } else {
      throw new CustomError(400, "Parámetros incorrectos.");
    }
  } catch (error: any) {
    next(error);
  }
};

const HomeNewsController = {
  getAllHomeNews,
  getHomeNewsById,
  createHomeNews,
  updateHomeNews,
  deleteHomeNews,
};

export default HomeNewsController;
