import classes from "./TestPromptCard.module.css";
import { CheckIcon, DotsVerticalIcon } from "@heroicons/react/outline";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { flashcardStoreActions } from "../Store/flashcardSlice";

const TestPromptCard = ({ id, title, cardData, firstRender }) => {
  const [checkMarkClicked, setCheckedMarkClicked] = useState(false);
  const checkMarkBoxHandler = () => {
    setCheckedMarkClicked(!checkMarkClicked);
  };
  const [moreInfoClicked, setMoreInfoClicked] = useState(true);
  const moreInfoHandler = () => {
    setMoreInfoClicked(!moreInfoClicked);
  };

  const dispatch = useDispatch();
  const [firstRenderTracker, setFirstRenderTracker] = useState(false);
  const testFlashcardData = useSelector((state) => state.testFlashcardData);

  useEffect(() => {
    if (firstRender && !firstRenderTracker) {
      setFirstRenderTracker(true);
      return;
    } else {
      if (checkMarkClicked === false) {
        console.log("ADD");
        dispatch(
          flashcardStoreActions.addToTestFlashcardData({
            card: {
              data: cardData,
              prevTestFlashcardData: testFlashcardData,
            },
          })
        );
      } else if (checkMarkClicked === true) {
        console.log("SUBTRACT");
        dispatch(
          flashcardStoreActions.removeTestFlashcardData({
            card: {
              id: id,
              data: cardData,
              prevTestFlashcardData: testFlashcardData,
            },
          })
        );
      }
    }
  }, [checkMarkClicked]);

  return (
    <div className={classes.testCard}>
      <h4 className={classes.testCardTitle}>{title}</h4>
      <div className={classes.buttonsContainer}>
        <button
          className={classes.checkMarkButton}
          onClick={checkMarkBoxHandler}
        >
          {!checkMarkClicked && (
            <CheckIcon className={classes.checkMarkIcon}></CheckIcon>
          )}
        </button>
        <button className={classes.moreInfoButton} onClick={moreInfoHandler}>
          {<DotsVerticalIcon />}
        </button>
      </div>
    </div>
  );
};
export default TestPromptCard;
