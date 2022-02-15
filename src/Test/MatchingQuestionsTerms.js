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
  const [nextAnswerKey, setNextAnswerKey] = useState(index + 1);
  const [prevAnswerKey, setPrevAnswerKey] = useState(index - 1);

  const termKey = useSelector((state) => state.termNumberClicked);
  const termText = useSelector((state) => state.termClickedText);

  const activeElementNumber = useSelector((state) => state.activeElementNumber);
  const prevActiveMatchingElement = useSelector(
    (state) => state.prevActiveMatchingElement
  );
  const prevActiveMatchingElementTwo = useSelector(
    (state) => state.prevActiveMatchingElementTwo
  );
  const prevActiveSwitch = useSelector(
    (state) => state.prevActiveMatchingSwitch
  );
  const [activeElement, setActiveElement] = useState(false);

  const [renderText, setRenderText] = useState("");
  const [firstRender, setFirstRender] = useState(false);
  useEffect(() => {
    if (index === 0) {
      setRenderText("Select from list below ");
      setActiveElement(true);
    }
  }, []);

  useEffect(() => {
    if (
      answerKey !== prevActiveMatchingElement &&
      activeElement &&
      prevActiveSwitch
    ) {
      setRenderText("");
      setActiveElement(false);

      dispatch(flashcardStoreActions.setPrevActiveMatchingElement(null));
    } else if (
      activeElement &&
      answerKey !== prevActiveMatchingElementTwo &&
      !prevActiveSwitch
    ) {
      setRenderText("");
      setActiveElement(false);
      dispatch(flashcardStoreActions.setPrevActiveMatchingElementTwo(null));
    }
  }, [activeElementNumber]);
  const dragIntoSectionsHandler = () => {
    if (!activeElement && renderText === "") {
      setActiveElement(true);

      setRenderText("Select from list below");
      if (prevActiveMatchingElementTwo === null) {
        dispatch(
          flashcardStoreActions.setPrevActiveMatchingElementTwo(answerKey)
        );
        dispatch(flashcardStoreActions.setPrevActiveMatchingSwitch(true));
        // we are using two previous elements s that we can save one between the renders and erase the other
      } else if (prevActiveMatchingElement === null) {
        dispatch(flashcardStoreActions.setPrevActiveMatchingElement(answerKey));
        dispatch(flashcardStoreActions.setPrevActiveMatchingSwitch(false));
      }
      dispatch(flashcardStoreActions.setActiveElementNumber(answerKey));
    }
  };
  console.log(termText);
  useEffect(() => {
    if (!firstRender) {
      setFirstRender(true);
    } else {
      setRenderText(termText);
      if (
        activeElementNumber + 1 === answerKey &&
        renderText === "" &&
        firstRender
      ) {
        setActiveElement(true);
        console.log("Entered");

        setRenderText("Select from list below ");
        dispatch(flashcardStoreActions.setActiveElementNumber(answerKey));
      }
    }
  }, [termText]);

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
