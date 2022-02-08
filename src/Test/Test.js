import classes from "./Test.module.css";
import TestNavBar from "./TestNavBar";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import MultipleChoiceQuestions from "./MultipleChoiceQuestions";

const Test = () => {
  const testFlashcardData = useSelector((state) => state.testFlashcardData);
  const multipuleChoiceSwitch = useSelector(
    (state) => state.multipuleChoiceSwitch
  );

  const trueOrFalseSwitch = useSelector((state) => state.trueOrFalseSwitch);
  const matchingSwitch = useSelector((state) => state.matchingSwitch);

  const totalNumberOfFlashcards = useSelector(
    (state) => state.totalNumberOfFlashcards
  );
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
  console.log(reactFlashcardTestSwitch);
  const javascriptFlashcardTestSwitch = useSelector(
    (state) => state.javascriptFlashcardTestSwitch
  );
  console.log(javascriptFlashcardTestSwitch);
  const dropDownMenuValue = useSelector((state) => state.dropDownMenuValue);
  const reactFlashcards = useSelector((state) => state.reactFlashcardData);
  const loadTestPage = useSelector((state) => state.loadTestPage);

  const [multipleChoiceQuestions, setMultipleChoiceQuestions] = useState();
  const [trueOrFalseQuestions, setTrueOrFalseQuestions] = useState();
  const [matchingQuestions, setMatchingQuestions] = useState();
  useEffect(() => {
    let overAllDatabase = [];
    let numberOfTrueOrFalseQuestions = 0;
    let numberOfMatchingQuestions = 0;
    let numberOfMultipleChoiceQuestions = 0;
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
    const multipuleChoiceQuestionGenerator = (numberOfQuestionsToGenerate) => {
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
          let questionTitle = `Question ${i}`;

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
            [questionTitle]: {
              questionSelection: {
                answer: questionAnswer.sideTwo,
                displaySide: questionAnswer.sideOne,
                wrongChoiceOne: randomAnswers[0],
                wrongChoiceTwo: randomAnswers[1],
                wrongChoiceThree: randomAnswers[2],
              },
            },
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
          let questionTitle = `Question ${i}`;

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
              [questionTitle]: {
                questionSelection: {
                  answer: answer,
                  displaySide: questionToTest.sideOne,
                  displaySideTwo: randomAnswers[0],
                },
              },
            });
          } else {
            answer = true;
            completedToFQuestions.push({
              [questionTitle]: {
                questionSelection: {
                  answer: answer,
                  displaySide: questionToTest.sideOne,
                  displaySideTwo: questionToTest.sideTwo,
                },
              },
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
          let questionTitle = `Question ${i}`;

          completedMatchingQuestions.push({
            [questionTitle]: {
              questionSelection: {
                answer: lettersForMatching[randomNumber1],
                displaySide: questionToTest.sideOne,
                displaySideTwo: questionToTest.sideTwo,
              },
            },
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
    console.log("Rendered");
    console.log(
      multipuleChoiceQuestionGenerator(numberOfMultipleChoiceQuestions)
    );
    setMultipleChoiceQuestions(
      multipuleChoiceQuestionGenerator(numberOfMultipleChoiceQuestions)
    );

    setTrueOrFalseQuestions(
      trueOrFalseQuestionGenerator(numberOfTrueOrFalseQuestions)
    );

    setMatchingQuestions(matchingQuestionGenerator(numberOfMatchingQuestions));
  }, [loadTestPage]);

  console.log(multipleChoiceQuestions);

  return (
    <>
      <TestNavBar />
    </>
  );
};
export default Test;
