import classes from "./MultipleChoiceQuestions.module.css";

const MultipleChoiceQuestions = ({ data, index }) => {
  console.log(data);
  return (
    <div className={classes.questionContainer}>
      <div className={classes.answerSide}></div>
    </div>
  );
};
export default MultipleChoiceQuestions;
