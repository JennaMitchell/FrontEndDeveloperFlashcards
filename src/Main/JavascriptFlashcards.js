import classes from "./JavascriptFlashcards.module.css";

import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/outline";

import Flashcard from "./Flashcard";
import { flashcardStoreActions } from "../Store/flashcardSlice";
import { useSelector, useDispatch } from "react-redux";
import Menu from "./Menu";
import TestPrompt from "../TestCreator/TestPrompt";
import { useEffect } from "react";
import NavBar from "../Navigation/Header";

const JavascriptFlashcards = () => {
  const currentCard = useSelector((state) => state.currentCard);
  const testButtonClicked = useSelector((state) => state.testButtonClicked);
  const deckTypeSelected = useSelector((state) => state.deckTypeSelected);
  const javascriptFlashcards = useSelector(
    (state) => state.javascriptFlashcardData
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(flashcardStoreActions.setDeckTypeSelected("javascript"));
    dispatch(
      flashcardStoreActions.setDisplayedFlashcardData(javascriptFlashcards)
    );

    dispatch(
      flashcardStoreActions.setTotalNumberOfFlashcards(javascriptFlashcards)
    );

    dispatch(
      flashcardStoreActions.setMaxNumberOfFlashcards(
        javascriptFlashcards.length
      )
    );
  }, [deckTypeSelected, dispatch, javascriptFlashcards]);

  const maxNumberOfFlashcards = useSelector(
    (state) => state.maxNumberOfFlashcards
  );

  const previousCardHandler = () => {
    dispatch(flashcardStoreActions.prevFlashcard());
  };
  const nextCardHandler = () => {
    dispatch(flashcardStoreActions.nextFlashcard());
  };

  return (
    <>
      <NavBar />
      {testButtonClicked && <TestPrompt cardType="javascript" />}
      <div className={classes.flashcardContainer}>
        <Menu flashcardData={javascriptFlashcards}></Menu>
        <button
          className={`${classes.flashcardButton} ${classes.leftButton}`}
          onClick={previousCardHandler}
        >
          <ChevronLeftIcon></ChevronLeftIcon>
        </button>
        {javascriptFlashcards.map((flashcard, index) => (
          <Flashcard
            key={index}
            id={index}
            title={flashcard.title}
            sideOne={flashcard.sideOne}
            sideTwo={flashcard.sideTwo}
            show={index === currentCard}
          ></Flashcard>
        ))}
        <button
          className={`${classes.flashcardButton} ${classes.rightButton}`}
          onClick={nextCardHandler}
        >
          <ChevronRightIcon></ChevronRightIcon>
        </button>
        <p className={classes.pageCounter}>{`${
          maxNumberOfFlashcards === 0 ? 0 : currentCard + 1
        } of ${maxNumberOfFlashcards}`}</p>
      </div>
    </>
  );
};

export default JavascriptFlashcards;
