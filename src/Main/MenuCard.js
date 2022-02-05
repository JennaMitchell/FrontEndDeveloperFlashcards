import classes from "./MenuCard.module.css";
import { MinusSmIcon, PlusSmIcon } from "@heroicons/react/outline";
import { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { flashcardStoreActions } from "../Store/flashcardSlice";

const MenuCard = ({ id, title, flashcardData }) => {
  const [isClicked, setisClicked] = useState();
  const [firstRender, setFirstRender] = useState(true);

  const dispatch = useDispatch();
  const flashcardSavedData = flashcardData;
  const displayedData = useSelector((state) => state.displayedFlashcardData);
  const addSubtractHandler = () => {
    setisClicked(!isClicked);
  };

  useEffect(() => {
    if (firstRender === true) {
      setFirstRender(false);
    } else {
      if (isClicked === false) {
        dispatch(
          flashcardStoreActions.addToDisplayedFlashcards({
            card: {
              id: id,
              data: flashcardSavedData,
              displayedData: displayedData,
            },
          })
        );
      } else if (isClicked === true) {
        dispatch(
          flashcardStoreActions.removeDisplayedFlashcard({
            card: {
              id: id,
              data: flashcardSavedData,
              displayedData: displayedData,
            },
          })
        );
      }
    }
  }, [isClicked]);

  return (
    <div className={classes.menuCardContainer}>
      <p className={classes.title}>{title}</p>
      <button className={classes.menuButton} onClick={addSubtractHandler}>
        {isClicked ? <PlusSmIcon /> : <MinusSmIcon />}
      </button>
    </div>
  );
};
export default MenuCard;