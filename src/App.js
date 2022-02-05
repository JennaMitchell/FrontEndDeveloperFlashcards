import { Route, Routes, Navigate, Link } from "react-router-dom";

import Layout from "./Layout/Layout";

import ReactFlashcards from "./Main/ReactFlashcards";
import JavascriptFlashcards from "./Main/JavascriptFlashcards";

function App() {
  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={<Navigate replace to="/react-flashcards" />}
        ></Route>
        <Route
          path="/react-flashcards"
          element={<ReactFlashcards></ReactFlashcards>}
        ></Route>
        <Route
          path="/javascript-flashcards"
          element={<JavascriptFlashcards></JavascriptFlashcards>}
        ></Route>
      </Routes>
    </Layout>
  );
}

// add element = {<name>}
// to the route
export default App;
