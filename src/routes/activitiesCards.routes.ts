import { Router } from "express";
import { ActivitiesCardsController } from "../controllers";
import { ROUTES } from "./constants";
const api = Router();
const rootURL = ROUTES.ACTIVITIES_CARDS;

api.get(rootURL, ActivitiesCardsController.getAllActivitiesCards);

api.get(`${rootURL}/:id`, ActivitiesCardsController.getActivitiesCardsById);

api.post(`${rootURL}`, ActivitiesCardsController.createActivitiesCards);

api.patch(`${rootURL}/:id`, ActivitiesCardsController.updateActivitiesCards);

api.delete(`${rootURL}/:id`, ActivitiesCardsController.deleteActivitiesCards);

export default api;
