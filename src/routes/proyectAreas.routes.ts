import { Router } from "express";
import { ProyectAreasController } from "../controllers";
import { ROUTES } from "./constants";
const api = Router();
const rootURL = ROUTES.PROYECT_AREAS;

api.get(rootURL, ProyectAreasController.getAllProyectAreas);

api.get(`${rootURL}/:id`, ProyectAreasController.getProyectAreasById);

api.post(`${rootURL}`, ProyectAreasController.createProyectAreas);

api.patch(`${rootURL}/:id`, ProyectAreasController.updateProyectAreas);

api.delete(`${rootURL}/:id`, ProyectAreasController.deleteProyectAreas);

export default api;
