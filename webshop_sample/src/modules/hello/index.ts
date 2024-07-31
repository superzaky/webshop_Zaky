import HelloModuleService from "./service"
import { Module } from "@medusajs/utils"

export const HELLO_MODULE = "helloModuleService"

export default Module(HELLO_MODULE, {
  service: HelloModuleService,
})
