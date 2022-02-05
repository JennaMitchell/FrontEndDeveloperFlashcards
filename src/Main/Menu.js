import classes from "./Menu.module.css";

import { useDispatch, useSelector } from "react-redux";
import MenuCard from "./MenuCard";
import { useEffect, useState } from "react";
import { flashcardStoreActions } from "../Store/flashcardSlice";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

const Menu = ({ flashcardData }) => {
  const dispatch = useDispatch();
  const menuIconClicked = useSelector((state) => state.menuClicked);

  const deckTypeSelected = useSelector((state) => state.deckTypeSelected);

  const menuButtonClickedHandler = () => {
    dispatch(flashcardStoreActions.setMenuClicked(!menuIconClicked));
  };

  const [menuFlashcardData, setMenuFlashcardData] = useState();
  useEffect(() => {
    setMenuFlashcardData(
      flashcardData.map((flashcard, index) => (
        <MenuCard
          key={index}
          id={index}
          title={flashcard.title}
          flashcardData={flashcard}
        ></MenuCard>
      ))
    );
  }, [deckTypeSelected, flashcardData]);

  return (
    <div
      className={`${classes.menu} ${
        menuIconClicked ? classes.menuMoveOut : ""
      } `}
    >
      <button
        className={`${classes.menuButton} `}
        onClick={menuButtonClickedHandler}
      >
        {menuIconClicked ? <XIcon></XIcon> : <MenuIcon></MenuIcon>}
      </button>
      {menuFlashcardData}
    </div>
  );
};

export default Menu;
