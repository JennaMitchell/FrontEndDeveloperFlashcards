import classes from "./MatchingQuestionsAnswers.module.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { flashcardStoreActions } from "../Store/flashcardSlice";
const MatchingQuestionsAnswers = ({ displaySideTwo, index }) => {
  const dispatch = useDispatch();
  const [termKey, setTermKey] = useState(index);
  const [termText, setTermText] = useState(displaySideTwo);
  const [savedDisplaySideTwo, setSavedDisplaySideTwo] =
    useState(displaySideTwo);
  const [firstTimeClicked, setFirstTimeClicked] = useState(false);

  const termHandler = () => {
    if (!firstTimeClicked) {
      dispatch(flashcardStoreActions.setTermNumberClicked(termKey));
      dispatch(flashcardStoreActions.setTermClickedText(savedDisplaySideTwo));
      setTermText("");
      setFirstTimeClicked(true);
    } else {
      dispatch(flashcardStoreActions.setTermNumberClicked(termKey));
      dispatch(flashcardStoreActions.setTermClickedText(""));
      setTermText(savedDisplaySideTwo);
      setFirstTimeClicked(false);
    }
  };
  return (
    <div className={classes.answerTerm} onClick={termHandler}>
      {termText}
    </div>
  );
};
export default MatchingQuestionsAnswers;
