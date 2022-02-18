import { Route, Routes, Navigate } from "react-router-dom";

import Layout from "./Layout/Layout";

import ReactFlashcards from "./Main/ReactFlashcards";
import JavascriptFlashcards from "./Main/JavascriptFlashcards";
import Test from "./Test/Test";
import TestResults from "./TestResults/TestResults";

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
        <Route path="/test" element={<Test></Test>}></Route>
        <Route
          path="/test-results"
          element={<TestResults></TestResults>}
        ></Route>
      </Routes>
    </Layout>
  );
}

// add element = {<name>}
// to the route
export default App;
