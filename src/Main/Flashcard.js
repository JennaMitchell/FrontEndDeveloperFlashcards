import classes from "./Flashcard.module.css";
import React, { useState } from "react";

const Flashcard = ({ id, sideOne, sideTwo, title, show = false }) => {
  //sideOne, sideTwo, title,key,show
  const [cardClicked, setcardClicked] = useState(false);

  const flipCard = () => {
    setcardClicked(!cardClicked);
  };

  return (
    <React.Fragment>
      <div
        className={`${classes.cardFront} ${classes.card} ${
          cardClicked ? classes.cardFlip180 : classes.cardFlip0
        } ${show ? "" : classes.hidden}`}
        onClick={flipCard}
        data-id={id}
      >
        <p className={classes.textFrontSide}>{sideOne}</p>
      </div>
      <div
        className={`${classes.cardBack} ${classes.card} ${
          cardClicked ? classes.cardFlip0 : classes.cardFlip180
        } ${show ? "" : classes.hidden} `}
        onClick={flipCard}
        data-id={id}
      >
        <p className={classes.textBackSide}>{sideTwo}</p>
      </div>
    </React.Fragment>
  );
};
export default Flashcard;
