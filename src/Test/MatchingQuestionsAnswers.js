import classes from "./MatchingQuestionsAnswers.module.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { flashcardStoreActions } from "../Store/flashcardSlice";
const MatchingQuestionsAnswers = ({ displaySideTwo, index }) => {
  const dispatch = useDispatch();
  const [termKey, setTermKey] = useState(index);
  const [termText, setTermText] = useState(displaySideTwo);

  const termHandler = () => {
    dispatch(flashcardStoreActions.setTermNumberClicked(termKey));
    dispatch(flashcardStoreActions.setTermSubmited(termText));
  };
  return (
    <div className={classes.answerTerm} onClick={termHandler}>
      {displaySideTwo}
    </div>
  );
};
export default MatchingQuestionsAnswers;
