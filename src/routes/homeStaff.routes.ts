import { Router } from "express";
import { HomeStaffController } from "../controllers";
import { ROUTES } from "./constants";
const api = Router();
const rootURL = ROUTES.HOME_STAFF;

api.get(rootURL, HomeStaffController.getAllHomeStaff);

api.get(`${rootURL}/:id`, HomeStaffController.getHomeStaffById);

api.post(`${rootURL}`, HomeStaffController.createHomeStaff);

api.patch(`${rootURL}/:id`, HomeStaffController.updateHomeStaff);

api.delete(`${rootURL}/:id`, HomeStaffController.deleteHomeStaff);

export default api;
