import { Router } from "express";
import { ProyectBannerController } from "../controllers";
import { ROUTES } from "./constants";
const api = Router();
const rootURL = ROUTES.PROYECT_BANNER;

api.get(rootURL, ProyectBannerController.getAllProyectBanner);

api.get(`${rootURL}/:id`, ProyectBannerController.getProyectBannerById);

api.patch(`${rootURL}/:id`, ProyectBannerController.updateProyectBanner);

export default api;
