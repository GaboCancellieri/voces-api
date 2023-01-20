import { Router } from "express";
import { HomeBannerController } from "../controllers";
import { ROUTES } from "./constants";
const api = Router();
const rootURL = ROUTES.HOME_BANNER;

api.get(rootURL, HomeBannerController.getAllHomeBanner);

api.get(`${rootURL}/:id`, HomeBannerController.getHomeBannerById);

export default api;
