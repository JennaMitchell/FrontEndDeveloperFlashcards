import classes from "./Test.module.css";
import TestNavBar from "./TestNavBar";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import MultipleChoiceQuestions from "./MultipleChoiceQuestions";
import TrueOrFalseQuestions from "./TrueOrFalseQuestions";
import { useBeforeunload } from "react-beforeunload";
import { flashcardStoreActions } from "../Store/flashcardSlice";
import MatchingQuestionsTerms from "./MatchingQuestions";
import MatchingQuestionsAnswers from "./MatchingQuestionsAnswers";
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

  const dropDownMenuValue = useSelector((state) => state.dropDownMenuValue);
  const reactFlashcards = useSelector((state) => state.reactFlashcardData);

  const [multipleChoiceQuestions, setMultipleChoiceQuestions] = useState();
  const [trueOrFalseQuestions, setTrueOrFalseQuestions] = useState();
  const [matchingQuestions, setMatchingQuestions] = useState();

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
      } else if (!reactFlashcardTestSwitch && !javascriptFlashcardTestSwitch) {
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
            for (let j = 0; j < 3; j++) {
              const randomNumber2 = getRandomInt(overAllDatabase.length);

              if (
                overAllDatabase[randomNumber2].sideTwo !==
                testFlashcardData[randomNumber1].sideTwo
              ) {
                randomAnswers[j] = overAllDatabase[randomNumber2].sideTwo;
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
            if (coinFlip === 1) {
              answer = false;
              for (let j = 0; j < 1; j++) {
                const randomNumber2 = getRandomInt(overAllDatabase.length);
                if (
                  overAllDatabase[randomNumber2].sideTwo !==
                  testFlashcardData[randomNumber1].sideTwo
                ) {
                  randomAnswers[j] = overAllDatabase[randomNumber2].sideTwo;
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
        const arrayOfLetters = [
          "A",
          "B",
          "C",
          "D",
          "E",
          "F",
          "G",
          "H",
          "I",
          "J",
          "K",
          "L",
          "M",
          "N",
          "O",
          "P",
          "Q",
          "R",
          "S",
          "T",
          "U",
          "V",
          "W",
          "X",
          "Y",
          "Z",
        ];

        for (let i = 0; i < maxNumberOfFlashcards; i++) {
          numberOfPossibleQuestions[i] = i;
        }
        const lettersForMatching = arrayOfLetters.slice(
          -26,
          maxNumberOfFlashcards
        );

        // now that we have a  numbers array that symbols all the possible cards we could be testing on
        // we will use it to generate the questions based on how many questions were entered

        // Step 1 Grabbing the Correct Answer to a question
        for (let i = 0; i < numberOfQuestionsToGenerate; i++) {
          const randomNumber1 = getRandomInt(maxNumberOfFlashcards);
          if (numberOfPossibleQuestions.includes(randomNumber1)) {
            let questionToTest = testFlashcardData[randomNumber1];

            completedMatchingQuestions.push({
              answer: lettersForMatching[randomNumber1],
              displaySideOne: questionToTest.sideOne,
              displaySideTwo: questionToTest.sideTwo,
            });
            numberOfPossibleQuestions = numberOfPossibleQuestions.filter(
              (number) => number !== randomNumber1
            );
          } else {
            i--;
          }
        }
        return completedMatchingQuestions;
      };

      setMultipleChoiceQuestions(
        multipuleChoiceQuestionGenerator(numberOfMultipleChoiceQuestions)
      );

      setTrueOrFalseQuestions(
        trueOrFalseQuestionGenerator(numberOfTrueOrFalseQuestions)
      );

      setMatchingQuestions(
        matchingQuestionGenerator(numberOfMatchingQuestions)
      );
    }
  }, []);

  useBeforeunload(() => {
    localStorage.setItem(
      "multipleChoice",
      JSON.stringify(multipleChoiceQuestions)
    );
    localStorage.setItem("trueOrFalse", JSON.stringify(trueOrFalseQuestions));
    localStorage.setItem("matching", JSON.stringify(matchingQuestions));
    localStorage.setItem("refreshed", "true");
    localStorage.setItem("dropDownValue", JSON.stringify(dropDownMenuValue));
  });

  //[`Question ${i}`].questionSelection

  return (
    <>
      <TestNavBar />
      <div className={classes.questionsHolder}>
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
        <div className={classes.matchingContainer}>
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
          </div>
          <div className={classes.matchingAnswerSection}>
            {matchingQuestions
              ? matchingQuestions.map((question, index) => (
                  <MatchingQuestionsAnswers
                    displaySideTwo={question.displaySideTwo}
                    index={index}
                    key={index}
                  />
                ))
              : ""}
          </div>
        </div>
      </div>
    </>
  );
};
export default Test;
