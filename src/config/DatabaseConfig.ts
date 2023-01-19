import mongoose from "mongoose";

export const connectToMongo = () => {
  mongoose.Promise = global.Promise;
  mongoose.connect(
    `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/voces`
  );
};
