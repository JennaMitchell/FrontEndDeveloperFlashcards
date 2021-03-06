import classes from "./MultipleChoiceQuestionsResults.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { flashcardStoreActions } from "../Store/flashcardSlice";
import { set } from "firebase/database";

const MultipleChoiceQuestionsResults = ({
  numberOfQuestions,
  questionNumber,
  answer,
  displaySide,
  wrongChoiceOne,
  wrongChoiceTwo,
  wrongChoiceThree,
  index,
}) => {
  const dispatch = useDispatch();
  const testAnswersArray = useSelector((state) => state.testAnswersArray);
  const [savedQuestionNumber, setSavedQuestionNumber] =
    useState(questionNumber);
  const [userClickedPositionZero, setUserClickedPositionZero] = useState(false);
  const [userClickedPositionOne, setUserClickedPositionOne] = useState(false);
  const [userClickedPositionTwo, setUserClickedPositionTwo] = useState(false);
  const [userClickedPositionThree, setUserClickedPositionThree] =
    useState(false);
  const [answerPositionZero, setAnswerPositionZero] = useState(false);
  const [answerPositionOne, setAnswerPositionOne] = useState(false);
  const [answerPositionTwo, setAnswerPositionTwo] = useState(false);
  const [answerPositionThree, setAnswerPositionThree] = useState(false);

  const [userAnsweredCorrectly, setUserAnswerCorrectly] = useState(false);

  const [randomAnswersArray, setRandomAnswersArray] = useState([
    answer,
    wrongChoiceOne,
    wrongChoiceTwo,
    wrongChoiceThree,
  ]);
  // useEffect(() => {
  //   console.log(questionNumber);
  //   console.log(testAnswersArray);
  // }, [testAnswersArray]);
  useEffect(() => {
    setRandomAnswersArray(
      JSON.parse(localStorage.getItem(`multipleChoice ${index}`))
    );
  }, []);
  useEffect(() => {
    setUserClickedPositionZero(false);
    setUserClickedPositionOne(false);
    setUserClickedPositionTwo(false);
    setUserClickedPositionThree(false);
    setAnswerPositionZero(false);
    setAnswerPositionOne(false);
    setAnswerPositionTwo(false);
    setAnswerPositionThree(false);
    setUserAnswerCorrectly(false);
    for (let i = 0; i < 4; i++) {
      if (testAnswersArray) {
        if (
          randomAnswersArray[i] ===
          testAnswersArray[questionNumber - 1].usersAnswer
        ) {
          if (i === 0) {
            setUserClickedPositionZero(true);
          } else if (i === 1) {
            setUserClickedPositionOne(true);
          } else if (i === 2) {
            setUserClickedPositionTwo(true);
          } else {
            setUserClickedPositionThree(true);
          }
        }
        if (randomAnswersArray[i] === answer) {
          if (i === 0) {
            setAnswerPositionZero(true);
          } else if (i === 1) {
            setAnswerPositionOne(true);
          } else if (i === 2) {
            setAnswerPositionTwo(true);
          } else {
            setAnswerPositionThree(true);
          }
        }

        if (testAnswersArray[questionNumber - 1].usersAnswer !== answer) {
          setUserAnswerCorrectly(false);
        } else {
          setUserAnswerCorrectly(true);
        }
      }
    }
  }, [randomAnswersArray]);
  const correctUserAnswerTag = (
    <div className={classes.correctAnswerHelperText}>Your Answer</div>
  );
  const incorrectUserAnswerTag = (
    <div className={classes.incorrectUserAnswer}>Your Answer</div>
  );

  const correctAnswerTag = (
    <div className={classes.correctAnswerHelperText}>Correct Answer</div>
  );

  return (
    <div className={classes.questionContainer} id={`Question${index + 1}`}>
      <p className={classes.questionNumber}>
        {questionNumber} of {numberOfQuestions}
      </p>
      <div className={classes.answerSide}>{displaySide}</div>
      <p className={classes.helperText}>Choose the matching term</p>
      <div className={classes.answerBlock}>
        <div
          className={`${
            userClickedPositionZero && userAnsweredCorrectly
              ? classes.correctAnswer
              : classes.choiceAnswerOne
          } ${
            userClickedPositionZero && !userAnsweredCorrectly
              ? classes.wrongAnswer
              : ""
          } ${
            answerPositionZero && !userAnsweredCorrectly
              ? classes.correctAnswer
              : ""
          } ${classes.choiceAnswerOne}`}
        >
          {userClickedPositionZero && userAnsweredCorrectly
            ? correctUserAnswerTag
            : ""}
          {userClickedPositionZero && !userAnsweredCorrectly
            ? incorrectUserAnswerTag
            : ""}
          {answerPositionZero && !userAnsweredCorrectly ? correctAnswerTag : ""}

          {randomAnswersArray[0]}
        </div>
        <div
          className={`${
            userClickedPositionOne && userAnsweredCorrectly
              ? classes.correctAnswer
              : ""
          } ${
            userClickedPositionOne && !userAnsweredCorrectly
              ? classes.wrongAnswer
              : ""
          } ${
            answerPositionOne && !userAnsweredCorrectly
              ? classes.correctAnswer
              : ""
          } ${classes.choiceAnswerTwo}`}
        >
          {userClickedPositionOne && userAnsweredCorrectly
            ? correctUserAnswerTag
            : ""}
          {userClickedPositionOne && !userAnsweredCorrectly
            ? incorrectUserAnswerTag
            : ""}
          {answerPositionOne && !userAnsweredCorrectly ? correctAnswerTag : ""}
          {randomAnswersArray[1]}
        </div>
        <div
          className={`${
            userClickedPositionTwo && userAnsweredCorrectly
              ? classes.correctAnswer
              : ""
          } ${
            userClickedPositionTwo && !userAnsweredCorrectly
              ? classes.wrongAnswer
              : ""
          } ${
            answerPositionTwo && !userAnsweredCorrectly
              ? classes.correctAnswer
              : ""
          } ${classes.choiceAnswerThree}`}
        >
          {userClickedPositionTwo && userAnsweredCorrectly
            ? correctUserAnswerTag
            : ""}
          {userClickedPositionTwo && !userAnsweredCorrectly
            ? incorrectUserAnswerTag
            : ""}
          {answerPositionTwo && !userAnsweredCorrectly ? correctAnswerTag : ""}
          {randomAnswersArray[2]}
        </div>
        <div
          className={`${
            userClickedPositionThree && userAnsweredCorrectly
              ? classes.correctAnswer
              : ""
          } ${
            userClickedPositionThree && !userAnsweredCorrectly
              ? classes.wrongAnswer
              : ""
          } ${
            answerPositionThree && !userAnsweredCorrectly
              ? classes.correctAnswer
              : ""
          } ${classes.choiceAnswerFour}`}
        >
          {userClickedPositionThree && userAnsweredCorrectly
            ? correctUserAnswerTag
            : ""}
          {userClickedPositionThree && !userAnsweredCorrectly
            ? incorrectUserAnswerTag
            : ""}
          {answerPositionThree && !userAnsweredCorrectly
            ? correctAnswerTag
            : ""}
          {randomAnswersArray[3]}
        </div>
      </div>
    </div>
  );
};

export default MultipleChoiceQuestionsResults;
