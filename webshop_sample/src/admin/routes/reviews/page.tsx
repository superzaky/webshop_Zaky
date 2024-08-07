import { defineRouteConfig } from "@medusajs/admin-shared"
import { ChatBubbleLeftRight } from "@medusajs/icons"
import { Container, Table } from "@medusajs/ui"
import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"

const CustomPage = () => {
  const [reviews, setReviews] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const pageLimit = 10;
  const [count, setCount] = useState(0);

  const pagesCount = useMemo(() => {
    return Math.ceil(count / pageLimit);
  }, [count]);

  const canNextPage = useMemo(() => currentPage < pagesCount - 1, [currentPage, pagesCount]);
  const canPreviousPage = useMemo(() => currentPage > 0, [currentPage]);

  const nextPage = () => {
    if (canNextPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const previousPage = () => {
    if (canPreviousPage) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const fetchReviews = () => {
      const query = new URLSearchParams({
        limit: `${pageLimit}`,
        offset: `${currentPage}`,
      });
      console.log('query ', query.toString());
      fetch(`/store/review?${query.toString()}`, {
        credentials: "omit",
      })
        .then((res) => 
          res.json()
        )
        .then((res) => {
          console.log(' res ', res['my_customs']['rows']);
          setReviews(res['my_customs']['rows']);
          setCount(res['my_customs']['metadata']['count']);
        });
    };

    fetchReviews();
  }, [currentPage]);

  return (
    <Container>
      <h1>This is my custom route</h1>

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
              <Table.Cell>{review.title}</Table.Cell>
              <Table.Cell>
                <Link to={`/products/${review.id}`}>View Product</Link>
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
  );
};

export const config = defineRouteConfig({
  label: "Reviews",
  icon: ChatBubbleLeftRight,
});

export default CustomPage;
