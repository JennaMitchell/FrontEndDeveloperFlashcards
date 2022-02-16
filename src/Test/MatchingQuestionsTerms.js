import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./MatchingQuestionsTerms.module.css";
import { flashcardStoreActions } from "../Store/flashcardSlice";
import JavascriptFlashcards from "../Main/JavascriptFlashcards";

const MatchingQuestionsTerms = ({
  displaySideOne,

  index,
}) => {
  const dispatch = useDispatch();
  const [answerKey, setAnswerKey] = useState(index);
  const [nextAnswerKey, setNextAnswerKey] = useState(index + 1);
  const [prevAnswerKey, setPrevAnswerKey] = useState(index - 1);

  const termKey = useSelector((state) => state.termNumberClicked);
  const termText = useSelector((state) => state.termClickedText);

  const activeElementNumber = useSelector((state) => state.activeElementNumber);
  const matchingTermClicked = useSelector((state) => state.matchingTermClicked);
  const dottedBoxUpdated = useSelector((state) => state.dottedBoxUpdated);
  const testAnswersArray = useSelector((state) => state.testAnswersArray);
  const lengthOfMultipleAndTrueOrFalseQuestions = useSelector(
    (state) => state.lengthOfMultipleAndTrueOrFalseQuestions
  );

  const [activeElement, setActiveElement] = useState(false);

  const [renderText, setRenderText] = useState("");
  const [firstRender, setFirstRender] = useState(false);
  useEffect(() => {
    if (index === 0) {
      setRenderText("Select from list below ");
      setActiveElement(true);
    }
  }, []);
  useEffect(() => {
    if (answerKey !== +activeElementNumber) {
      setActiveElement(false);

      if (renderText !== "") {
      } else {
        setRenderText("");
      }
    }
    if (answerKey === +activeElementNumber) {
      console.log("true");
      if (matchingTermClicked) {
        dispatch(flashcardStoreActions.setMatchingTermClicked(false));
        setRenderText(termText);
        setActiveElement(false);
        dispatch(flashcardStoreActions.setDottedBoxUpdated(true));
        let tempObject = testAnswersArray.map((item, index) => {
          if (
            index !==
            activeElementNumber + lengthOfMultipleAndTrueOrFalseQuestions
          ) {
            return item;
          }

          return {
            questionNumber: item.questionNumber,
            userAnswer: termText,
            answer: item.answer,
          };
        });
        dispatch(flashcardStoreActions.setTestAnswersArray(tempObject));
      }
    }
  }, [activeElementNumber, termText]);

  useEffect(() => {
    // seperating into another useEffect so that we can get access to the newly
    // dispatched testAnswerArray
    if (!firstRender) {
      setFirstRender(true);
    } else {
      console.log(testAnswersArray);
      if (
        testAnswersArray[
          activeElementNumber + lengthOfMultipleAndTrueOrFalseQuestions + 1
        ].usersAnswer === "" &&
        activeElementNumber + 1 === answerKey &&
        testAnswersArray[
          activeElementNumber + lengthOfMultipleAndTrueOrFalseQuestions + 1
        ].usersAnswer !== null
      ) {
        setActiveElement(true);
        dispatch(flashcardStoreActions.setActiveElementNumber(answerKey));
      }
    }
  }, [testAnswersArray]);

  const dottedSpaceHandler = (event) => {
    dispatch(
      flashcardStoreActions.setActiveElementNumber(
        event.target.closest("div").dataset.matchingId
      )
    );

    console.log(event.target.closest("div").dataset.matchingId);
    //dataset.matchingId
    // is how you select it
  };

  return (
    <div className={classes.questionSection}>
      <div
        className={`${classes.dragIntoSections} ${
          activeElement ? classes.activeElement : ""
        }`}
        onClick={dottedSpaceHandler}
        data-matching-id={index}
      >
        {renderText}
      </div>
      <div className={classes.answerSection}>{displaySideOne}</div>
    </div>
  );
};

export default MatchingQuestionsTerms;
