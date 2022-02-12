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

  const trueClickedHandler = () => {
    if (!firstTimeClicked) {
      setFirstTimeClicked(true);
      dispatch(
        flashcardStoreActions.setNumberOfQuestionsAnswered(
          numberOfQuestionsAnswered + 1
        )
      );
    }
    if (possibleSecondTimeTrueClicked && trueClicked) {
      setTrueClicked(false);
      setFalseClicked(false);
      setPossibleSecondTimeTrueClicked(false);
      dispatch(
        flashcardStoreActions.setNumberOfQuestionsAnswered(
          numberOfQuestionsAnswered - 1
        )
      );
    } else {
      setTrueClicked(true);
      setFalseClicked(false);
      setPossibleSecondTimeTrueClicked(true);
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
    } else {
      setTrueClicked(false);
      setFalseClicked(true);
      setPossibleSecondTimeFalseClicked(true);
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
