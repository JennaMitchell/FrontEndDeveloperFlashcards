import classes from "./Test.module.css";
import TestNavBar from "./TestNavBar";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import MultipleChoiceQuestions from "./MultipleChoiceQuestions";
import TrueOrFalseQuestions from "./TrueOrFalseQuestions";
import { useBeforeunload } from "react-beforeunload";
import { flashcardStoreActions } from "../Store/flashcardSlice";
import MatchingQuestionsTerms from "./MatchingQuestionsTerms";
import MatchingQuestionsAnswers from "./MatchingQuestionsAnswers";
import { NavLink } from "react-router-dom";
import TestQuestionListNav from "./TestQuestionListNav";
const Test = () => {
  const testFlashcardData = useSelector((state) => state.testFlashcardData);

  const dispatch = useDispatch();

  const maxNumberOfFlashcards = useSelector(
    (state) => state.maxNumberOfFlashcards
  );

  // maxNumberOfFlashcards is how many question the user has selected
  // so we need to use this to get the answers and generate questions
  const javascriptFlashcards = useSelector(
    (state) => state.javascriptFlashcardData
  );
  const reactJavascriptCombinedData = useSelector(
    (state) => state.reactJavascriptCombinedData
  );
  const reactFlashcardTestSwitch = useSelector(
    (state) => state.reactFlashcardTestSwitch
  );

  const javascriptFlashcardTestSwitch = useSelector(
    (state) => state.javascriptFlashcardTestSwitch
  );
  const testAnswersArray = useSelector((state) => state.testAnswersArray);
  const dropDownMenuValue = useSelector((state) => state.dropDownMenuValue);
  const reactFlashcards = useSelector((state) => state.reactFlashcardData);
  const lengthOfMultipleAndTrueOrFalseQuestions = useSelector(
    (state) => state.lengthOfMultipleAndTrueOrFalseQuestions
  );
  const [testAnswersArrayInitial, setTestAnswersArrayInitial] = useState();

  const [multipleChoiceQuestions, setMultipleChoiceQuestions] = useState();
  const [trueOrFalseQuestions, setTrueOrFalseQuestions] = useState();
  const [matchingQuestions, setMatchingQuestions] = useState();
  const [randomizedMatchingAnswers, setRandomizedMatchingAnswers] = useState();
  const [initialRender, setInitialRender] = useState(false);
  const [sumbitButtonEnabler, setSumbitButtonEnabler] = useState(false);
  const questionListButtonClicked = useSelector(
    (state) => state.questionListButtonClicked
  );

  // this useEffect is for seeing if all the questions have been answered
  useEffect(() => {
    if (!initialRender) {
    } else {
      let numberOfQuestionsAnswered = 0;
      for (let i = 0; i < testAnswersArray.length; i++) {
        if (testAnswersArray[i].usersAnswer !== "") {
          numberOfQuestionsAnswered++;
        }
      }
      if (numberOfQuestionsAnswered === testAnswersArray.length) {
        setSumbitButtonEnabler(true);
      }
    }
  }, [testAnswersArray]);

  useEffect(() => {
    let overAllDatabase = [];
    let numberOfTrueOrFalseQuestions = 0;
    let numberOfMatchingQuestions = 0;
    let numberOfMultipleChoiceQuestions = 0;
    let refreshed = JSON.parse(localStorage.getItem("refreshed"));

    if (refreshed) {
      setMultipleChoiceQuestions(
        JSON.parse(localStorage.getItem("multipleChoice"))
      );
      setTrueOrFalseQuestions(JSON.parse(localStorage.getItem("trueOrFalse")));
      setMatchingQuestions(JSON.parse(localStorage.getItem("matching")));
      setRandomizedMatchingAnswers(
        JSON.parse(localStorage.getItem("randomizedMatchingAnswers"))
      );
      dispatch(
        flashcardStoreActions.setDropDownMenuValue(
          JSON.parse(localStorage.getItem("dropDownValue"))
        )
      );
    } else {
      if (reactFlashcardTestSwitch && !javascriptFlashcardTestSwitch) {
        overAllDatabase = reactFlashcards;
      } else if (!reactFlashcardTestSwitch && javascriptFlashcardTestSwitch) {
        overAllDatabase = javascriptFlashcards;
      } else if (reactFlashcardTestSwitch && javascriptFlashcardTestSwitch) {
        overAllDatabase = reactJavascriptCombinedData;
      }
      if (dropDownMenuValue % 3 === 0) {
        numberOfTrueOrFalseQuestions = dropDownMenuValue / 3;
        numberOfMatchingQuestions = dropDownMenuValue / 3;
        numberOfMultipleChoiceQuestions = dropDownMenuValue / 3;
      } else if (dropDownMenuValue % 3 === 1) {
        numberOfTrueOrFalseQuestions = dropDownMenuValue / 3 + 1;
        numberOfMatchingQuestions = dropDownMenuValue / 3;
        numberOfMultipleChoiceQuestions = dropDownMenuValue / 3;
      } else if (dropDownMenuValue % 3 === 2) {
        numberOfTrueOrFalseQuestions = dropDownMenuValue / 3 + 1;
        numberOfMatchingQuestions = dropDownMenuValue / 3 + 1;
        numberOfMultipleChoiceQuestions = dropDownMenuValue / 3;
      }

      const getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
      };
      /////////////////////Generating Multipule Choice Questions///
      const multipuleChoiceQuestionGenerator = (
        numberOfQuestionsToGenerate
      ) => {
        let completedQuestion = [];
        let numberOfPossibleQuestions = [];
        for (let i = 0; i < maxNumberOfFlashcards; i++) {
          numberOfPossibleQuestions[i] = i;
        }
        // now that we have a  numbers array that symobls all the possible cards we could be testing on
        // we will use it to generate the questions based on how many questions were entered

        // Step 1 Grabbing the Correct Answer to a question
        for (let i = 0; i < numberOfQuestionsToGenerate; i++) {
          const randomNumber1 = getRandomInt(maxNumberOfFlashcards);

          if (numberOfPossibleQuestions.includes(randomNumber1)) {
            let questionAnswer = testFlashcardData[randomNumber1];
            numberOfPossibleQuestions = numberOfPossibleQuestions.filter(
              (number) => number !== randomNumber1
            );

            // Step 2 Grabbing the Other Answer Choices
            let randomAnswers = [];
            let randomNumbersGenerated = [];
            for (let j = 0; j < 3; j++) {
              const randomNumber2 = getRandomInt(overAllDatabase.length);

              if (
                overAllDatabase[randomNumber2].sideTwo !==
                  testFlashcardData[randomNumber1].sideTwo &&
                !randomNumbersGenerated.includes(randomNumber2)
              ) {
                randomAnswers[j] = overAllDatabase[randomNumber2].sideTwo;
                randomNumbersGenerated[j] = randomNumber2;
              } else {
                j--;
              }
            }

            completedQuestion.push({
              answer: questionAnswer.sideTwo,
              displaySide: questionAnswer.sideOne,
              wrongChoiceOne: randomAnswers[0],
              wrongChoiceTwo: randomAnswers[1],
              wrongChoiceThree: randomAnswers[2],
            });
          } else {
            i--;
          }
        }
        return completedQuestion;
      };
      /////////////////////Generating True or False Questions///
      const trueOrFalseQuestionGenerator = (numberOfQuestionsToGenerate) => {
        let completedToFQuestions = [];

        const numberOfPossibleQuestions = [];
        for (let i = 0; i < maxNumberOfFlashcards; i++) {
          numberOfPossibleQuestions[i] = i;
        }
        // now that we have a  numbers array that symobls all the possible cards we could be testing on
        // we will use it to generate the questions based on how many questions were entered

        // Step 1 Grabbing the Correct Answer to a question
        for (let i = 0; i < numberOfQuestionsToGenerate; i++) {
          const randomNumber1 = getRandomInt(maxNumberOfFlashcards);
          if (numberOfPossibleQuestions.includes(randomNumber1)) {
            let questionToTest = testFlashcardData[randomNumber1];

            // Step 2 Decideing if the answer will be true or false
            let coinFlip = getRandomInt(2);
            let answer = null;
            let randomAnswers = [];
            let randomNumbersGenerated = [];
            if (coinFlip === 1) {
              answer = false;
              for (let j = 0; j < 1; j++) {
                const randomNumber2 = getRandomInt(overAllDatabase.length);
                if (
                  overAllDatabase[randomNumber2].sideTwo !==
                    testFlashcardData[randomNumber1].sideTwo &&
                  !randomNumbersGenerated.includes(randomNumber2)
                ) {
                  randomAnswers[j] = overAllDatabase[randomNumber2].sideTwo;
                  randomNumbersGenerated[j] = randomNumber2;
                } else {
                  j--;
                }
              }

              completedToFQuestions.push({
                answer: answer,
                displaySideOne: questionToTest.sideOne,
                displaySideTwo: randomAnswers[0],
              });
            } else {
              answer = true;
              completedToFQuestions.push({
                answer: answer,
                displaySideOne: questionToTest.sideOne,
                displaySideTwo: questionToTest.sideTwo,
              });
            }
          } else {
            i--;
          }
        }
        return completedToFQuestions;
      };
      const matchingQuestionGenerator = (numberOfQuestionsToGenerate) => {
        let completedMatchingQuestions = [];
        let numberOfPossibleQuestions = [];
        let randomizedMatchingQuestionsAnswer = [];

        for (let i = 0; i < maxNumberOfFlashcards; i++) {
          numberOfPossibleQuestions[i] = i;
        }

        // now that we have a  numbers array that symbols all the possible cards we could be testing on
        // we will use it to generate the questions based on how many questions were entered

        // Step 1 Grabbing the Correct Answer to a question
        for (let i = 0; i < numberOfQuestionsToGenerate; i++) {
          const randomNumber1 = getRandomInt(maxNumberOfFlashcards);
          if (numberOfPossibleQuestions.includes(randomNumber1)) {
            let questionToTest = testFlashcardData[randomNumber1];

            completedMatchingQuestions.push({
              displaySideOne: questionToTest.sideOne,
              answer: questionToTest.sideTwo,
            });
            numberOfPossibleQuestions = numberOfPossibleQuestions.filter(
              (number) => number !== randomNumber1
            );
          } else {
            i--;
          }
        }
        for (let i = 0; i < numberOfQuestionsToGenerate; i++) {
          randomizedMatchingQuestionsAnswer.push(
            completedMatchingQuestions[i].answer
          );
        }
        randomizedMatchingQuestionsAnswer =
          randomizedMatchingQuestionsAnswer.sort(() => Math.random() - 0.5);

        return {
          completedMatchingQuestions,
          randomizedMatchingQuestionsAnswer,
        };
      };

      setMultipleChoiceQuestions(
        multipuleChoiceQuestionGenerator(numberOfMultipleChoiceQuestions)
      );

      setTrueOrFalseQuestions(
        trueOrFalseQuestionGenerator(numberOfTrueOrFalseQuestions)
      );

      const { completedMatchingQuestions, randomizedMatchingQuestionsAnswer } =
        matchingQuestionGenerator(numberOfMatchingQuestions);

      setMatchingQuestions(completedMatchingQuestions);
      setRandomizedMatchingAnswers(randomizedMatchingQuestionsAnswer);
      setInitialRender(true);
    }
  }, []);
  const testAnswersArrayGenerator = () => {
    let indexOne = 0;

    let tempTestAnswersArray = [];
    for (let i = 0; i < multipleChoiceQuestions.length; i++) {
      let tempObject = {
        questionNumber: indexOne,
        usersAnswer: "",
        answer: multipleChoiceQuestions[i].answer,
      };
      tempTestAnswersArray[indexOne] = tempObject;
      indexOne++;
    }
    for (let i = 0; i < trueOrFalseQuestions.length; i++) {
      let tempObject = {
        questionNumber: indexOne,
        usersAnswer: "",
        answer: trueOrFalseQuestions[i].answer,
      };
      tempTestAnswersArray[indexOne] = tempObject;
      indexOne++;
    }
    for (let i = 0; i < matchingQuestions.length; i++) {
      let tempObject = {
        questionNumber: indexOne,
        usersAnswer: "",
        answer: matchingQuestions[i].answer,
      };
      tempTestAnswersArray[indexOne] = tempObject;
      indexOne++;
    }
    return tempTestAnswersArray;
  };
  const [numberOfQuestionsArray, setNumberOfQuestionArray] = useState([]);
  useEffect(() => {
    let refreshed = JSON.parse(localStorage.getItem("refreshed"));
    let tempArray = [];
    for (let i = 0; i < dropDownMenuValue; i++) {
      tempArray[i] = i;
    }
    setNumberOfQuestionArray(tempArray);

    if (refreshed) {
      dispatch(
        flashcardStoreActions.setTestAnswersArray(
          JSON.parse(localStorage.getItem("testAnswersArray"))
        )
      );
      dispatch(
        flashcardStoreActions.setLengthOfMultipleAndTrueOrFalseQuestions(
          JSON.parse(
            localStorage.getItem("lengthOfMultipleAndTrueOrFalseQuestions")
          )
        )
      );
      setTestAnswersArrayInitial(
        JSON.parse(localStorage.getItem("testAnswersArray"))
      );
      setInitialRender(true);
    } else {
      if (initialRender) {
        const tempTestAnswerArray = testAnswersArrayGenerator();

        dispatch(
          flashcardStoreActions.setTestAnswersArray(tempTestAnswerArray)
        );
        setTestAnswersArrayInitial(tempTestAnswerArray);
        dispatch(
          flashcardStoreActions.setLengthOfMultipleAndTrueOrFalseQuestions(
            multipleChoiceQuestions.length + trueOrFalseQuestions.length
          )
        );
      }
    }
  }, [initialRender]);

  useBeforeunload(() => {
    localStorage.setItem(
      "multipleChoice",
      JSON.stringify(multipleChoiceQuestions)
    );
    localStorage.setItem("trueOrFalse", JSON.stringify(trueOrFalseQuestions));
    localStorage.setItem("matching", JSON.stringify(matchingQuestions));
    localStorage.setItem("refreshed", "true");
    localStorage.setItem("dropDownValue", JSON.stringify(dropDownMenuValue));
    localStorage.setItem(
      "testAnswersArray",
      JSON.stringify(testAnswersArrayInitial)
    );
    localStorage.setItem(
      "lengthOfMultipleAndTrueOrFalseQuestions",
      JSON.stringify(lengthOfMultipleAndTrueOrFalseQuestions)
    );
    localStorage.setItem(
      "randomizedMatchingAnswers",
      JSON.stringify(randomizedMatchingAnswers)
    );
  });

  //[`Question ${i}`].questionSelection

  const sumbitButtonHandler = () => {
    dispatch(flashcardStoreActions.setMatchingQuestions(matchingQuestions));
    dispatch(
      flashcardStoreActions.setMultipleChoiceQuestions(multipleChoiceQuestions)
    );
    dispatch(
      flashcardStoreActions.setTrueOrFalseQuestions(trueOrFalseQuestions)
    );
    dispatch(flashcardStoreActions.setTestAnswersArray(testAnswersArray));
    dispatch(flashcardStoreActions.setTestSubmitClicked(true));
  };

  return (
    <>
      <TestNavBar />
      <div className={classes.questionsHolder}>
        {questionListButtonClicked && (
          <div
            className={`${classes.questionListDropDown} ${
              questionListButtonClicked && classes.questionListMovedOut
            }`}
          >
            {multipleChoiceQuestions
              ? numberOfQuestionsArray.map((number, index) => (
                  <TestQuestionListNav
                    index={index}
                    key={index}
                  ></TestQuestionListNav>
                ))
              : ""}
          </div>
        )}
        {multipleChoiceQuestions
          ? multipleChoiceQuestions.map((question, index) => (
              <MultipleChoiceQuestions
                numberOfQuestions={dropDownMenuValue}
                questionNumber={index + 1}
                answer={question.answer}
                displaySide={question.displaySide}
                wrongChoiceOne={question.wrongChoiceOne}
                wrongChoiceTwo={question.wrongChoiceTwo}
                wrongChoiceThree={question.wrongChoiceThree}
                index={index}
                key={index}
              />
            ))
          : "Loading"}
        {trueOrFalseQuestions
          ? trueOrFalseQuestions.map((question, index) => (
              <TrueOrFalseQuestions
                numberOfQuestions={dropDownMenuValue}
                questionNumber={index + multipleChoiceQuestions.length + 1}
                answer={question.answer}
                displaySideOne={question.displaySideOne}
                displaySideTwo={question.displaySideTwo}
                index={index}
                key={index}
              />
            ))
          : ""}
        <div className={classes.matchingContainer} id="Question1">
          <div className={classes.matchingTitleSection}>
            <p className={classes.matchingTitle}>Matching Questions</p>
            {!multipleChoiceQuestions ? (
              ""
            ) : (
              <p className={classes.numberOfQuestions}>
                {multipleChoiceQuestions.length +
                  trueOrFalseQuestions.length +
                  1}
                -{dropDownMenuValue} of {dropDownMenuValue}
              </p>
            )}
            <p className={classes.matchingHelperText}>
              Drag a definition to match it with a term
            </p>
          </div>
          <div className={classes.matchingSection}>
            {matchingQuestions
              ? matchingQuestions.map((question, index) => (
                  <MatchingQuestionsTerms
                    displaySideOne={question.displaySideOne}
                    numberOfQuestions={matchingQuestions.length}
                    index={index}
                    key={index}
                  />
                ))
              : ""}
          </div>
          <div className={classes.matchingAnswerSection}>
            {randomizedMatchingAnswers
              ? randomizedMatchingAnswers.map((question, index) => (
                  <MatchingQuestionsAnswers
                    answer={question}
                    index={index}
                    key={index}
                  />
                ))
              : ""}
          </div>
        </div>

        <NavLink
          className={` ${
            sumbitButtonEnabler
              ? classes.sumbitButton
              : classes.sumbitButtonDisabled
          }`}
          to="/test-results"
          onClick={sumbitButtonHandler}
        >
          Submit
        </NavLink>
      </div>
    </>
  );
};
export default Test;
