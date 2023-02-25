import { model, Schema } from "mongoose";
import { IHomeNews } from "../types/IHomeNews";

const HomeNewsSchema = new Schema({
  imageURL: { type: String, require: false },
  description: { type: String, require: false },
});

// Duplicate the ID field.
HomeNewsSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
HomeNewsSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

HomeNewsSchema.set("toObject", { virtuals: true });

const HomeNews = model<IHomeNews>("HomeNews", HomeNewsSchema, "home_news");
export default HomeNews;
