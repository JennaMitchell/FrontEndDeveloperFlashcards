import classes from "./Test.module.css";
import TestNavBar from "./TestNavBar";
import { useSelector } from "react-redux";
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
  const arrayOfRandomNumbers = [];
  for (let i = 0; i < dropDownMenuValue; i++) {
    arrayOfRandomNumbers[i] = i;
  }
  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  };
  const questionNumberHandler = () => {
    const randomNumber = getRandomInt(dropDownMenuValue);
    if (arrayOfRandomNumbers.includes(randomNumber)) {
      /// Pick up Here
    }
  };
  /////////////////////Generating True or False Questions///
  const trueOrFalseQuestions = [];
  for (let i = 0; i < numberOfTrueOrFalseQuestions; i++) {
    trueOrFalseQuestions[i] = {
      questionNumber: 1,
    };
  }

  return <TestNavBar />;
};
export default Test;
