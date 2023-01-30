import { Router } from "express";
import { StreamingController } from "../controllers";
import { ROUTES } from "./constants";
const api = Router();
const rootURL = ROUTES.SHOWS;

api.get(rootURL, StreamingController.getAllShows);

api.get(`${rootURL}/:id`, StreamingController.getShowById);

api.post(`${rootURL}`, StreamingController.createShow);

api.patch(`${rootURL}/:id`, StreamingController.updateShow);

api.delete(`${rootURL}/:id`, StreamingController.deleteShow);

export default api;
