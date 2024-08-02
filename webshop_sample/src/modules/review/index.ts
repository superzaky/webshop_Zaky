import ReviewModuleService from "./review_service"
import { Module } from "@medusajs/utils"

export const REVIEW_MODULE = "reviewModuleService"

export default Module(REVIEW_MODULE, {
  service: ReviewModuleService,
})
