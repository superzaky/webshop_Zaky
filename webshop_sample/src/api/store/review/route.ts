import { MedusaRequest, MedusaResponse } from "@medusajs/medusa"
import ReviewModuleService from "../../../modules/review/review_service"
import { REVIEW_MODULE } from "../../../modules/review"

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const reviewModuleService: ReviewModuleService = req.scope.resolve(
    REVIEW_MODULE
  )
  const post = await reviewModuleService.createReviews(req.body)
  res.json({
    message: post
  })
}
