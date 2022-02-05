import classes from "./ReactFlashcards.module.css";
import { useState, useEffect } from "react";
import { ref, child, get } from "firebase/database";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/outline";

import Flashcard from "./Flashcard";
import { flashcardStoreActions } from "../Store/flashcardSlice";
import { useSelector, useDispatch } from "react-redux";
import Menu from "./Menu";
import TestPrompt from "../TestCreator/TestPrompt";

const ReactFlashcards = () => {
  const currentCard = useSelector((state) => state.currentCard);
  const testButtonClicked = useSelector((state) => state.testButtonClicked);
  const maxNumberOfFlashcards = useSelector(
    (state) => state.maxNumberOfFlashcards
  );
  // const deckTypeSelected = useSelector((state) => state.deckTypeSelected);
  const reactFlashcards = useSelector((state) => state.reactFlashcardData);
  const deckTypeSelected = useSelector((state) => state.deckTypeSelected);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(flashcardStoreActions.setDeckTypeSelected("react"));
    dispatch(flashcardStoreActions.setDisplayedFlashcardData(reactFlashcards));

    dispatch(flashcardStoreActions.setTotalNumberOfFlashcards(reactFlashcards));

    dispatch(
      flashcardStoreActions.setMaxNumberOfFlashcards(reactFlashcards.length)
    );
  }, [deckTypeSelected, dispatch, reactFlashcards]);

  const previousCardHandler = () => {
    dispatch(flashcardStoreActions.prevFlashcard());
  };
  const nextCardHandler = () => {
    dispatch(flashcardStoreActions.nextFlashcard());
  };
  // dispatch(flashcardStoreActions.setDeckTypeSelected("react"));

  return (
    <>
      {testButtonClicked && <TestPrompt />}
      <div className={classes.flashcardContainer}>
        <Menu flashcardData={reactFlashcards}></Menu>
        <button
          className={`${classes.flashcardButton} ${classes.leftButton}`}
          onClick={previousCardHandler}
        >
          <ChevronLeftIcon></ChevronLeftIcon>
        </button>
        {reactFlashcards.map((flashcard, index) => (
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

export default ReactFlashcards;
