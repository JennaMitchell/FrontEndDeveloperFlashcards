import classes from "./TrueOrFalseResults.module.css";

import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { flashcardStoreActions } from "../Store/flashcardSlice";

const TrueOrFalseResults = ({
  numberOfQuestions,
  questionNumber,
  index,
  answer,
  displaySideOne,
  displaySideTwo,
}) => {
  const dispatch = useDispatch();

  const numberOfQuestionsAnswered = useSelector(
    (state) => state.numberOfQuestionsAnswered
  );

  const testAnswersArray = useSelector((state) => state.testAnswersArray);
  const [answeredTrueCorrectly, setAnsweredTrueCorrectly] = useState("blank");
  const [answeredFalseCorrectly, setAnsweredFalseCorrectly] = useState("blank");

  useEffect(() => {
    setAnsweredFalseCorrectly(null);
    setAnsweredTrueCorrectly(null);
    if (testAnswersArray) {
      if (
        testAnswersArray[questionNumber - 1].usersAnswer === true &&
        answer === true
      ) {
        setAnsweredTrueCorrectly(true);
      } else if (
        testAnswersArray[questionNumber - 1].usersAnswer === false &&
        answer === false
      ) {
        setAnsweredFalseCorrectly(true);
      } else if (
        testAnswersArray[questionNumber - 1].usersAnswer !== answer &&
        answer === true
      ) {
        setAnsweredTrueCorrectly(false);
        setAnsweredFalseCorrectly("Wrong");
      } else {
        setAnsweredFalseCorrectly(false);
        setAnsweredTrueCorrectly("Wrong");
      }
    }
  }, [testAnswersArray]);

  return (
    <div className={classes.questionContainer}>
      <div className={classes.questionNumber}>
        {questionNumber} of {numberOfQuestions}
      </div>
      <div className={classes.displaySideOne}>{displaySideOne}</div>
      <div className={classes.displaySideTwo}>{displaySideTwo}</div>
      <div className={classes.choiceText}>Choose Answer</div>

      <div className={classes.answerContainer}>
        <button
          className={`${
            answeredTrueCorrectly === true ? classes.correctAnswer : ""
          } ${answeredFalseCorrectly === false ? classes.correctAnswer : ""}  ${
            answeredTrueCorrectly === "Wrong" ? classes.wrongAnswer : ""
          } ${classes.answerTrue}`}
        >
          True
        </button>
        <button
          className={`${
            answeredFalseCorrectly === true ? classes.correctAnswer : ""
          } ${
            answeredFalseCorrectly === false ? classes.correctAnswer : ""
          }   ${
            answeredFalseCorrectly === "Wrong" ? classes.wrongAnswer : ""
          } ${classes.answerFalse}`}
        >
          False
        </button>
      </div>
    </div>
  );
};

export default TrueOrFalseResults;
