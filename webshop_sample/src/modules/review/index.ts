import ReviewService from "./review_service"
import { Module } from "@medusajs/utils"

export const REVIEW_MODULE = "reviewService"

export default Module(REVIEW_MODULE, {
  service: ReviewService,
})
