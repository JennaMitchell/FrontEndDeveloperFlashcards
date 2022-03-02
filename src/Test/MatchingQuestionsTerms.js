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
  const numberOfQuestionsAnswered = useSelector(
    (state) => state.numberOfQuestionsAnswered
  );

  const endOfQuestions = useSelector((state) => state.endOfQuestions);
  const termKey = useSelector((state) => state.termNumberClicked);
  const termText = useSelector((state) => state.termClickedText);

  const activeElementNumber = useSelector((state) => state.activeElementNumber);
  const matchingTermClicked = useSelector((state) => state.matchingTermClicked);
  const dottedBoxUpdated = useSelector((state) => state.dottedBoxUpdated);
  const testAnswersArray = useSelector((state) => state.testAnswersArray);
  const [savedNumberOfQuestions, setSavedNumberOfQuestions] =
    useState(numberOfQuestions);
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
      setRenderText("Select from list below");
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
          dispatch(
            flashcardStoreActions.setNumberOfQuestionsAnswered(
              numberOfQuestionsAnswered - 1
            )
          );
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
            setRenderText(termText);

            setActiveElement(false);
            dispatch(flashcardStoreActions.setDottedBoxUpdated(true));
            dispatch(
              flashcardStoreActions.setNumberOfQuestionsAnswered(
                numberOfQuestionsAnswered + 1
              )
            );
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

            dispatch(flashcardStoreActions.setTestAnswersArray(tempObject));
          }
        }
      }
    }
  }, [activeElementNumber, termText, matchingTermClickedTwice]);

  const allQuestionsAnsweredChecker = () => {
    let numberOfCorrectTerms = 0;
    let firstEmptyAnswer = "x";
    let firstEmptyFound = false;

    for (let i = 0; i < savedNumberOfQuestions; i++) {
      if (
        testAnswersArray[i + lengthOfMultipleAndTrueOrFalseQuestions]
          .usersAnswer !== "" &&
        testAnswersArray[i + lengthOfMultipleAndTrueOrFalseQuestions]
          .usersAnswer !== "Select from list below"
      ) {
        numberOfCorrectTerms++;
      } else {
        if (!firstEmptyFound) {
          firstEmptyFound = true;
          firstEmptyAnswer = i;
        }
      }
    }
    if (numberOfCorrectTerms === savedNumberOfQuestions) {
      dispatch(flashcardStoreActions.setAllMatchingAnswersAnswered(true));
    } else if (!endOfQuestions) {
    } else if (
      testAnswersArray[testAnswersArray.length - 1].usersAnswer !== "" &&
      testAnswersArray[testAnswersArray.length - 1].usersAnswer !==
        "Select from list below"
    ) {
      dispatch(flashcardStoreActions.setAllMatchingAnswersAnswered(false));
      dispatch(flashcardStoreActions.setEndOfQuestions(false));
    }
    return [numberOfCorrectTerms, firstEmptyAnswer];
  };
  useEffect(() => {
    // seperating into another useEffect so that we can get access to the newly
    // dispatched testAnswerArray

    if (!firstRender) {
      setFirstRender(true);
    } else {
      allQuestionsAnsweredChecker();

      if (matchingTermClickedTwice) {
        dispatch(flashcardStoreActions.setDottedBoxUpdated(false));
        dispatch(flashcardStoreActions.setMatchingTermClickedTwice(false));
      } else {
        if (
          numberOfQuestions === activeElementNumber + 1 &&
          !endOfQuestions &&
          renderText !== "Select from list below" &&
          renderText !== ""
        ) {
          dispatch(flashcardStoreActions.setEndOfQuestions(true));
        } else {
          if (
            testAnswersArray[
              activeElementNumber + lengthOfMultipleAndTrueOrFalseQuestions + 1
            ] === undefined
          ) {
            dispatch(flashcardStoreActions.setEndOfQuestions(true));
          } else if (
            testAnswersArray[
              activeElementNumber + lengthOfMultipleAndTrueOrFalseQuestions + 1
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
  }, [testAnswersArray, allMatchingAnswersAnswered]);

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
      dispatch(
        flashcardStoreActions.setNumberOfQuestionsAnswered(
          numberOfQuestionsAnswered - 1
        )
      );
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
      if (
        answerKey + lengthOfMultipleAndTrueOrFalseQuestions ===
          testAnswersArray.length - 1 &&
        !activeElement &&
        renderText !== "" &&
        testAnswersArray[answerKey + lengthOfMultipleAndTrueOrFalseQuestions]
          .usersAnswer !== ""
      ) {
        dispatch(flashcardStoreActions.setReturnedTerm(renderText));

        dispatch(flashcardStoreActions.setReturnedTermKey(termKey));
        dispatch(flashcardStoreActions.setMatchingTermClicked(false));
        setRenderText("Select from list below");
        setActiveElement(true);
        dispatch(flashcardStoreActions.setActiveElementNumber(answerKey));

        dispatch(flashcardStoreActions.setTestAnswersArray(tempObject));
        dispatch(flashcardStoreActions.setTermClickedText(""));
        dispatch(flashcardStoreActions.setTermNumberClicked(""));
      } else {
        dispatch(flashcardStoreActions.setReturnedTerm(renderText));

        dispatch(flashcardStoreActions.setReturnedTermKey(termKey));
        dispatch(flashcardStoreActions.setMatchingTermClicked(false));
        setRenderText("Select from list below");
        setActiveElement(true);
        dispatch(flashcardStoreActions.setActiveElementNumber(answerKey));

        dispatch(flashcardStoreActions.setTestAnswersArray(tempObject));
        dispatch(flashcardStoreActions.setTermClickedText(""));
        dispatch(flashcardStoreActions.setTermNumberClicked(""));
      }
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
  useEffect(() => {
    if (!firstRender) {
    } else {
      let [numberOfCorrectAnswer, firstEmptyAnswer] =
        allQuestionsAnsweredChecker();
      if (endOfQuestions) {
        if (
          testAnswersArray[
            lengthOfMultipleAndTrueOrFalseQuestions + numberOfQuestions - 1
          ].usersAnswer === ""
        ) {
          // added this so when the users clicks thae last elemetn and the first elemnt is empty it doesn't double set the active element
        } else {
          if (
            numberOfCorrectAnswer !== savedNumberOfQuestions &&
            answerKey === firstEmptyAnswer &&
            activeElementNumber + lengthOfMultipleAndTrueOrFalseQuestions ===
              testAnswersArray.length - 1
          ) {
            dispatch(flashcardStoreActions.setReturnedTerm(renderText));

            dispatch(flashcardStoreActions.setReturnedTermKey(termKey));
            dispatch(flashcardStoreActions.setMatchingTermClicked(false));
            setRenderText("Select from list below");
            setActiveElement(true);
            dispatch(flashcardStoreActions.setEndOfQuestions(false));
          } else if (
            numberOfCorrectAnswer !== savedNumberOfQuestions &&
            answerKey === firstEmptyAnswer &&
            firstEmptyAnswer + lengthOfMultipleAndTrueOrFalseQuestions !==
              testAnswersArray.length - 1
          ) {
            dispatch(flashcardStoreActions.setReturnedTerm(renderText));

            dispatch(flashcardStoreActions.setReturnedTermKey(termKey));
            dispatch(flashcardStoreActions.setMatchingTermClicked(false));
            setRenderText("Select from list below");
            setActiveElement(true);
            dispatch(flashcardStoreActions.setEndOfQuestions(false));
          }
        }
      }
    }
  }, [endOfQuestions]);

  return (
    <div className={classes.questionSection}>
      <div
        className={`${classes.dragIntoSections} ${
          activeElement ? classes.activeElement : ""
        } ${
          renderText !== "" && renderText !== "Select from list below"
            ? classes.dataEntered
            : ""
        }`}
        id={`Question${index + lengthOfMultipleAndTrueOrFalseQuestions + 1}`}
        // add gborder when text inside
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
