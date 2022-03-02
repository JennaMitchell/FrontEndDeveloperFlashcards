import { ref, child, get } from "firebase/database";
import databaseTest from "./Firebase";
import { flashcardStoreActions } from "../Store/flashcardSlice";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import classes from "./LocalDatabaseSetup.module.css";

const LocalDatabaseSetup = () => {
  const databaseRef = ref(databaseTest);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const awaitDatabaseData = async () => {
      const reactDB = await get(child(databaseRef, "ReactFlashcards/"));
      const javascriptDB = await get(
        child(databaseRef, "JavascriptFlashcards/")
      );

      const takeDatabaseSnapshot = (snapShot, databaseType) => {
        try {
          if (snapShot.exists()) {
            const val = snapShot.val();
            const loadedFlashcards = [];
            for (const key in val) {
              loadedFlashcards.push({
                id: key,
                title: val[key].title,
                sideOne: val[key].sideOne,
                sideTwo: val[key].sideTwo,
              });
            }
            if (databaseType === "react") {
              dispatch(
                flashcardStoreActions.setReactFlashcardData(loadedFlashcards)
              );
            } else if (databaseType === "javascript") {
              dispatch(
                flashcardStoreActions.setJavascriptFlashcardData(
                  loadedFlashcards
                )
              );

              setIsLoading(false);
            }
          } else {
          }
        } catch (error) {
          setIsLoading(false);
          setHttpError(error.message);
        }
      };
      takeDatabaseSnapshot(reactDB, "react");
      takeDatabaseSnapshot(javascriptDB, "javascript");
    };
    awaitDatabaseData();
  }, [dispatch, databaseRef]);
  if (isLoading) {
    return (
      <section className={classes.flashcardsLoading}>
        <p>Loading...</p>
      </section>
    );
  }
  if (httpError) {
    return (
      <section className={classes.httpRequestError}>
        <p>{httpError}</p>
      </section>
    );
  }
  return null;
};
export default LocalDatabaseSetup;
