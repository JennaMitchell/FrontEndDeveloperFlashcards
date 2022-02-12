import { useState } from "react";
import classes from "./MatchingQuestions.module.css";

const MatchingQuestionsTerms = ({
  numberOfQuestions,
  answer,
  displaySideOne,
  displaySideTwo,
  index,
}) => {
  return (
    <div className={classes.questionSection}>
      <div className={classes.dragIntoSections}></div>
      <div className={classes.answerSection}>{displaySideOne}</div>
    </div>
  );
};

export default MatchingQuestionsTerms;
