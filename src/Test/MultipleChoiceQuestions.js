import classes from "./MultipleChoiceQuestions.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { flashcardStoreActions } from "../Store/flashcardSlice";
const MultipleChoiceQuestions = ({
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
  const numberOfQuestionsAnswered = useSelector(
    (state) => state.numberOfQuestionsAnswered
  );

  const [answerClickOne, setAnswerClickOne] = useState(false);
  const [localQuestionsAnswered, setLocalQuestionsAnswered] = useState(1);
  const answerClickedHandlerOne = () => {
    setAnswerClickOne(!answerClickOne);
    setLocalQuestionsAnswered(localQuestionsAnswered + 1);
    dispatch(
      flashcardStoreActions.setNumberOfQuestionsAnswered(
        numberOfQuestionsAnswered
      )
    );
  };
  const [answerClickTwo, setAnswerClickTwo] = useState(false);
  const answerClickedHandlerTwo = () => {
    setAnswerClickTwo(!answerClickTwo);
    setLocalQuestionsAnswered(localQuestionsAnswered + 1);
    dispatch(
      flashcardStoreActions.setNumberOfQuestionsAnswered(
        numberOfQuestionsAnswered
      )
    );
  };
  const [answerClickThree, setAnswerClickThree] = useState(false);
  const answerClickedHandlerThree = () => {
    setAnswerClickThree(!answerClickThree);
    setLocalQuestionsAnswered(localQuestionsAnswered + 1);
    dispatch(
      flashcardStoreActions.setNumberOfQuestionsAnswered(
        numberOfQuestionsAnswered
      )
    );
  };
  const [answerClickFour, setAnswerClickFour] = useState(false);
  const answerClickedHandlerFour = () => {
    setAnswerClickFour(!answerClickFour);
    setLocalQuestionsAnswered(localQuestionsAnswered + 1);
    dispatch(
      flashcardStoreActions.setNumberOfQuestionsAnswered(
        numberOfQuestionsAnswered
      )
    );
  };
  const [randomAnswersArray, setRandomAnswersArray] = useState([
    answer,
    wrongChoiceOne,
    wrongChoiceTwo,
    wrongChoiceThree,
  ]);

  useEffect(() => {
    setRandomAnswersArray(randomAnswersArray.sort(() => Math.random() - 0.5));
  }, []);

  return (
    <div className={classes.questionContainer}>
      <p className={classes.questionNumber}>
        {questionNumber} of {numberOfQuestions}
      </p>
      <div className={classes.answerSide}>{displaySide}</div>
      <p className={classes.helperText}>Choose the matching term</p>
      <div className={classes.answerBlock}>
        <div
          className={`${
            answerClickOne ? classes.clickedAnswer : classes.choiceAnswerOne
          }`}
          onClick={answerClickedHandlerOne}
        >
          {randomAnswersArray[0]}
        </div>
        <div
          className={`${
            answerClickTwo ? classes.clickedAnswer : classes.choiceAnswerTwo
          }`}
          onClick={answerClickedHandlerTwo}
        >
          {randomAnswersArray[1]}
        </div>
        <div
          className={`${
            answerClickThree ? classes.clickedAnswer : classes.choiceAnswerThree
          }`}
          onClick={answerClickedHandlerThree}
        >
          {randomAnswersArray[2]}
        </div>
        <div
          className={`${
            answerClickFour ? classes.clickedAnswer : classes.choiceAnswerFour
          }`}
          onClick={answerClickedHandlerFour}
        >
          {randomAnswersArray[3]}
        </div>
      </div>
    </div>
  );
};
export default MultipleChoiceQuestions;
