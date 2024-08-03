import { defineRouteConfig } from "@medusajs/admin-shared"
import { ChatBubbleLeftRight } from "@medusajs/icons"
import { Container, Heading, Table, Button, Drawer } from "@medusajs/ui"
import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"

const [reviews, setReviews] = useState([]);

const [open, setOpen] = useState(false)
  
const [currentPage, setCurrentPage] = useState(0)
const pageLimit = 10
const [count, setCount] = useState(0)
const pagesCount = useMemo(() => {
  return count / pageLimit
}, [count])
const canNextPage = useMemo(
  () => currentPage < pagesCount - 1, 
  [currentPage, pagesCount]
)
const canPreviousPage = useMemo(
  () => currentPage > 0, 
  [currentPage]
)

const nextPage = () => {
  if (canNextPage) {
    setCurrentPage((prev) => prev + 1)
  }
}

const previousPage = () => {
  if (canPreviousPage) {
    setCurrentPage((prev) => prev)
  }
}

const fetchProducts = () => {
  const query = new URLSearchParams({
    limit: `${pageLimit}`,
    offset: `${pageLimit * currentPage}`
  })
  
  fetch(`/store/review?${query.toString()}`, {
    credentials: "omit"
  })
  .then((res) => res.json())
  .then(({ 
    digital_products: data, 
    count
  }) => {
    setReviews(data)
    setCount(count)
  })
}

const CustomPage = () => {
  return <Container>This is my custom route
  
  <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {reviews.map((review) => (
            <Table.Row key={review.id}>
              <Table.Cell>
                {review.title}
              </Table.Cell>
              <Table.Cell>
                <Link to={`/products/${review.id}`}>
                  View Product
                </Link>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <Table.Pagination
        count={count}
        pageSize={pageLimit}
        pageIndex={currentPage}
        pageCount={pagesCount}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        previousPage={previousPage}
        nextPage={nextPage}
      />
  </Container>
}

export const config = defineRouteConfig({
  label: "Reviews",
  icon: ChatBubbleLeftRight,
})

export default CustomPage
