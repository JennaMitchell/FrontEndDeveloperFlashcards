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

  const [firstTimeClicked, setFirstTimeClicked] = useState(false);
  const [sameAnwserClicked, setSameAnswerClicked] = useState(false);

  const oneAnswerSelectedHandler = (type) => {
    if (type === "One") {
      setAnswerClickTwo(false);
      setAnswerClickThree(false);
      setAnswerClickFour(false);
    } else if (type === "Two") {
      setAnswerClickOne(false);
      setAnswerClickThree(false);
      setAnswerClickFour(false);
    } else if (type === "Three") {
      setAnswerClickOne(false);
      setAnswerClickTwo(false);
      setAnswerClickFour(false);
    } else if (type === "Four") {
      setAnswerClickOne(false);
      setAnswerClickTwo(false);
      setAnswerClickThree(false);
    }
  };

  const answerClickedHandlerOne = () => {
    if (!answerClickOne && !firstTimeClicked) {
      setFirstTimeClicked(true);
      setAnswerClickOne(true);

      dispatch(
        flashcardStoreActions.setNumberOfQuestionsAnswered(
          numberOfQuestionsAnswered + 1
        )
      );
      console.log("initial");
    } else {
      if (answerClickOne) {
        dispatch(
          flashcardStoreActions.setNumberOfQuestionsAnswered(
            numberOfQuestionsAnswered - 1
          )
        );
        oneAnswerSelectedHandler();
        setAnswerClickOne(false);
        setSameAnswerClicked(true);
        console.log("First Time Same Click");
      } else {
        if (!sameAnwserClicked) {
          setAnswerClickOne(true);
          oneAnswerSelectedHandler("One");
          setSameAnswerClicked(false);
        } else {
          dispatch(
            flashcardStoreActions.setNumberOfQuestionsAnswered(
              numberOfQuestionsAnswered + 1
            )
          );
          setAnswerClickOne(true);
          oneAnswerSelectedHandler("One");
          setSameAnswerClicked(false);
        }
      }
    }
  };
  // Second Answer
  const [answerClickTwo, setAnswerClickTwo] = useState(false);
  const answerClickedHandlerTwo = () => {
    if (!answerClickTwo && !firstTimeClicked) {
      setFirstTimeClicked(true);
      setAnswerClickTwo(true);

      dispatch(
        flashcardStoreActions.setNumberOfQuestionsAnswered(
          numberOfQuestionsAnswered + 1
        )
      );
    } else {
      if (answerClickTwo) {
        dispatch(
          flashcardStoreActions.setNumberOfQuestionsAnswered(
            numberOfQuestionsAnswered - 1
          )
        );
        oneAnswerSelectedHandler();
        setAnswerClickTwo(false);
        setSameAnswerClicked(true);
      } else {
        if (!sameAnwserClicked) {
          setAnswerClickTwo(true);
          oneAnswerSelectedHandler("Two");
          setSameAnswerClicked(false);
        } else {
          dispatch(
            flashcardStoreActions.setNumberOfQuestionsAnswered(
              numberOfQuestionsAnswered + 1
            )
          );
          setAnswerClickTwo(true);

          oneAnswerSelectedHandler("Two");
          setSameAnswerClicked(false);
        }
      }
    }
  };
  const [answerClickThree, setAnswerClickThree] = useState(false);
  const answerClickedHandlerThree = () => {
    if (!answerClickThree && !firstTimeClicked) {
      setFirstTimeClicked(true);
      setAnswerClickThree(true);

      dispatch(
        flashcardStoreActions.setNumberOfQuestionsAnswered(
          numberOfQuestionsAnswered + 1
        )
      );
    } else {
      if (answerClickThree) {
        dispatch(
          flashcardStoreActions.setNumberOfQuestionsAnswered(
            numberOfQuestionsAnswered - 1
          )
        );
        oneAnswerSelectedHandler();
        setAnswerClickThree(false);
        setSameAnswerClicked(true);
      } else {
        if (!sameAnwserClicked) {
          setAnswerClickThree(true);
          oneAnswerSelectedHandler("Three");
          setSameAnswerClicked(false);
        } else {
          dispatch(
            flashcardStoreActions.setNumberOfQuestionsAnswered(
              numberOfQuestionsAnswered + 1
            )
          );
          setAnswerClickThree(true);
          oneAnswerSelectedHandler("Three");
          setSameAnswerClicked(false);
        }
      }
    }
  };
  const [answerClickFour, setAnswerClickFour] = useState(false);
  const answerClickedHandlerFour = () => {
    if (!answerClickFour && !firstTimeClicked) {
      setFirstTimeClicked(true);
      setAnswerClickFour(true);

      dispatch(
        flashcardStoreActions.setNumberOfQuestionsAnswered(
          numberOfQuestionsAnswered + 1
        )
      );
    } else {
      if (answerClickFour) {
        dispatch(
          flashcardStoreActions.setNumberOfQuestionsAnswered(
            numberOfQuestionsAnswered - 1
          )
        );
        oneAnswerSelectedHandler();
        setAnswerClickFour(false);
        setSameAnswerClicked(true);
      } else {
        if (!sameAnwserClicked) {
          setAnswerClickFour(true);
          oneAnswerSelectedHandler("Four");
          setSameAnswerClicked(false);
        } else {
          dispatch(
            flashcardStoreActions.setNumberOfQuestionsAnswered(
              numberOfQuestionsAnswered + 1
            )
          );
          setAnswerClickFour(true);
          oneAnswerSelectedHandler("Four");
          setSameAnswerClicked(false);
        }
      }
    }
  };

  const [randomAnswersArray, setRandomAnswersArray] = useState([
    answer,
    wrongChoiceOne,
    wrongChoiceTwo,
    wrongChoiceThree,
  ]);
  useEffect(() => {
    let refreshed = JSON.parse(localStorage.getItem("refreshed"));
    if (refreshed) {
      setRandomAnswersArray(
        JSON.parse(localStorage.getItem(`multipleChoice ${index}`))
      );
    } else {
      setRandomAnswersArray(randomAnswersArray.sort(() => Math.random() - 0.5));
      let localStorageString = `multipleChoice ${index}`;
      localStorage.setItem(
        localStorageString,
        JSON.stringify(randomAnswersArray)
      );
    }
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
