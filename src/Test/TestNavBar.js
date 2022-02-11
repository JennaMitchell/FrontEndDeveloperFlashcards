import classes from "./TestNavBar.module.css";
import {
  DocumentTextIcon,
  PrinterIcon,
  MenuAlt2Icon,
} from "@heroicons/react/outline";
import { XIcon } from "@heroicons/react/outline";
import { useSelector } from "react-redux";
import { useBeforeunload } from "react-beforeunload";
import { useEffect, useState } from "react";

const TestNavBar = () => {
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

  useEffect(() => {
    let loadedTitle = localStorage.getItem("title");
    console.log(loadedTitle);
    if (localStorage.getItem("title")) {
      setTitle(localStorage.getItem("title"));
      console.log("localStorage");
    } else {
      if (reactFlashcardTestSwitch && !javascriptFlashcardTestSwitch) {
        setTitle("React Flashcard Test");
        console.log("React Title");
      } else if (!reactFlashcardTestSwitch && javascriptFlashcardTestSwitch) {
        setTitle("Javascript Flashcard Test");
      } else if (!reactFlashcardTestSwitch && !javascriptFlashcardTestSwitch) {
        setTitle("React & Javascript Flashcard Test");
        console.log("Combined Data");
      }
    }
    console.log(title);
  }, []);
  useBeforeunload(() => {
    localStorage.setItem("title", title);
    console.log("refreshed");
  });

  return (
    <div className={classes.testNavBar}>
      <div className={`${classes.testIcon} ${classes.firstIcon}`}>
        <DocumentTextIcon className={classes.icon} />
      </div>
      <div className={classes.titleContainer}>
        <p className={classes.questionTracker}>
          {numberOfQuestionsAnswered} / {dropDownMenuValue}
        </p>
        <p className={classes.testTitle}>{title}</p>
      </div>
      <div className={classes.testEditContainer}>
        <div className={classes.printIcon}>
          <PrinterIcon className={classes.icon} />
        </div>
        <div className={classes.questionList}>
          <MenuAlt2Icon className={classes.icon} />
        </div>

        <h3 className={classes.options}>Options</h3>

        <div className={`${classes.closeIcon} ${classes.lastIcon}`}>
          <XIcon className={classes.icon} />
        </div>
      </div>
    </div>
  );
};
export default TestNavBar;
