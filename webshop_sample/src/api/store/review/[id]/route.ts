import { MedusaRequest, MedusaResponse } from "@medusajs/medusa"
import ReviewModuleService from "../../../../modules/review/review_service"
import { REVIEW_MODULE } from "../../../../modules/review"

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
    try {
        const reviewModuleService: ReviewModuleService = req.scope.resolve(REVIEW_MODULE)
        const review = await reviewModuleService.retrieveReview(req.params.id);
        res.json({
          message: review,
        })
      } catch (error) {
        console.error("Error retrieving a review:", error);
        res.status(500).json({
          error: "An error occurred while retrieving the requested review.",
        })
      }
}
