import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import classes from "./TestPrompt.module.css";
import { XIcon } from "@heroicons/react/outline";
import ToggleSwitch from "./ToggleSwitch";
import { flashcardStoreActions } from "../Store/flashcardSlice";
import TestPromptCard from "./TestPromptCard";

const TestPrompt = () => {
  const dispatch = useDispatch();
  const exitButtonHandler = () => {
    dispatch(flashcardStoreActions.setTestButtonClicked(false));
  };

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
  const multipuleChoiceSwitch = useSelector(
    (state) => state.multipuleChoiceSwitch
  );
  const trueOrFalseSwitch = useSelector((state) => state.trueOrFalseSwitch);
  const matchingSwitch = useSelector((state) => state.matchingSwitch);

  const multipleChoiceSwitchHandler = () => {
    dispatch(
      flashcardStoreActions.setMultipuleChoiceSwitch(!multipuleChoiceSwitch)
    );
  };
  const trueOrFalseSwitchHandler = () => {
    dispatch(flashcardStoreActions.setTrueOrFalseSwitch(!trueOrFalseSwitch));
  };
  const matchingSwitchHandler = () => {
    dispatch(flashcardStoreActions.setMatchingSwitch(!matchingSwitch));
  };

  const testButtonClicked = useSelector((state) => state.testButtonClicked);

  const reactFlashcards = useSelector((state) => state.reactFlashcardData);
  const [arrayOfQuestionNumbers, setArrayOfQuestionNumbers] = useState([]);

  const [displayedTestSelectorCards, setDisplayedTestSelectorCards] =
    useState();
  const toggleReactFlashcards = () => {
    dispatch(
      flashcardStoreActions.setReactFlashcardTestSwitch(
        !reactFlashcardTestSwitch
      )
    );
  };
  const toggleJavascriptFlashcards = () => {
    dispatch(
      flashcardStoreActions.setJavascriptFlashcardTestSwitch(
        !javascriptFlashcardTestSwitch
      )
    );
  };
  useEffect(() => {
    let combinedData = [];
    let indexCounter2 = 0;

    for (
      let i = 0;
      i < reactFlashcards.length + javascriptFlashcards.length;
      i++
    ) {
      if (i < reactFlashcards.length) {
        combinedData[i] = reactFlashcards[i];
      } else {
        combinedData[i] = javascriptFlashcards[indexCounter2];
        indexCounter2++;
      }
    }

    dispatch(
      flashcardStoreActions.setReactJavascriptCombinedData(combinedData)
    );
    dispatch(flashcardStoreActions.setMaxNumberOfFlashcards(0));
  }, [dispatch, javascriptFlashcards, reactFlashcards]);
  useEffect(() => {
    let tempArray = [];
    let tempNumberOfQuestions = 0;
    if (matchingSwitch) {
      console.log("matchingSwitch");
      tempNumberOfQuestions = maxNumberOfFlashcards + tempNumberOfQuestions;
    }
    if (trueOrFalseSwitch) {
      console.log("trueOrFalse");
      tempNumberOfQuestions = maxNumberOfFlashcards + tempNumberOfQuestions;
    }
    if (multipuleChoiceSwitch) {
      console.log("multipleChoiceSwitch");
      tempNumberOfQuestions = maxNumberOfFlashcards + tempNumberOfQuestions;
    }

    for (let i = 0; i < tempNumberOfQuestions; i++) {
      tempArray.push(i + 1);
    }

    setArrayOfQuestionNumbers(tempArray);
  }, [
    maxNumberOfFlashcards,
    matchingSwitch,
    trueOrFalseSwitch,
    multipuleChoiceSwitch,
  ]);
  useEffect(() => {
    if (reactFlashcardTestSwitch && !javascriptFlashcardTestSwitch) {
      dispatch(flashcardStoreActions.setTestFlashcardData(reactFlashcards));
      dispatch(
        flashcardStoreActions.setTotalNumberOfFlashcards(reactFlashcards.length)
      );
      dispatch(
        flashcardStoreActions.setMaxNumberOfFlashcards(reactFlashcards.length)
      );
      setDisplayedTestSelectorCards(
        reactFlashcards.map((flashcard, index) => (
          <TestPromptCard
            key={index}
            id={index}
            title={flashcard.title}
            flashcardData={flashcard}
            firstRender={true}
          ></TestPromptCard>
        ))
      );
    } else if (javascriptFlashcardTestSwitch && reactFlashcardTestSwitch) {
      dispatch(
        flashcardStoreActions.setTestFlashcardData(reactJavascriptCombinedData)
      );
      dispatch(
        flashcardStoreActions.setTotalNumberOfFlashcards(
          reactJavascriptCombinedData.length
        )
      );
      dispatch(
        flashcardStoreActions.setMaxNumberOfFlashcards(
          reactJavascriptCombinedData.length
        )
      );
      console.log(reactJavascriptCombinedData);
      setDisplayedTestSelectorCards(
        reactJavascriptCombinedData.map((flashcard, index) => (
          <TestPromptCard
            key={index}
            id={index}
            title={flashcard.title}
            flashcardData={flashcard}
            firstRender={true}
          ></TestPromptCard>
        ))
      );
    } else if (!reactFlashcardTestSwitch && javascriptFlashcardTestSwitch) {
      dispatch(
        flashcardStoreActions.setTestFlashcardData(javascriptFlashcards)
      );
      dispatch(
        flashcardStoreActions.setTotalNumberOfFlashcards(
          javascriptFlashcards.length
        )
      );
      dispatch(
        flashcardStoreActions.setMaxNumberOfFlashcards(
          javascriptFlashcards.length
        )
      );
      setDisplayedTestSelectorCards(
        javascriptFlashcards.map((flashcard, index) => (
          <TestPromptCard
            key={index}
            id={index}
            title={flashcard.title}
            flashcardData={flashcard}
            firstRender={true}
          ></TestPromptCard>
        ))
      );
    } else {
      setDisplayedTestSelectorCards(null);

      dispatch(flashcardStoreActions.setTestFlashcardData(null));
      dispatch(flashcardStoreActions.setTotalNumberOfFlashcards(0));
      dispatch(flashcardStoreActions.setMaxNumberOfFlashcards(0));
    }
  }, [
    reactFlashcardTestSwitch,
    javascriptFlashcardTestSwitch,
    reactFlashcards,
    reactJavascriptCombinedData,
    javascriptFlashcards,
    dispatch,
  ]);

  useEffect(() => {
    if (testButtonClicked === false) {
      setDisplayedTestSelectorCards(null);
      dispatch(flashcardStoreActions.setTestFlashcardData(null));
    }
  }, [testButtonClicked, dispatch]);
  return (
    <div className={classes.blurBackground}>
      <div className={classes.testPromptWindow}>
        <button className={classes.closingIcon} onClick={exitButtonHandler}>
          <XIcon></XIcon>
        </button>

        {/* React and/or JV Card Selection */}
        <div className={classes.cardTypeSelectionContianer}>
          <h3 className={classes.testOptionsTitle}> Type Selection</h3>
          <div
            className={classes.reactToggleSwitch}
            onClick={toggleReactFlashcards}
          >
            <ToggleSwitch
              name="React Flashcards"
              toggleLabel="React Flashcards"
            ></ToggleSwitch>
          </div>
          <div
            className={classes.javascriptToggleSwitch}
            onClick={toggleJavascriptFlashcards}
          >
            <ToggleSwitch
              name="Javascript Flashcards"
              toggleLabel="Javascript Flashcards "
            ></ToggleSwitch>
          </div>
        </div>

        {/* Card Selection */}
        <div className={classes.cardSelectionSection}>
          <h3 className={classes.cardSelectorTitle}>Card Selection</h3>
          <div className={classes.cardSelector}>
            {displayedTestSelectorCards}
          </div>
        </div>

        {/* Question Type Selection */}
        <div className={classes.testOptionsContainer}>
          <h3 className={classes.testOptionsTitle}> Test Options</h3>
          <div
            className={classes.trueOrFalseSwitch}
            onClick={trueOrFalseSwitchHandler}
          >
            <ToggleSwitch name="True or False" toggleLabel="True or False" />
          </div>
          <div
            className={classes.multipleChoiceSwitch}
            onClick={multipleChoiceSwitchHandler}
          >
            <ToggleSwitch
              name="Multiple Choice"
              toggleLabel="Multiple Choice"
            ></ToggleSwitch>
          </div>
          <div
            className={classes.matchingSwitch}
            onClick={matchingSwitchHandler}
          >
            <ToggleSwitch name="Matching" toggleLabel="Matching"></ToggleSwitch>
          </div>
        </div>
        {/* Number Of Questions Selection */}

        <div className={classes.numberOfCardsSelectedHolder}>
          <h2 className={classes.testTitle}>Number Of Cards</h2>
          <h3 className={classes.numberSelectedTitle}>Flashcards Selected</h3>

          <p className={classes.numberOfSelected}>
            {`${maxNumberOfFlashcards} of ${totalNumberOfFlashcards}`}
          </p>
          <label
            htmlFor="numberOfQuestions"
            className={classes.numberOfSelected}
          >
            Number of Test Questions
          </label>
          <div>
            <select
              name="numberOfQuestions"
              id="numberOfQuestions"
              className={classes.dropDownMenu}
            >
              {arrayOfQuestionNumbers.map((value, index) => (
                <option key={index} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button className={classes.submit}>Submit</button>
      </div>
    </div>
  );
};
export default TestPrompt;
