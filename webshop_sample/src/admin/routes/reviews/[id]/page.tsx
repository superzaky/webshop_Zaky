import { useParams, useLocation, Link } from "react-router-dom";
import { Container, Heading, Button } from "@medusajs/ui";
import { EllipseGreenSolid, EllipseRedSolid, ArrowLongLeft } from "@medusajs/icons";
import { renderStars } from "../utils/renderStars";

const CustomPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const { review } = location.state || {}; // Retrieve the review object from the state

  // Handler for declining the review
  const handleDeclineReview = async () => {
    if (review) {
      const updatedReview = { ...review, confirmed: false };
      try {
        const response = await fetch(`/store/review`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedReview),
        });
        if (response.ok) {
          alert("Review declined successfully.");
        } else {
          alert("Failed to decline the review.");
        }
      } catch (error) {
        console.error("Error declining the review:", error);
        alert("An error occurred while declining the review.");
      }
    }
  };

  // Handler for accepting the review
  const handleAcceptReview = async () => {
    if (review) {
      const updatedReview = { ...review, confirmed: true };
      try {
        const response = await fetch(`/store/review`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedReview),
        });
        if (response.ok) {
          alert("Review accepted successfully.");
        } else {
          alert("Failed to accept the review.");
        }
      } catch (error) {
        console.error("Error accepting the review:", error);
        alert("An error occurred while accepting the review.");
      }
    }
  };

  return (
    <>
      <Link to={`/reviews`}><ArrowLongLeft /> Back to reviews</Link>
      
      {review && review.confirmed === true && (
        <Button variant="danger" onClick={handleDeclineReview}>Decline review</Button>
      )}
      
      {review && review.confirmed === false && (
        <Button variant="primary" onClick={handleAcceptReview}>Accept review</Button>
      )}

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
