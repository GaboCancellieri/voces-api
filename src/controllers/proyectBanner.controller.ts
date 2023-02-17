import { NextFunction, Request, Response } from "express";
import { ProyectBanner } from "../models";
import { CustomError } from "../types/IError";
import { IProyectBanner } from "../types/IProyectBanner";

const getAllProyectBanner = async (req: Request, res: Response) => {
  const proyectBannerInfo: IProyectBanner | null = await ProyectBanner.findOne(
    {}
  );
  if (proyectBannerInfo) {
    return res.status(200).json(proyectBannerInfo);
  } else {
    return res.status(404).json({
      title: "Error!",
      message: "Element not found",
    });
  }
};

const getProyectBannerById = (req: Request, res: Response) => {
  return res.status(200).json({
    message: `Exito! Su param es: ${req.params.id}`,
  });
};

const updateProyectBanner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    if (id && title && description) {
      console.log({ id, title, description });
      const newProyectBannerInfo = await ProyectBanner.updateOne(
        { _id: id },
        { title, description },
        { new: true }
      );
      res.status(200).json(newProyectBannerInfo);
    } else {
      throw new CustomError(400, "Parámetros incompletos.");
    }
    return res;
  } catch (error: any) {
    next(error);
  }
};

const ProyectBannerController = {
  getAllProyectBanner,
  getProyectBannerById,
  updateProyectBanner,
};

export default ProyectBannerController;
