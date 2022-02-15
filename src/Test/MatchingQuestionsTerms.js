import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./MatchingQuestionsTerms.module.css";
import { flashcardStoreActions } from "../Store/flashcardSlice";

const MatchingQuestionsTerms = ({
  displaySideOne,

  index,
}) => {
  const dispatch = useDispatch();
  const [answerKey, setAnswerKey] = useState(index);

  const termKey = useSelector((state) => state.termClicked);
  const termText = useSelector((state) => state.termClickedText);
  const firstRender = useSelector((state) => state.firstMatchingRender);
  const activeElementNumber = useSelector(
    (state) => state.activeMatchingElement
  );
  const prevActiveElement = useSelector((state) => state.prevActiveElement);
  const [activeElement, setActiveElement] = useState();
  const [userSelectedAnswerNumber, setUserSelectedAnswerNumber] = useState();

  const [renderText, setRenderText] = useState();
  useEffect(() => {
    if (index === 0 && !firstRender) {
      dispatch(flashcardStoreActions.setFirstMatchingRender(true));
      setRenderText("Select from list below ");
      setActiveElement(true);
      dispatch(flashcardStoreActions.setPrevActiveElement(0));
    } else {
      if (activeElementNumber === answerKey) {
        setRenderText(termText);
        setUserSelectedAnswerNumber(termKey);
        dispatch(
          flashcardStoreActions.setActiveMatchingElement(
            activeElementNumber + 1
          )
        );
        setActiveElement(false);
      }
    }
  }, [termKey]);
  useEffect(() => {
    if (answerKey === prevActiveElement) {
      setRenderText();
    }
  }, [prevActiveElement]);

  const dragIntoSectionsHandler = () => {
    if (!activeElement) {
      dispatch(flashcardStoreActions.setActiveMatchingElement(answerKey));
      setActiveElement(true);
      setRenderText("Select from list below ");
    } else {
      dispatch(flashcardStoreActions.setActiveMatchingElement(null));
      setActiveElement(false);
      setRenderText("");
    }
  };

  return (
    <div className={classes.questionSection}>
      <div
        className={`${classes.dragIntoSections} ${
          activeElement ? classes.activeElement : ""
        }`}
        onClick={dragIntoSectionsHandler}
      >
        {renderText}
      </div>
      <div className={classes.answerSection}>{displaySideOne}</div>
    </div>
  );
};

export default MatchingQuestionsTerms;
