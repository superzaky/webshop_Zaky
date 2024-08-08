import { useParams } from "react-router-dom"
import { Container } from "@medusajs/ui"

const CustomPage = () => {
  const { id } = useParams()

  return <Container>Passed review ID: {id}</Container>
}

export default CustomPage
