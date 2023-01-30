import { model, Schema } from "mongoose";
import { IShow } from "../types/IShow";

const ShowSchema = new Schema({
  title: { type: String, require: true },
  description: { type: String, require: true },
  link: { type: String, require: true },
  imageURL: { type: String, require: false },
  isFeatured: { type: Boolean, require: true, default: false },
});

// Duplicate the ID field.
ShowSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
ShowSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

ShowSchema.set("toObject", { virtuals: true });

const Show = model<IShow>("Show", ShowSchema, "shows");
export default Show;
