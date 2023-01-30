import { NextFunction, Request, Response } from "express";
import { HomeBanner } from "../models";
import { CustomError } from "../types/IError";
import { IHomeBanner } from "../types/IHomeBanner";

const getAllHomeBanner = async (req: Request, res: Response) => {
  const homeBannerInfo: IHomeBanner | null = await HomeBanner.findOne({});
  if (homeBannerInfo) {
    return res.status(200).json(homeBannerInfo);
  } else {
    return res.status(404).json({
      title: "Error!",
      message: "Element not found",
    });
  }
};

const getHomeBannerById = (req: Request, res: Response) => {
  return res.status(200).json({
    message: `Exito! Su param es: ${req.params.id}`,
  });
};

const updateHomeBanner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    if (id && title && description) {
      console.log({ id, title, description });
      const newHomeBannerInfo = await HomeBanner.updateOne(
        { _id: id },
        { title, description },
        { new: true }
      );
      res.status(200).json(newHomeBannerInfo);
    } else {
      throw new CustomError(400, "Parámetros incompletos.");
    }
    return res;
  } catch (error: any) {
    next(error);
  }
};

const HomeBannerController = {
  getAllHomeBanner,
  getHomeBannerById,
  updateHomeBanner,
};

export default HomeBannerController;
