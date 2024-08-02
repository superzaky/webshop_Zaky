import { MedusaRequest, MedusaResponse } from "@medusajs/medusa"
import ReviewService from "../../../modules/review/review_service"
import { HELLO_MODULE } from "../../../modules/hello"

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const reviewModuleService: ReviewService = req.scope.resolve(
    HELLO_MODULE
  )

  res.json({
    message: reviewModuleService.createReviews(),
  })
}
