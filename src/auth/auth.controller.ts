import { NextFunction, Request, Response } from "express";
import { sign, verify } from "jsonwebtoken";
import { compare } from "bcrypt";
import User from "../models/User.schema";
import { IUser } from "../types/IUser";
import RefreshToken from "../models/RefreshToken.schema";
import { CustomError } from "../types/IError";
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

const checkUserPassword = async (email: string, password: string) => {
  let result: IUser | null = null;
  const user = await User.findOne({ email });
  if (user && user.password) {
    const matchPassword = await compare(password, user.password);
    if (matchPassword) {
      result = new User({
        email: user.email,
        name: user.name,
        lastName: user.lastName,
        isAdmin: user.isAdmin,
        isActive: user.isActive,
      });
    }
  }
  return result;
};

const saveRefreshToken = (refreshToken: string) => {
  new RefreshToken({ token: refreshToken }).save();
};

const authLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await checkUserPassword(email, password);
  if (user && ACCESS_TOKEN_SECRET && REFRESH_TOKEN_SECRET) {
    const userPlainObject = JSON.parse(JSON.stringify(user));
    const accessToken = await sign(userPlainObject, ACCESS_TOKEN_SECRET, {
      expiresIn: "1d",
    });
    const refreshToken = await sign(userPlainObject, REFRESH_TOKEN_SECRET);
    saveRefreshToken(refreshToken);
    res.status(200).json({ accessToken, refreshToken });
  } else {
    res.status(401).json({
      title: "ERROR!",
      message: "Usuario o contraseña incorrectos.",
    });
  }
  return res;
};

const verifyRefreshToken = (refreshToken: string) => {
  return REFRESH_TOKEN_SECRET
    ? verify(refreshToken, REFRESH_TOKEN_SECRET)
    : null;
};

const deleteRefreshToken = (refreshToken: string) => {
  RefreshToken.deleteOne({ token: refreshToken });
};

const authRefresh = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers["authorization"];
    if (authHeader) {
      const oldRefreshToken = authHeader.split(" ")[1];
      if (oldRefreshToken && ACCESS_TOKEN_SECRET && REFRESH_TOKEN_SECRET) {
        const user: any = verifyRefreshToken(oldRefreshToken);
        delete user["iat"];
        deleteRefreshToken(oldRefreshToken);
        const accessToken = await sign(user, ACCESS_TOKEN_SECRET, {
          expiresIn: "1d",
        });
        const refreshToken = await sign(user, REFRESH_TOKEN_SECRET);
        saveRefreshToken(refreshToken);
        res.status(200).json({ accessToken, refreshToken });
      } else {
        throw new CustomError(403, "Refresh Token inválido.");
      }
    } else {
      throw new CustomError(403, "Refresh Token inválido.");
    }
  } catch (error: any) {
    next(error);
  }
  return res;
};

const verifyAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];
    if (authHeader) {
      const accessToken = authHeader.split(" ")[1];
      if (accessToken && ACCESS_TOKEN_SECRET) {
        const user = await verify(accessToken, ACCESS_TOKEN_SECRET);
        req.body.user = user;
        next();
      } else {
        throw new CustomError(403, "Token inválido.");
      }
    } else {
      throw new CustomError(403, "Token inválido.");
    }
    return res;
  } catch (error: any) {
    next(error);
  }
};

const AuthController = {
  authLogin,
  authRefresh,
  verifyAccessToken,
};

export default AuthController;
