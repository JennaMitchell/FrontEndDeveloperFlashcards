import classes from "./TestNavBar.module.css";
import {
  DocumentTextIcon,
  PrinterIcon,
  MenuAlt2Icon,
} from "@heroicons/react/outline";
import { XIcon } from "@heroicons/react/outline";
import { useSelector } from "react-redux";

const TestNavBar = () => {
  let title = "";
  const reactFlashcardTestSwitch = useSelector(
    (state) => state.reactFlashcardTestSwitch
  );
  const javascriptFlashcardTestSwitch = useSelector(
    (state) => state.javascriptFlashcardTestSwitch
  );

  if (reactFlashcardTestSwitch && !javascriptFlashcardTestSwitch) {
    title = "React Flashcard Test";
  } else if (!reactFlashcardTestSwitch && javascriptFlashcardTestSwitch) {
    title = "Javascript Flashcard Test ";
  } else if (!reactFlashcardTestSwitch && !javascriptFlashcardTestSwitch) {
    title = "React & Javascript Flashcard Test";
  }

  return (
    <div className={classes.testNavBar}>
      <div className={`${classes.testIcon} ${classes.firstIcon}`}>
        <DocumentTextIcon className={classes.icon} />
      </div>
      <div className={classes.titleContainer}>
        <p className={classes.questionTracker}> 1/3 </p>
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
