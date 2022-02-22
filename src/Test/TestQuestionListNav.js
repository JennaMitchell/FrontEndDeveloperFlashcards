import classes from "./TestQuestionListNav.module.css";

import { CheckIcon, XIcon } from "@heroicons/react/outline";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const TestQuestionListNav = ({ index, pageType }) => {
  const testAnswersArray = useSelector((state) => state.testAnswersArray);
  const [renderItem, setRenderItem] = useState();
  useEffect(() => {
    console.log(testAnswersArray);

    if (testAnswersArray !== undefined) {
      if (pageType !== "results") {
        if (
          testAnswersArray[index].usersAnswer !== null &&
          testAnswersArray[index].usersAnswer !== ""
        ) {
          setRenderItem(
            <div className={classes.questionListContainer}>
              <CheckIcon className={classes.checkIcon}></CheckIcon>
              <a
                className={classes.questionLink}
                href={`#Question${index + 1}`}
              >{`Question ${index + 1}`}</a>
            </div>
          );
        } else {
          setRenderItem(
            <div className={classes.questionListContainer}>
              <a
                className={classes.questionLink}
                href={`#Question${index + 1}`}
              >{`Question ${index + 1}`}</a>
            </div>
          );
        }
      } else {
        if (
          testAnswersArray[index].usersAnswer !== testAnswersArray[index].answer
        ) {
          setRenderItem(
            <div className={classes.questionListContainer}>
              <XIcon className={classes.xIcon}></XIcon>
              <a
                className={classes.questionLink}
                href={`#Question${index + 1}`}
              >{`Question ${index + 1}`}</a>
            </div>
          );
        } else {
          setRenderItem(
            <div className={classes.questionListContainer}>
              <CheckIcon className={classes.checkIcon}></CheckIcon>
              <a
                className={classes.questionLink}
                href={`#Question${index + 1}`}
              >{`Question ${index + 1}`}</a>
            </div>
          );
        }
      }
    }
  }, [testAnswersArray]);
  return <>{renderItem}</>;
};
export default TestQuestionListNav;
