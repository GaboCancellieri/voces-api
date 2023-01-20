import { model, Schema } from "mongoose";
import { IUser } from "../types/IUser";

const UserSchema = new Schema({
  name: { type: String, require: true },
  lastName: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  verifCode: { type: String, require: true },
  isAdmin: { type: Boolean, default: false },
  isActive: { type: Boolean, default: false },
});

// Duplicate the ID field.
UserSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
UserSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

UserSchema.set("toObject", { virtuals: true });

const User = model<IUser>("User", UserSchema, "users");
export default User;
