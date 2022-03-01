import classes from "./JavascriptFlashcards.module.css";

import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/outline";

import Flashcard from "./Flashcard";
import { flashcardStoreActions } from "../Store/flashcardSlice";
import { useSelector, useDispatch } from "react-redux";
import Menu from "./Menu";
import TestPrompt from "../TestCreator/TestPrompt";
import { useEffect } from "react";
import NavBar from "../Navigation/Header";
import { NavLink } from "react-router-dom";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

const JavascriptFlashcards = () => {
  const currentCard = useSelector((state) => state.currentCard);
  const testButtonClicked = useSelector((state) => state.testButtonClicked);
  const deckTypeSelected = useSelector((state) => state.deckTypeSelected);
  const javascriptFlashcards = useSelector(
    (state) => state.javascriptFlashcardData
  );
  const menuTitleCardNumberClicked = useSelector(
    (state) => state.menuTitleCardNumberClicked
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

  useEffect(() => {
    dispatch(flashcardStoreActions.setCurrentCard(menuTitleCardNumberClicked));
  }, [menuTitleCardNumberClicked, dispatch]);

  const maxNumberOfFlashcards = useSelector(
    (state) => state.maxNumberOfFlashcards
  );

  const previousCardHandler = () => {
    dispatch(flashcardStoreActions.prevFlashcard());
  };
  const nextCardHandler = () => {
    dispatch(flashcardStoreActions.nextFlashcard());
  };

  const decksIconClicked = useSelector((state) => state.decksButtonClicked);
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
      {testButtonClicked && <TestPrompt cardType="javascript" />}
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
        <Menu flashcardData={javascriptFlashcards}></Menu>
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

export default JavascriptFlashcards;
