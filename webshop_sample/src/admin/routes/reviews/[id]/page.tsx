import { useParams, useLocation } from "react-router-dom"
import { Container, Heading, Button } from "@medusajs/ui"
import { EllipseGreenSolid, EllipseRedSolid, ArrowLongLeft } from "@medusajs/icons"
import { renderStars } from "../utils/renderStars";
import { Link } from "react-router-dom"

const CustomPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const { review } = location.state || {}; // Retrieve the review object from the state

  return (
    <>
    <Link to={`/reviews`}><ArrowLongLeft/> Back to reviews</Link>
    <Button>Button</Button>
    <Container>
      <h1>Review ID: {id}</h1>
      
      {review ? (
        <>
          <p>Title: {review.title}</p>
          <h1><b>Email:</b></h1>    
          <p> {review.email} &nbsp; {review.verified_customer ? <><EllipseGreenSolid /> Verified</> : <><EllipseRedSolid /> Unverified</> } </p> 
          {review.confirmed ? <><EllipseGreenSolid /> Confirmed</> : <><EllipseRedSolid /> Not Confirmed</> }

          <h1><b>Locale:</b></h1>    
          <p>{review.locale}</p>
        </>
      ) : (
        <p>No review data passed.</p>
      )}
    </Container>
    <Container>
      <Heading level="h1"><b>Review</b></Heading>
      ({review.rating}){renderStars(review.rating)}
      <Heading level="h3"><b>Product(s):</b></Heading>
      <Heading level="h3"><b>Title:</b></Heading>
      <p>{review.title}</p>
      <Heading level="h3"><b>Description:</b></Heading>
      <p>{review.description}</p>
    </Container>
    </>
  );
}

export default CustomPage;
