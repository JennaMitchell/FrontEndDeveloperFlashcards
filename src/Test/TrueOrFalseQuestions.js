import { useState } from "react";
import classes from "./TrueOrFalseQuestions.module.css";
import { useDispatch, useSelector } from "react-redux";
import { flashcardStoreActions } from "../Store/flashcardSlice";

const TrueOrFalseQuestions = ({
  numberOfQuestions,
  questionNumber,
  index,
  answer,
  displaySideOne,
  displaySideTwo,
}) => {
  const dispatch = useDispatch();
  const [trueClicked, setTrueClicked] = useState(false);
  const [falseClicked, setFalseClicked] = useState(false);
  const [firstTimeClicked, setFirstTimeClicked] = useState(false);
  const [possibleSecondTimeTrueClicked, setPossibleSecondTimeTrueClicked] =
    useState(false);
  const [possibleSecondTimeFalseClicked, setPossibleSecondTimeFalseClicked] =
    useState(false);
  const numberOfQuestionsAnswered = useSelector(
    (state) => state.numberOfQuestionsAnswered
  );
  const [savedQuestionNumber, setSavedQuestionNumber] =
    useState(questionNumber);
  const testAnswersArray = useSelector((state) => state.testAnswersArray);
  const addAnswerToTestAnswerArray = (userAnswer) => {
    let tempObject = testAnswersArray.map((item, index) => {
      if (savedQuestionNumber - 1 !== index) {
        return item;
      }

      return {
        questionNumber: item.questionNumber,
        usersAnswer: userAnswer,
        answer: item.answer,
      };
    });
    dispatch(flashcardStoreActions.setTestAnswersArray(tempObject));
  };
  const removeAnswerFromTestAnswerArray = () => {
    let tempObject = testAnswersArray.map((item, index) => {
      if (savedQuestionNumber - 1 !== index) {
        return item;
      }

      return {
        questionNumber: item.questionNumber,
        usersAnswer: "",
        answer: item.answer,
      };
    });
    dispatch(flashcardStoreActions.setTestAnswersArray(tempObject));
  };
  const trueClickedHandler = () => {
    if (!firstTimeClicked) {
      setFirstTimeClicked(true);
      dispatch(
        flashcardStoreActions.setNumberOfQuestionsAnswered(
          numberOfQuestionsAnswered + 1
        )
      );
      addAnswerToTestAnswerArray(true);
    }
    if (possibleSecondTimeTrueClicked && trueClicked) {
      setTrueClicked(false);
      setFalseClicked(false);
      setPossibleSecondTimeTrueClicked(false);
      setFirstTimeClicked(false);
      dispatch(
        flashcardStoreActions.setNumberOfQuestionsAnswered(
          numberOfQuestionsAnswered - 1
        )
      );
      removeAnswerFromTestAnswerArray();
    } else {
      setTrueClicked(true);
      setFalseClicked(false);
      setPossibleSecondTimeTrueClicked(true);
      addAnswerToTestAnswerArray(true);
    }
  };
  const falseClickedHandler = () => {
    if (!firstTimeClicked) {
      setFirstTimeClicked(true);
      dispatch(
        flashcardStoreActions.setNumberOfQuestionsAnswered(
          numberOfQuestionsAnswered + 1
        )
      );
      addAnswerToTestAnswerArray(false);
    }
    if (possibleSecondTimeFalseClicked && falseClicked) {
      setTrueClicked(false);
      setFalseClicked(false);
      setPossibleSecondTimeFalseClicked(false);
      dispatch(
        flashcardStoreActions.setNumberOfQuestionsAnswered(
          numberOfQuestionsAnswered - 1
        )
      );
      removeAnswerFromTestAnswerArray();
    } else {
      setTrueClicked(false);
      setFalseClicked(true);
      setPossibleSecondTimeFalseClicked(true);
      addAnswerToTestAnswerArray(false);
    }
  };

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
            trueClicked ? classes.answerClicked : classes.answerTrue
          }`}
          onClick={trueClickedHandler}
        >
          True
        </button>
        <button
          className={` ${
            falseClicked ? classes.answerClicked : classes.answerFalse
          }`}
          onClick={falseClickedHandler}
        >
          False
        </button>
      </div>
    </div>
  );
};
export default TrueOrFalseQuestions;
