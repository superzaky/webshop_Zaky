import { MedusaService } from "@medusajs/utils"
import review from "./models/review";
class ReviewModuleService extends MedusaService({
  review
}) {
}

export default ReviewModuleService
