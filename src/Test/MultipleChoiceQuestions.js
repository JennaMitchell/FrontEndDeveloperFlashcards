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
  const [savedQuestionNumber, setSavedQuestionNumber] =
    useState(questionNumber);
  const testAnswersArray = useSelector((state) => state.testAnswersArray);
  const testSubmitClicked = useSelector((state) => state.testSubmitClicked);
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

  const answerClickedHandlerOne = () => {
    if (!answerClickOne && !firstTimeClicked) {
      setFirstTimeClicked(true);
      setAnswerClickOne(true);

      dispatch(
        flashcardStoreActions.setNumberOfQuestionsAnswered(
          numberOfQuestionsAnswered + 1
        )
      );
      addAnswerToTestAnswerArray(randomAnswersArray[0]);
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
        removeAnswerFromTestAnswerArray();
      } else {
        if (!sameAnwserClicked) {
          setAnswerClickOne(true);
          oneAnswerSelectedHandler("One");
          setSameAnswerClicked(false);
          addAnswerToTestAnswerArray(randomAnswersArray[0]);
        } else {
          dispatch(
            flashcardStoreActions.setNumberOfQuestionsAnswered(
              numberOfQuestionsAnswered + 1
            )
          );
          addAnswerToTestAnswerArray(randomAnswersArray[0]);
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
      addAnswerToTestAnswerArray(randomAnswersArray[1]);
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
        removeAnswerFromTestAnswerArray();
      } else {
        if (!sameAnwserClicked) {
          setAnswerClickTwo(true);
          oneAnswerSelectedHandler("Two");
          setSameAnswerClicked(false);
          addAnswerToTestAnswerArray(randomAnswersArray[1]);
        } else {
          dispatch(
            flashcardStoreActions.setNumberOfQuestionsAnswered(
              numberOfQuestionsAnswered + 1
            )
          );
          setAnswerClickTwo(true);
          addAnswerToTestAnswerArray(randomAnswersArray[1]);

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
      addAnswerToTestAnswerArray(randomAnswersArray[2]);
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
        removeAnswerFromTestAnswerArray();
      } else {
        if (!sameAnwserClicked) {
          setAnswerClickThree(true);
          oneAnswerSelectedHandler("Three");
          setSameAnswerClicked(false);
          addAnswerToTestAnswerArray(randomAnswersArray[2]);
        } else {
          dispatch(
            flashcardStoreActions.setNumberOfQuestionsAnswered(
              numberOfQuestionsAnswered + 1
            )
          );
          setAnswerClickThree(true);
          oneAnswerSelectedHandler("Three");
          setSameAnswerClicked(false);
          addAnswerToTestAnswerArray(randomAnswersArray[2]);
        }
      }
    }
  };
  const [answerClickFour, setAnswerClickFour] = useState(false);
  const answerClickedHandlerFour = () => {
    if (!answerClickFour && !firstTimeClicked) {
      setFirstTimeClicked(true);
      setAnswerClickFour(true);
      addAnswerToTestAnswerArray(randomAnswersArray[3]);

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
        removeAnswerFromTestAnswerArray();
      } else {
        if (!sameAnwserClicked) {
          setAnswerClickFour(true);
          oneAnswerSelectedHandler("Four");
          setSameAnswerClicked(false);
          addAnswerToTestAnswerArray(randomAnswersArray[3]);
        } else {
          dispatch(
            flashcardStoreActions.setNumberOfQuestionsAnswered(
              numberOfQuestionsAnswered + 1
            )
          );
          addAnswerToTestAnswerArray(randomAnswersArray[3]);
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
  // useEffect(() => {
  //   console.log(questionNumber);
  //   console.log(testAnswersArray);
  // }, [testAnswersArray]);
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
  useEffect(() => {
    if (testSubmitClicked) {
      let localStorageString = `multipleChoice ${index}`;
      localStorage.setItem(
        localStorageString,
        JSON.stringify(randomAnswersArray)
      );
    }
  }, [testSubmitClicked]);

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
