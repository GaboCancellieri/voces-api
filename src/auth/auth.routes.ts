import { Router } from "express";
import AuthController from "./auth.controller";
import { AUTH_LOGIN_ROUTE, AUTH_REFRESH_ROUTE } from "./constants";
const api = Router();

api.post(AUTH_LOGIN_ROUTE, AuthController.authLogin);
api.post(AUTH_REFRESH_ROUTE, AuthController.authRefresh);

export default api;
