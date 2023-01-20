import { model, Schema } from "mongoose";
import { IHomeBanner } from "../types/IHomeBanner";

const HomeBannerSchema = new Schema({
  title: { type: String, require: true },
  description: { type: String, require: true },
});

// Duplicate the ID field.
HomeBannerSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
HomeBannerSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

HomeBannerSchema.set("toObject", { virtuals: true });

const HomeBanner = model<IHomeBanner>(
  "HomeBanner",
  HomeBannerSchema,
  "home_banner"
);
export default HomeBanner;
