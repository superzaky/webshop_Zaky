// utils/renderStars.js
import { StarSolid } from "@medusajs/icons";
import React from "react";

export const renderStars = (rating) => {
  return (
    <>
      {[...Array(rating)].map((_, index) => (
        <StarSolid color="#faf323" key={index} />
      ))}
    </>
  );
};
