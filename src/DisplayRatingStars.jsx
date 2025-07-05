import React from "react";

function DisplayRatingStars(props) {
  const { rating, displayRating, id, handleClick } = props;

  return (
    <div className="rating-stars">
      {displayRating(rating).map((rateStar, index) =>
        rateStar ? (
          <ion-icon
            key={index}
            name="star"
            onClick={() => handleClick(id, index)}
          ></ion-icon>
        ) : (
          <ion-icon
            key={index}
            name="star-outline"
            onClick={() => handleClick(id, index)}
          ></ion-icon>
        )
      )}
    </div>
  );
}

export default DisplayRatingStars;
