import classes from "./Header.module.css";
import { NavLink } from "react-router-dom";
import ReactLogo from "../logo.svg";
import JavascriptLogo from "../JavascriptLogo.png";

import { useSelector, useDispatch } from "react-redux";
import { flashcardStoreActions } from "../Store/flashcardSlice";
import { useEffect, useState } from "react";

const NavBar = () => {
  const dispatch = useDispatch();

  const decksButtonHandler = () => {
    dispatch(flashcardStoreActions.setDecksButtonClicked());
  };
  const toggleTestButtonClicked = () => {
    dispatch(flashcardStoreActions.setTestButtonClicked());
  };
  const deckTypeSelected = useSelector((state) => state.deckTypeSelected);
  const decksIconClicked = useSelector((state) => state.decksButtonClicked);
  const testButtonClicked = useSelector((state) => state.testButtonClicked);
  const [logo, setLogo] = useState();
  useEffect(() => {
    if (deckTypeSelected === "react") {
      setLogo(
        <img src={ReactLogo} alt="React Logo" className={classes.reactLogo} />
      );
    } else {
      setLogo(
        <img
          src={JavascriptLogo}
          alt="Javascript Logo"
          className={classes.reactLogo}
        />
      );
    }
  }, [deckTypeSelected]);

  return (
    <>
      <header
        className={`${classes.header} ${
          decksIconClicked ? classes.headerDeckButtonClicked : ""
        }`}
      >
        <div className={classes.titleContainer}>
          {logo}
          <div className={classes.title}>
            Front End Developer Interview Flashcards
          </div>
        </div>
        <div className={classes.navigationButtons}>
          <button
            className={`${classes.testButton} ${
              testButtonClicked ? classes.testButtonActive : ""
            }`}
            onClick={toggleTestButtonClicked}
          >
            Test
          </button>
          <button
            className={`${classes.decksButton} ${
              decksIconClicked ? classes.decksButtonActive : ""
            }`}
            onClick={decksButtonHandler}
          >
            Decks
          </button>
        </div>
       
      </header>
    </>
  );
};

export default NavBar;
