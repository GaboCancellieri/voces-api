import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import fileupload from "express-fileupload";
import https from "https";
import dotenv from "dotenv";
import logger from "./config/Logger";
import { connectToMongo } from "./config/DatabaseConfig";
import { enableCors } from "./config/constants";
dotenv.config();

// IMPORT ROUTES
import { HomeBannerRoutes, UserRoutes } from "./routes";
import { AuthRoutes } from "./auth";
import ErrorHandler from "./utils/error";

//CRON

class Server {
  public app: express.Application;
  public host: string = process.env.NODE_HOST || "0.0.0.0";
  public port: string = process.env.NODE_PORT || "3001";

  constructor() {
    /* Inicializaciones esenciales como conexiones con la DB, 
        rutas, config de middleware que se pueden hacer en metodos aparte (por prolijidad)*/
    this.app = express();
    this.app.use(express.json({ limit: "200mb" }));
    this.app.use(fileupload());
    this.app.set("port", this.port);
    connectToMongo();
    this.config();
    this.routes();
  }

  config() {
    /* middleware y dependencias importantes para nuestra app */
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(
      express.urlencoded({
        extended: false,
      })
    );
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(cors());

    // Add headers
    this.app.use(enableCors);
  }

  routes() {
    /* las rutas de la app */
    this.app.use(AuthRoutes);
    this.app.use(HomeBannerRoutes);
    this.app.use(UserRoutes);

    // Error Handler Middleware
    this.app.use(ErrorHandler);
  }

  start() {
    if (process.env.NODE_ENV === "production") {
      https.createServer({}, this.app).listen(this.port, () => {
        logger.info(
          `My https server listening on: ${this.host}:${this.app.get(
            "port"
          )}...`
        );
      });
    } else if (process.env.NODE_ENV === "development") {
      this.app.listen(this.app.get("port"), this.host, () => {
        /* cosas que se hagan despues del start */
        logger.info(
          `Server is running on: ${process.env.NODE_HOST}:${process.env.NODE_PORT}`
        );
      });
    }
  }
}

// CREAMOS UN NUEVO OBJETO DE LA CLASE SERVER Y LO STARTEAMOS
const server = new Server();
server.start();
