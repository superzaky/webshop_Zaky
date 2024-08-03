import { model } from "@medusajs/utils";

const Review = model.define("review", {
  id: model.id().primaryKey(),
  product_id: model.text(),
  title: model.text(),
  description: model.text(),
  confirmed: model.boolean(),
  email: model.text(),
  verified_customer: model.boolean(),
  rating: model.number(),
  locale: model.text()
});

export default Review;
