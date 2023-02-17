import { model, Schema } from "mongoose";
import { IProyectBanner } from "../types/IProyectBanner";

const ProyectBannerSchema = new Schema({
  title: { type: String, require: true },
  description: { type: String, require: true },
});

// Duplicate the ID field.
ProyectBannerSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
ProyectBannerSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

ProyectBannerSchema.set("toObject", { virtuals: true });

const ProyectBanner = model<IProyectBanner>(
  "ProyectBanner",
  ProyectBannerSchema,
  "proyect_banner"
);
export default ProyectBanner;
