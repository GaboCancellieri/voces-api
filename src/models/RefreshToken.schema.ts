import { model, Schema } from "mongoose";
import { IRefreshToken } from "../types/IRefreshToken";

const RefreshTokenSchema = new Schema({
  token: { type: String, require: true },
});

// Duplicate the ID field.
RefreshTokenSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
RefreshTokenSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

RefreshTokenSchema.set("toObject", { virtuals: true });

const RefreshToken = model<IRefreshToken>(
  "RefreshToken",
  RefreshTokenSchema,
  "refresh_tokens"
);
export default RefreshToken;
