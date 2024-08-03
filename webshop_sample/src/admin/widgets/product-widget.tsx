import { defineWidgetConfig } from "@medusajs/admin-shared"
import { Container, Heading } from "@medusajs/ui"
import { 
  DetailWidgetProps, 
  AdminProduct,
} from "@medusajs/types"

// The widget
const ProductWidget = ({ 
  data,
}: DetailWidgetProps<AdminProduct>) => {
  return (
    <Container>
      <Heading level="h2">
        Product Widget {data.title}
      </Heading>
    </Container>
  )
}

// The widget's configurations
export const config = defineWidgetConfig({
  zone: "product.details.before",
})

export default ProductWidget
