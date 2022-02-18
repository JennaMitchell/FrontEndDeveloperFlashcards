import classes from "./TestResults.module.css";
import TestNavBar from "../Test/TestNavBar";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useBeforeunload } from "react-beforeunload";
import { flashcardStoreActions } from "../Store/flashcardSlice";
import MatchingQuestionsTermsResults from "./MatchingQuestionsResults";
import MultipleChoiceQuestionsResults from "./MultipleChoiceQuestionsResults";
import TrueOrFalseResults from "./TrueOrFalseResults";

const TestResults = () => {
  const dispatch = useDispatch();
  const multipleChoiceQuestions = useSelector(
    (state) => state.multipleChoiceQuestions
  );
  const trueOrFalseQuestions = useSelector(
    (state) => state.trueOrFalseQuestions
  );
  const matchingQuestions = useSelector((state) => state.matchingQuestions);
  const dropDownMenuValue = useSelector((state) => state.dropDownMenuValue);

  return (
    <>
      <TestNavBar />
      <div className={classes.questionsHolder}>
        {multipleChoiceQuestions
          ? multipleChoiceQuestions.map((question, index) => (
              <MultipleChoiceQuestionsResults
                numberOfQuestions={dropDownMenuValue}
                questionNumber={index + 1}
                answer={question.answer}
                displaySide={question.displaySide}
                wrongChoiceOne={question.wrongChoiceOne}
                wrongChoiceTwo={question.wrongChoiceTwo}
                wrongChoiceThree={question.wrongChoiceThree}
                index={index}
                key={index}
              />
            ))
          : "Loading"}
        {trueOrFalseQuestions
          ? trueOrFalseQuestions.map((question, index) => (
              <TrueOrFalseResults
                numberOfQuestions={dropDownMenuValue}
                questionNumber={index + multipleChoiceQuestions.length + 1}
                answer={question.answer}
                displaySideOne={question.displaySideOne}
                displaySideTwo={question.displaySideTwo}
                index={index}
                key={index}
              />
            ))
          : ""}
        <div className={classes.matchingContainer}>
          <div className={classes.matchingTitleSection}>
            <p className={classes.matchingTitle}>Matching Questions</p>
            {!multipleChoiceQuestions ? (
              ""
            ) : (
              <p className={classes.numberOfQuestions}>
                {multipleChoiceQuestions.length +
                  trueOrFalseQuestions.length +
                  1}
                -{dropDownMenuValue} of {dropDownMenuValue}
              </p>
            )}
            <p className={classes.matchingHelperText}>
              Drag a definition to match it with a term
            </p>
          </div>
          <div className={classes.matchingSection}>
            {matchingQuestions
              ? matchingQuestions.map((question, index) => (
                  <MatchingQuestionsTermsResults
                    displaySideOne={question.displaySideOne}
                    numberOfQuestions={matchingQuestions.length}
                    index={index}
                    key={index}
                  />
                ))
              : ""}
          </div>
        </div>
      </div>
    </>
  );
};
export default TestResults;
