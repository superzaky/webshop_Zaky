import { defineRouteConfig } from "@medusajs/admin-shared"
import { ChatBubbleLeftRight, EllipseGreenSolid, EllipseRedSolid, StarSolid } from "@medusajs/icons"
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

  // Utility function to format date
  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  }

  // Utility function to format date and time
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const dateOptions = { day: 'numeric', month: 'short', year: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit' };

    return `${date.toLocaleDateString('en-GB', dateOptions)}, ${date.toLocaleTimeString('en-GB', timeOptions)}`;
  }

  // Utility function to render stars based on the rating
  const renderStars = (rating) => {
    return (
      <>
        {[...Array(rating)].map((_, index) => (
          <StarSolid color="#faf323" key={index} />
        ))}
      </>
    );
  };

  return (
    <Container>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Date added</Table.HeaderCell>
            <Table.HeaderCell>Confirmed</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Verified customer</Table.HeaderCell>
            <Table.HeaderCell>Rating</Table.HeaderCell>
            <Table.HeaderCell>Locale</Table.HeaderCell>
            <Table.HeaderCell>Updated at</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {reviews.map((review) => (
            <Table.Row key={review.id}>
              <Table.Cell>{formatDate(review.created_at)}</Table.Cell>
              <Table.Cell>
                {review.confirmed ? <><EllipseGreenSolid /> Confirmed</> : <><EllipseRedSolid /> Not Confirmed</> }
              </Table.Cell>
              <Table.Cell>{review.email}</Table.Cell>
              <Table.Cell>
                {review.verified_customer ? <><EllipseGreenSolid /> Verified</> : <><EllipseRedSolid /> Unverified</> }
              </Table.Cell>
              <Table.Cell>({review.rating}){renderStars(review.rating)}</Table.Cell>
              <Table.Cell>{review.locale}</Table.Cell>
              <Table.Cell>{formatDateTime(review.updated_at)}</Table.Cell>
              <Table.Cell>
                <Link to={`/reviews/${review.id}`} state={{ review }}>View Review</Link> {/* Modified line */}
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
