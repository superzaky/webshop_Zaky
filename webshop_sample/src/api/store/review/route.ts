import { MedusaRequest, MedusaResponse } from "@medusajs/medusa"
import ReviewModuleService from "../../../modules/review/review_service"
import { REVIEW_MODULE } from "../../../modules/review"
import { remoteQueryObjectFromString, ContainerRegistrationKeys } from "@medusajs/utils"
import type { RemoteQueryFunction } from "@medusajs/modules-sdk"

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  try {
    const reviewModuleService: ReviewModuleService = req.scope.resolve(
      REVIEW_MODULE
    )
    const review = await reviewModuleService.createReviews(req.body);
    res.json({
      message: review,
    })
  } catch (error) {
    console.error("Error creating review:", error)
    res.status(500).json({
      error: "An error occurred while creating the review.",
    })
  }
}

export async function PUT(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  try {
    const reviewModuleService: ReviewModuleService = req.scope.resolve(
      REVIEW_MODULE
    )
    const review = await reviewModuleService.updateReviews(req.body);
    res.json({
      message: review,
    })
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({
      error: "An error occurred while updating the review.",
    })
  }
}

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const remoteQuery: RemoteQueryFunction = req.scope.resolve(
    ContainerRegistrationKeys.REMOTE_QUERY
  )

  let page = 0;
  if (req.query['offset'] !== undefined && req.query['offset'] !== '0') {
    page = Number(req.query['offset'])
  }

  // per page
  const perPage = Number(req.query['limit'])
  // per page * page
  const result = perPage * page

  const query = remoteQueryObjectFromString({
    entryPoint: "review",
    fields: ["*"],
    variables: {
      skip: result,
      take: perPage,
    }
  })

  try {
    const data = await remoteQuery(query);
    res.json({
      my_customs: data,
    })
  } catch (error) {
    console.error("Error querying data:", error);
    res.status(500).json({
      error: "An error occurred while fetching data.",
    })
  }
}
