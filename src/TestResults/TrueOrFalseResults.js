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
    console.log();
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
        console.log("setAnsweredFalse to true");
        setAnsweredFalseCorrectly(true);
      } else if (
        testAnswersArray[questionNumber - 1].usersAnswer !== answer &&
        answer === true
      ) {
        setAnsweredTrueCorrectly(false);
        setAnsweredFalseCorrectly("Wrong");
        console.log("setAnsweredFalse to Wrong");
      } else if (
        testAnswersArray[questionNumber - 1].usersAnswer !== answer &&
        answer === false
      ) {
        setAnsweredFalseCorrectly(false);
        setAnsweredTrueCorrectly("Wrong");
        console.log("setAnsweredFalse to false");
      }
    }
  }, [testAnswersArray]);
  const correctUserAnswerTag = (
    <div className={classes.correctAnswerHelperText}>Your Answer</div>
  );
  const incorrectUserAnswerTag = (
    <div className={classes.incorrectUserAnswer}>Your Answer</div>
  );

  const correctAnswerTag = (
    <div className={classes.correctAnswerHelperText}>Correct Answer</div>
  );
  console.log(index);
  console.log(answeredFalseCorrectly);
  console.log(answeredFalseCorrectly === true);
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
          } ${
            answeredFalseCorrectly === "Wrong" ? classes.correctAnswer : ""
          }  ${answeredTrueCorrectly === "Wrong" ? classes.wrongAnswer : ""} ${
            classes.answerTrue
          }`}
        >
          {answeredTrueCorrectly === true ? correctUserAnswerTag : ""}
          {answeredFalseCorrectly === "Wrong" ? correctAnswerTag : ""}
          {answeredTrueCorrectly === "Wrong" ? incorrectUserAnswerTag : ""}
          True
        </button>
        <button
          className={`${
            answeredFalseCorrectly === true ? classes.correctAnswer : ""
          } ${
            answeredTrueCorrectly === "Wrong" ? classes.correctAnswer : ""
          }   ${
            answeredFalseCorrectly === "Wrong" ? classes.wrongAnswer : ""
          } ${classes.answerFalse}`}
        >
          {answeredFalseCorrectly === true ? correctUserAnswerTag : ""}
          {answeredTrueCorrectly === "Wrong" ? correctAnswerTag : ""}
          {answeredFalseCorrectly === "Wrong" ? incorrectUserAnswerTag : ""}
          False
        </button>
      </div>
    </div>
  );
};

export default TrueOrFalseResults;
