import { model, Schema } from "mongoose";
import { IActivitiesCards } from "../types/IActivitiesCards";

const ActivitiesCardsSchema = new Schema({
  title: { type: String, require: true },
  description: { type: String, require: true },
  imageURL: { type: String, require: false },
});

// Duplicate the ID field.
ActivitiesCardsSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
ActivitiesCardsSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

ActivitiesCardsSchema.set("toObject", { virtuals: true });

const ActivitiesCards = model<IActivitiesCards>(
  "ActivitiesCards",
  ActivitiesCardsSchema,
  "activities_cards"
);
export default ActivitiesCards;
