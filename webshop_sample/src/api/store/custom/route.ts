// import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";

// export async function GET(
//   req: MedusaRequest,
//   res: MedusaResponse
// ): Promise<void> {
//   res.sendStatus(200);
// }


import { MedusaRequest, MedusaResponse } from "@medusajs/medusa"
import HelloModuleService from "../../../modules/hello/service"
import { HELLO_MODULE } from "../../../modules/hello"

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const helloModuleService: HelloModuleService = req.scope.resolve(
    HELLO_MODULE
  )

  res.json({
    message: helloModuleService.getMessage(),
  })
}
