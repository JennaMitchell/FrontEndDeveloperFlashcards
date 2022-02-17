import classes from "./MatchingQuestionsAnswers.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { flashcardStoreActions } from "../Store/flashcardSlice";

const MatchingQuestionsAnswers = ({ answer, index }) => {
  const dispatch = useDispatch();
  const [termKey, setTermKey] = useState(index);
  const [termText, setTermText] = useState(answer);
  const [savedAnswer, setSavedAnswer] = useState(answer);
  const [firstTimeClicked, setFirstTimeClicked] = useState(false);
  const returnedTerm = useSelector((state) => state.returnedTerm);
  const returnedTermKey = useSelector((state) => state.returnedTermKey);
  const [firstRender, setFirstRender] = useState(false);
  const matchingTermClicked = useSelector((state) => state.matchingTermClicked);
  const dottedBoxUpdated = useSelector((state) => state.dottedBoxUpdated);
  const matchingTermClickedTwice = useSelector(
    (state) => state.matchingTermClickedTwice
  );

  const termHandler = () => {
    if (!firstTimeClicked || !matchingTermClicked) {
      console.log("first time Clicked");
      dispatch(flashcardStoreActions.setTermNumberClicked(termKey));
      dispatch(flashcardStoreActions.setTermClickedText(savedAnswer));
      dispatch(flashcardStoreActions.setMatchingTermClicked(true));
      setTermText("");
      setFirstTimeClicked(true);
    } else if (dottedBoxUpdated) {
      console.log("Second Clicked Term Box");
      setTermText(savedAnswer);
      dispatch(flashcardStoreActions.setTermNumberClicked(termKey));
      dispatch(flashcardStoreActions.setTermClickedText(savedAnswer));
      dispatch(flashcardStoreActions.setMatchingTermClickedTwice(true));
      dispatch(flashcardStoreActions.setMatchingTermClicked(false));
      setFirstTimeClicked(false);
    } else {
      dispatch(flashcardStoreActions.setTermNumberClicked(termKey));
      dispatch(flashcardStoreActions.setTermClickedText(""));
      dispatch(flashcardStoreActions.setMatchingTermClicked(true));
      setTermText(savedAnswer);
      setFirstTimeClicked(false);
    }
  };

  useEffect(() => {
    if (!firstRender) {
      setFirstRender(true);
    } else {
      console.log("returned UseEffect Ran");
      console.log(termKey);
      console.log(returnedTermKey);
      if (returnedTerm === savedAnswer) {
        console.log("Term Text Has Been Reset");
        setTermText(returnedTerm);
        setFirstTimeClicked(false);
        dispatch(flashcardStoreActions.setReturnedTerm(""));
        dispatch(flashcardStoreActions.setReturnedTermKey(""));
      }
    }
  }, [returnedTerm]);
  return (
    <div className={classes.answerTerm} onClick={termHandler}>
      {termText}
    </div>
  );
};
export default MatchingQuestionsAnswers;
