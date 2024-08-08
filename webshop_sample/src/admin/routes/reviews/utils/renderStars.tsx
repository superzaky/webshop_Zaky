import { StarSolid } from "@medusajs/icons";

export const renderStars = (rating) => {
  return (
    <>
      {[...Array(rating)].map((_, index) => (
        <StarSolid color="#faf323" key={index} />
      ))}
    </>
  );
};
