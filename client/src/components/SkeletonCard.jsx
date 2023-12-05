import React from "react";

const SkeletonCard = () => {
  return (
    <div className="flex flex-col gap-4 w-96 my-2">
      <div className="skeleton h-32 w-full"></div>
      <div className="skeleton h-4 w-56"></div>
      <div className="skeleton h-4 w-full"></div>
      <div className="skeleton h-4 w-full"></div>
    </div>
  );
};

export default SkeletonCard;
