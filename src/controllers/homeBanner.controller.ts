import { Request, Response } from "express";
import { HomeBanner } from "../models";
import { IHomeBanner } from "../types/homeBannerTypes";

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

const HomeBannerController = {
  getAllHomeBanner,
  getHomeBannerById,
};

export default HomeBannerController;
