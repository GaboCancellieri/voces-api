import { model, Schema } from "mongoose";
import { IProyectAreas } from "../types/IProyectAreas";

const ProyectAreasSchema = new Schema({
  title: { type: String, require: true },
  description: { type: String, require: true },
  imageURL: { type: String, require: false },
});

// Duplicate the ID field.
ProyectAreasSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
ProyectAreasSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

ProyectAreasSchema.set("toObject", { virtuals: true });

const ProyectAreas = model<IProyectAreas>(
  "ProyectAreas",
  ProyectAreasSchema,
  "proyect_areas"
);
export default ProyectAreas;
