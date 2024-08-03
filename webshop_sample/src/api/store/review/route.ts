import { MedusaRequest, MedusaResponse } from "@medusajs/medusa"
import ReviewModuleService from "../../../modules/review/review_service"
import { REVIEW_MODULE } from "../../../modules/review"
import { remoteQueryObjectFromString, ContainerRegistrationKeys } from "@medusajs/utils"
import type { RemoteQueryFunction } from "@medusajs/modules-sdk"

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const reviewModuleService: ReviewModuleService = req.scope.resolve(
    REVIEW_MODULE
  )
  const review = await reviewModuleService.createReviews(req.body)
  res.json({
    message: review
  })
}

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const remoteQuery: RemoteQueryFunction = req.scope.resolve(
    ContainerRegistrationKeys.REMOTE_QUERY
  )

  let page = 0;
  if (req.query['offset'] !== undefined || req.query['offset'] !== '0') {
      page = Number(req.query['offset']) - 1
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

  res.json({
    my_customs: await remoteQuery(query),
  })
}
