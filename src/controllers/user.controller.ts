import { NextFunction, Request, Response } from "express";
import { hash, compare } from "bcrypt";
import { randomString } from "../utils/common";
import User from "../models/User.schema";
import {
  USER_VERIFICATION_EMAIL,
  USER_VERIFICATION_EMAIL_TITLE,
} from "../constants/email";
import { sendEmail } from "../utils/email";
import { CustomError } from "../types/IError";
const saltRounds = 10;

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, lastName, email, password } = req.body;
    if (name && lastName && email && password) {
      const createdUser = await User.findOne({ email });
      console.log(createdUser);
      if (!createdUser) {
        const code = randomString(10, "#aA");
        const codeHash = await hash(code, saltRounds);
        const passwordHash = await hash(password, saltRounds);
        new User({
          name,
          lastName,
          email,
          password: passwordHash,
          verifCode: codeHash,
        }).save();
        const contentEmail = USER_VERIFICATION_EMAIL(name, code);
        sendEmail(email, USER_VERIFICATION_EMAIL_TITLE, contentEmail);
        res.status(201).json({
          success: true,
          title: "EXITO!",
          message: `Usuario ${email} creado con éxito!`,
        });
      } else {
        throw new CustomError(
          400,
          `El email: ${email}, ya posee una cuenta asociada.`
        );
      }
    } else {
      throw new CustomError(400, "Parámetros incompletos.");
    }
    return res;
  } catch (error: any) {
    next(error);
  }
};

const verifyUserEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { code } = req.body;
    const user = await User.findById(id);
    if (user && user.verifCode) {
      const result = await compare(code, user.verifCode);
      if (result) {
        await User.updateOne({ _id: id }, { isActive: true });
        res.status(200).json({
          success: true,
          title: "Exito",
          message: "El usuario ha sido activado exitosamente!",
        });
      } else {
        throw new CustomError(400, "Codigo de verificación inválido.");
      }
    } else {
      throw new CustomError(400, "Usuario inválido.");
    }
  } catch (error: any) {
    next(error);
  }
};

const UserController = {
  createUser,
  verifyUserEmail,
};

export default UserController;
