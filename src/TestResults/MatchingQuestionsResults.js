import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import classes from "./MatchingQuestionsTermsResults.module.css";

const MatchingQuestionsTermsResults = ({
  displaySideOne,
  numberOfQuestions,
  index,
}) => {
  const testAnswersArray = useSelector((state) => state.testAnswersArray);
  const lengthOfMultipleAndTrueOrFalseQuestions = useSelector(
    (state) => state.lengthOfMultipleAndTrueOrFalseQuestions
  );
  const [answerCorrectly, setAnsweredCorrectly] = useState();

  useEffect(() => {
    if (
      testAnswersArray[index + lengthOfMultipleAndTrueOrFalseQuestions]
        .usersAnswer === displaySideOne
    ) {
      setAnsweredCorrectly(true);
    } else {
      setAnsweredCorrectly(false);
    }
  }, []);
  return (
    <div className={classes.questionSection}>
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
      <div className={classes.answerSection}>{displaySideOne}</div>
    </div>
  );
};

export default MatchingQuestionsTermsResults;
