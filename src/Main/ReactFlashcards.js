import classes from "./ReactFlashcards.module.css";
import { useEffect } from "react";

import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/outline";

import Flashcard from "./Flashcard";
import { flashcardStoreActions } from "../Store/flashcardSlice";
import { useSelector, useDispatch } from "react-redux";
import Menu from "./Menu";
import TestPrompt from "../TestCreator/TestPrompt";
import NavBar from "../Navigation/Header";
import { NavLink } from "react-router-dom";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

const ReactFlashcards = () => {
  const currentCard = useSelector((state) => state.currentCard);
  const testButtonClicked = useSelector((state) => state.testButtonClicked);
  const maxNumberOfFlashcards = useSelector(
    (state) => state.maxNumberOfFlashcards
  );
  const menuTitleCardNumberClicked = useSelector(
    (state) => state.menuTitleCardNumberClicked
  );

  const decksIconClicked = useSelector((state) => state.decksButtonClicked);

  // const deckTypeSelected = useSelector((state) => state.deckTypeSelected);
  const reactFlashcards = useSelector((state) => state.reactFlashcardData);
  const deckTypeSelected = useSelector((state) => state.deckTypeSelected);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(flashcardStoreActions.setCurrentCard(menuTitleCardNumberClicked));
  }, [menuTitleCardNumberClicked, dispatch]);
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
  const menuButtonClicked = useSelector((state) => state.menuClicked);
  const menuButtonClickedHandler = () => {
    if (menuButtonClicked === false) {
      dispatch(flashcardStoreActions.setMenuClicked(true));
    } else if (menuButtonClicked === true) {
      dispatch(flashcardStoreActions.setMenuClicked(false));
    }
  };
  return (
    <>
      <NavBar />

      {testButtonClicked && <TestPrompt cardType="react" />}
      <div className={classes.flashcardContainer}>
        <button
          className={`${classes.menuButton} ${
            menuButtonClicked && classes.menuButtonClicked
          } `}
          onClick={menuButtonClickedHandler}
        >
          {menuButtonClicked ? <XIcon></XIcon> : <MenuIcon></MenuIcon>}
        </button>
        <div
          className={`${classes.decksMenu} ${
            decksIconClicked ? classes.decksButtonClicked : ""
          }`}
        >
          <NavLink
            className={classes.deckSelectorButtonText}
            to="/react-flashcards"
          >
            React Flashcards
          </NavLink>

          <NavLink
            className={classes.deckSelectorButtonText}
            to="/javascript-flashcards"
          >
            Javascript Flashcards
          </NavLink>
        </div>

        <Menu flashcardData={reactFlashcards}></Menu>
        {menuButtonClicked ? (
          ""
        ) : (
          <button
            className={`${classes.flashcardButton} ${classes.leftButton}`}
            onClick={previousCardHandler}
          >
            <ChevronLeftIcon></ChevronLeftIcon>
          </button>
        )}
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
        {testButtonClicked ? (
          ""
        ) : (
          <p className={classes.pageCounter}>{`${
            maxNumberOfFlashcards === 0 ? 0 : currentCard + 1
          } of ${maxNumberOfFlashcards}`}</p>
        )}
      </div>
    </>
  );
};

export default ReactFlashcards;
