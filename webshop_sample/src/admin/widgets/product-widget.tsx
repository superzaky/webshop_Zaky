import { defineWidgetConfig } from "@medusajs/admin-shared"
import { Container } from "@medusajs/ui"
import { Link } from "react-router-dom"

// The widget
const ProductWidget = () => {
  return (
    <Container>
      <Link to={"/orders"}>View Orders</Link>
    </Container>
  )
}

// The widget's configurations
export const config = defineWidgetConfig({
  zone: "product.details.before",
})

export default ProductWidget
