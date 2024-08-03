import { defineRouteConfig } from "@medusajs/admin-shared"
import { ChatBubbleLeftRight } from "@medusajs/icons"
import { Container } from "@medusajs/ui"

const CustomPage = () => {
  return <Container>This is my custom route</Container>
}

export const config = defineRouteConfig({
  label: "Custom Route",
  icon: ChatBubbleLeftRight,
})

export default CustomPage
