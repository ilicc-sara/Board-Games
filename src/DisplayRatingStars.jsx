import React from "react";

function DisplayRatingStars(props) {
  const { rating, displayRating, id, handleClick } = props;
  const stars = displayRating(rating);
  return (
    <div className="rating-stars">
      {stars.map((rateStar, index) => (
        <ion-icon
          key={index}
          name={`${rateStar ? "star" : "star-outline"}`}
          onClick={() => handleClick(id, index)}
        ></ion-icon>
      ))}
    </div>
  );
}

export default DisplayRatingStars;

// rateStar ? (
//   <ion-icon
//     key={index}
//     name="star"
//     onClick={() => handleClick(id, index)}
//   ></ion-icon>
// ) : (
//   <ion-icon
//     key={index}
//     name="star-outline"
//     onClick={() => handleClick(id, index)}
//   ></ion-icon>
// )
