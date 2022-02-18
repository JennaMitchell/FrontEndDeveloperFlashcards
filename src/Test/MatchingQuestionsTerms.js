import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./MatchingQuestionsTerms.module.css";
import { flashcardStoreActions } from "../Store/flashcardSlice";

const MatchingQuestionsTerms = ({
  displaySideOne,
  numberOfQuestions,
  index,
}) => {
  const dispatch = useDispatch();
  const [answerKey, setAnswerKey] = useState(index);

  const endOfQuestions = useSelector((state) => state.endOfQuestions);
  const termKey = useSelector((state) => state.termNumberClicked);
  const termText = useSelector((state) => state.termClickedText);

  const activeElementNumber = useSelector((state) => state.activeElementNumber);
  const matchingTermClicked = useSelector((state) => state.matchingTermClicked);
  const dottedBoxUpdated = useSelector((state) => state.dottedBoxUpdated);
  const testAnswersArray = useSelector((state) => state.testAnswersArray);
  const matchingTermClickedTwice = useSelector(
    (state) => state.matchingTermClickedTwice
  );
  const allMatchingAnswersAnswered = useSelector(
    (state) => state.allMatchingAnswersAnswered
  );
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
    if (!firstRender) {
    } else {
      if (matchingTermClickedTwice) {
        if (
          testAnswersArray[answerKey + lengthOfMultipleAndTrueOrFalseQuestions]
            .usersAnswer === termText
        ) {
          setRenderText("");
          let tempObject = testAnswersArray.map((item, index) => {
            if (
              testAnswersArray[
                answerKey + lengthOfMultipleAndTrueOrFalseQuestions
              ].usersAnswer !== termText
            ) {
              return item;
            }

            return {
              questionNumber: item.questionNumber,
              usersAnswer: "",
              answer: item.answer,
            };
          });
          dispatch(flashcardStoreActions.setTestAnswersArray(tempObject));
        }
      } else {
        if (answerKey !== +activeElementNumber) {
          setActiveElement(false);

          if (renderText === "Select from list below") {
            setRenderText("");
          } else if (renderText !== "") {
          } else {
            setRenderText("");
          }
        }
        if (answerKey === +activeElementNumber) {
          if (matchingTermClicked) {
            console.log(`${activeElementNumber}`);
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
                usersAnswer: termText,
                answer: item.answer,
              };
            });
            console.log(tempObject);
            dispatch(flashcardStoreActions.setTestAnswersArray(tempObject));
          }
        }
      }
    }
  }, [activeElementNumber, termText, matchingTermClickedTwice]);

  useEffect(() => {
    // seperating into another useEffect so that we can get access to the newly
    // dispatched testAnswerArray

    if (!firstRender) {
      setFirstRender(true);
    } else {
      for (let i = 0; i < numberOfQuestions; i++) {
        if (
          testAnswersArray[
            activeElementNumber + lengthOfMultipleAndTrueOrFalseQuestions
          ].usersAnswer === "" ||
          testAnswersArray[
            activeElementNumber + lengthOfMultipleAndTrueOrFalseQuestions
          ].usersAnswer === "Select from list below"
        ) {
          dispatch(flashcardStoreActions.setAllMatchingAnswersAnswered(false));
          i = numberOfQuestions + 1;
        }
        if (i === numberOfQuestions - 1) {
          dispatch(flashcardStoreActions.setAllMatchingAnswersAnswered(true));
        }
      }
      if (matchingTermClickedTwice) {
        dispatch(flashcardStoreActions.setDottedBoxUpdated(false));
        dispatch(flashcardStoreActions.setMatchingTermClickedTwice(false));
      } else {
        if (numberOfQuestions === activeElementNumber + 1) {
          dispatch(flashcardStoreActions.setEndOfQuestions(true));
        } else {
          if (endOfQuestions) {
            if (allMatchingAnswersAnswered) {
              dispatch(flashcardStoreActions.setEndOfQuestions(false));
            } else if (
              testAnswersArray[
                activeElementNumber + lengthOfMultipleAndTrueOrFalseQuestions
              ].usersAnswer === ""
            ) {
              setActiveElement(true);
              setRenderText("Select from list below");
              dispatch(flashcardStoreActions.setActiveElementNumber(answerKey));
              dispatch(flashcardStoreActions.setMatchingTermClicked(false));
              dispatch(flashcardStoreActions.setEndOfQuestions(false));
            }
          } else {
            if (
              testAnswersArray[
                activeElementNumber +
                  lengthOfMultipleAndTrueOrFalseQuestions +
                  1
              ].usersAnswer === "" &&
              activeElementNumber + 1 === answerKey &&
              matchingTermClicked
            ) {
              setActiveElement(true);
              setRenderText("Select from list below");
              dispatch(flashcardStoreActions.setActiveElementNumber(answerKey));
              dispatch(flashcardStoreActions.setMatchingTermClicked(false));
            }
          }
        }
      }
    }
  }, [testAnswersArray]);

  const dottedSpaceHandler = (event) => {
    if (
      answerKey !== activeElementNumber &&
      testAnswersArray[answerKey + lengthOfMultipleAndTrueOrFalseQuestions]
        .usersAnswer === "" &&
      renderText === ""
    ) {
      dispatch(flashcardStoreActions.setActiveElementNumber(answerKey));
      setActiveElement(true);
      setRenderText("Select from list below");
    } else if (
      answerKey === activeElementNumber &&
      renderText === "Select from list below" &&
      testAnswersArray[answerKey + lengthOfMultipleAndTrueOrFalseQuestions]
        .usersAnswer === ""
    ) {
      dispatch(flashcardStoreActions.setActiveElementNumber(answerKey));
      setActiveElement(true);
    } else if (
      !activeElement &&
      renderText !== "" &&
      testAnswersArray[answerKey + lengthOfMultipleAndTrueOrFalseQuestions]
        .usersAnswer !== ""
    ) {
      let tempObject = testAnswersArray.map((item, index) => {
        if (answerKey + lengthOfMultipleAndTrueOrFalseQuestions !== index) {
          return item;
        }

        return {
          questionNumber: item.questionNumber,
          usersAnswer: "",
          answer: item.answer,
        };
      });

      dispatch(flashcardStoreActions.setReturnedTerm(renderText));

      dispatch(flashcardStoreActions.setReturnedTermKey(termKey));
      dispatch(flashcardStoreActions.setMatchingTermClicked(false));
      setRenderText("Select from list below");
      setActiveElement(true);
      dispatch(flashcardStoreActions.setActiveElementNumber(answerKey));

      dispatch(flashcardStoreActions.setTestAnswersArray(tempObject));
      dispatch(flashcardStoreActions.setTermClickedText(""));
      dispatch(flashcardStoreActions.setTermNumberClicked(""));
      // resetting term test and term number clic kso the useeffect will re trigger when we need them to
    } else if (allMatchingAnswersAnswered) {
      let tempObject = testAnswersArray.map((item, index) => {
        if (answerKey + lengthOfMultipleAndTrueOrFalseQuestions !== index) {
          return item;
        }

        return {
          questionNumber: item.questionNumber,
          usersAnswer: "",
          answer: item.answer,
        };
      });

      dispatch(flashcardStoreActions.setReturnedTerm(renderText));

      dispatch(flashcardStoreActions.setReturnedTermKey(termKey));
      dispatch(flashcardStoreActions.setMatchingTermClicked(false));
      setRenderText("Select from list below");
      setActiveElement(true);
      dispatch(flashcardStoreActions.setActiveElementNumber(answerKey));

      dispatch(flashcardStoreActions.setTestAnswersArray(tempObject));
      dispatch(flashcardStoreActions.setTermClickedText(""));
      dispatch(flashcardStoreActions.setTermNumberClicked(""));
      dispatch(flashcardStoreActions.setAllMatchingAnswersAnswered(false));
    }
  };
  // console.log(event.target.closest("div").dataset.matchingId);

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
