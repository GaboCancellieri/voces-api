import { NextFunction, Request, Response } from "express";
import { ActivitiesCards } from "../models";
import { IActivitiesCards } from "../types/IActivitiesCards";
import { CustomError } from "../types/IError";

const getAllActivitiesCards = async (req: Request, res: Response) => {
  const activitiesCards: IActivitiesCards[] | null =
    await ActivitiesCards.find();
  if (activitiesCards) {
    return res.status(200).json(activitiesCards);
  } else {
    return res.status(404).json({
      title: "Error!",
      message: "Elements not found",
    });
  }
};

const getActivitiesCardsById = (req: Request, res: Response) => {
  return res.status(200).json({
    message: `Exito! Su param es: ${req.params.id}`,
  });
};

const createActivitiesCards = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description, imageURL } = req.body;
    if (title && description && imageURL) {
      const newActivitiesCards = await ActivitiesCards.insertMany([
        { title, description, imageURL },
      ]);
      res.status(201).json(newActivitiesCards[0]);
    } else {
      throw new CustomError(400, "Parámetros incorrectos.");
    }
    return res;
  } catch (error: any) {
    next(error);
  }
};

const updateActivitiesCards = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { title, description, imageURL } = req.body;
    if (id && title && description && imageURL) {
      const newActivitiesCards = await ActivitiesCards.findByIdAndUpdate(
        id,
        { title, description, imageURL },
        { new: true }
      );
      res.status(200).json(newActivitiesCards);
    } else {
      throw new CustomError(400, "Parámetros incorrectos.");
    }
  } catch (error: any) {
    next(error);
  }
};

const deleteActivitiesCards = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (id) {
      const deletedActivitiesCards = await ActivitiesCards.findByIdAndDelete(
        id
      );
      res.status(200).json(deletedActivitiesCards);
    } else {
      throw new CustomError(400, "Parámetros incorrectos.");
    }
  } catch (error: any) {
    next(error);
  }
};

const ActivitiesCardsController = {
  getAllActivitiesCards,
  getActivitiesCardsById,
  createActivitiesCards,
  updateActivitiesCards,
  deleteActivitiesCards,
};

export default ActivitiesCardsController;
