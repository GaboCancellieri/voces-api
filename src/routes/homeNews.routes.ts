import { Router } from "express";
import { HomeNewsController } from "../controllers";
import { ROUTES } from "./constants";
const api = Router();
const rootURL = ROUTES.HOME_NEWS;

api.get(rootURL, HomeNewsController.getAllHomeNews);

api.get(`${rootURL}/:id`, HomeNewsController.getHomeNewsById);

api.patch(`${rootURL}/:id`, HomeNewsController.updateHomeNews);

export default api;
