import { model, Schema } from "mongoose";
import { IHomeStaff } from "../types/IHomeStaff";

const HomeStaffSchema = new Schema({
  title: { type: String, require: true },
  description: { type: String, require: true },
  imageURL: { type: String, require: false },
});

// Duplicate the ID field.
HomeStaffSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
HomeStaffSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

HomeStaffSchema.set("toObject", { virtuals: true });

const HomeStaff = model<IHomeStaff>("HomeStaff", HomeStaffSchema, "home_staff");
export default HomeStaff;
