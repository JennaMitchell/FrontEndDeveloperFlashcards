import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import classes from "./MatchingQuestionsTermsResults.module.css";

const MatchingQuestionsTermsResults = ({
  displaySideOne,
  numberOfQuestions,
  index,
  answer,
}) => {
  const testAnswersArray = useSelector((state) => state.testAnswersArray);
  const lengthOfMultipleAndTrueOrFalseQuestions = useSelector(
    (state) => state.lengthOfMultipleAndTrueOrFalseQuestions
  );
  const [answerCorrectly, setAnsweredCorrectly] = useState();

  useEffect(() => {
    setAnsweredCorrectly(null);

    if (testAnswersArray) {
      if (
        testAnswersArray[index + lengthOfMultipleAndTrueOrFalseQuestions]
          .usersAnswer === answer
      ) {
        setAnsweredCorrectly(true);
      } else {
        setAnsweredCorrectly(false);
      }
    }
  }, []);

  return (
    <div className={classes.questionSection}>
      {testAnswersArray ? (
        <div
          className={`${classes.dragIntoSections} ${
            answerCorrectly ? classes.correctAnswer : classes.wrongAnswer
          } `}
        >
          {
            testAnswersArray[index + lengthOfMultipleAndTrueOrFalseQuestions]
              .usersAnswer
          }
        </div>
      ) : (
        ""
      )}
      <div className={classes.answerSection}>{displaySideOne}</div>
    </div>
  );
};

export default MatchingQuestionsTermsResults;
