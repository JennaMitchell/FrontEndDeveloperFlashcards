import classes from "./TestNavBar.module.css";
import { PrinterIcon, MenuAlt2Icon } from "@heroicons/react/outline";
import { XIcon } from "@heroicons/react/outline";
import { useSelector } from "react-redux";
import { useBeforeunload } from "react-beforeunload";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { flashcardStoreActions } from "../Store/flashcardSlice";
import { useDispatch } from "react-redux";

const TestNavBar = ({ pageType }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState();

  const reactFlashcardTestSwitch = useSelector(
    (state) => state.reactFlashcardTestSwitch
  );
  const javascriptFlashcardTestSwitch = useSelector(
    (state) => state.javascriptFlashcardTestSwitch
  );
  const dropDownMenuValue = useSelector((state) => state.dropDownMenuValue);
  const numberOfQuestionsAnswered = useSelector(
    (state) => state.numberOfQuestionsAnswered
  );
  const questionListButtonClicked = useSelector(
    (state) => state.questionListButtonClicked
  );
  const testAnwersArray = useSelector((state) => state.testAnswersArray);
  const reactFlashcards = useSelector((state) => state.reactFlashcardData);
  const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState(0);
  const numberOfCorrectAnswersChecker = () => {
    let numberOfCorrectAnswers = 0;
    for (let i = 0; i < testAnwersArray.length; i++) {
      if (testAnwersArray[i].usersAnswer === testAnwersArray[i].answer) {
        numberOfCorrectAnswers++;
        console.log(numberOfCorrectAnswers);
      }
    }
    return numberOfCorrectAnswers;
  };
  useEffect(() => {
    if (testAnwersArray !== undefined && testAnwersArray !== null) {
      setNumberOfCorrectAnswers(numberOfCorrectAnswersChecker());
    }

    if (localStorage.getItem("title")) {
      setTitle(localStorage.getItem("title"));
    } else {
      if (reactFlashcardTestSwitch && !javascriptFlashcardTestSwitch) {
        setTitle("React Flashcard Test");
      } else if (!reactFlashcardTestSwitch && javascriptFlashcardTestSwitch) {
        setTitle("Javascript Flashcard Test");
      } else if (reactFlashcardTestSwitch && javascriptFlashcardTestSwitch) {
        setTitle("React & Javascript Flashcard Test");
      }
    }
  }, []);
  useBeforeunload(() => {
    localStorage.setItem("title", title);
  });
  useEffect(() => {
    if (testAnwersArray !== undefined && testAnwersArray !== null) {
      setNumberOfCorrectAnswers(numberOfCorrectAnswersChecker());
    }
  }, [testAnwersArray]);
  const closingIconHandler = () => {
    dispatch(flashcardStoreActions.setTestButtonClicked(true));
    dispatch(flashcardStoreActions.setReactFlashcardTestSwitch(false));
    dispatch(flashcardStoreActions.setJavascriptFlashcardTestSwitch(false));
    dispatch(flashcardStoreActions.setMultipuleChoiceSwitch(false));
    dispatch(flashcardStoreActions.setTrueOrFalseSwitch(false));
    dispatch(flashcardStoreActions.setMatchingSwitch(false));
    dispatch(flashcardStoreActions.setTestFlashcardData(null));

    dispatch(
      flashcardStoreActions.setMaxNumberOfFlashcards(reactFlashcards.length)
    );
  };
  const [menuIconClicked, setMenuIconClicked] = useState(false);
  const listButtonClicked = () => {
    dispatch(
      flashcardStoreActions.setQuestionListButtonClicked(
        !questionListButtonClicked
      )
    );
    setMenuIconClicked(!menuIconClicked);
  };

  return (
    <div className={classes.testNavBar}>
      <div
        className={`${classes.testIcon} ${classes.firstIcon} `}
        onClick={listButtonClicked}
      >
        {menuIconClicked ? (
          <XIcon
            className={`${classes.icon} ${classes.menuIcon} ${
              menuIconClicked ? classes.listIconClicked : ""
            }`}
          />
        ) : (
          <MenuAlt2Icon
            className={`${classes.icon} ${classes.menuIcon} ${
              menuIconClicked ? classes.listIconClicked : ""
            }`}
          />
        )}
      </div>
      <div className={classes.titleContainer}>
        {pageType === "results" ? (
          <p className={classes.questionTracker}>
            {numberOfCorrectAnswers} / {dropDownMenuValue} Correct
          </p>
        ) : (
          <p className={classes.questionTracker}>
            {numberOfQuestionsAnswered} / {dropDownMenuValue}
          </p>
        )}
        <p className={classes.testTitle}>{title}</p>
      </div>
      <div className={classes.testEditContainer}>
        <div className={classes.printIcon}>
          <PrinterIcon className={classes.icon} />
        </div>

        <h3 className={classes.options}>Options</h3>

        <NavLink
          className={`${classes.closeIcon} ${classes.lastIcon}`}
          to="/"
          onClick={closingIconHandler}
        >
          <XIcon className={classes.icon} />
        </NavLink>
      </div>
    </div>
  );
};
export default TestNavBar;
