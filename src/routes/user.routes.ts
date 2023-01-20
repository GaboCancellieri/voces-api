import { Router } from "express";
import { UserController } from "../controllers";
import { ROUTES } from "./constants";
const api = Router();
const rootURL = ROUTES.USER;

api.post(`${rootURL}`, UserController.createUser);
api.patch(`${rootURL}/verify/:id`, UserController.verifyUserEmail);

export default api;
