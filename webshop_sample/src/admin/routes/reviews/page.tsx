import { defineRouteConfig } from "@medusajs/admin-shared"
import { ChatBubbleLeftRight } from "@medusajs/icons"
import { Container, Table  } from "@medusajs/ui"

let qwe = 'asd'
const CustomPage = () => {
  return <Container>This is my custom route {qwe}
  
  <Table>
  <Table.Header>
    <Table.Row>
      <Table.HeaderCell>#</Table.HeaderCell>
      <Table.HeaderCell>Customer</Table.HeaderCell>
      <Table.HeaderCell>Email</Table.HeaderCell>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    <Table.Row>
      <Table.Cell>1</Table.Cell>
      <Table.Cell>Emil Larsson</Table.Cell>
      <Table.Cell>emil2738@gmail.com</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>


  </Container>
}

export const config = defineRouteConfig({
  label: "Reviews",
  icon: ChatBubbleLeftRight,
})

export default CustomPage
