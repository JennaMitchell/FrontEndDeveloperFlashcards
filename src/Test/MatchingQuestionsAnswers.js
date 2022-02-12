import classes from "./MatchingQuestionsAnswers.module.css";

const MatchingQuestionsAnswers = ({ displaySideTwo }) => {
  return <div className={classes.draggableTerm}>{displaySideTwo}</div>;
};
export default MatchingQuestionsAnswers;
