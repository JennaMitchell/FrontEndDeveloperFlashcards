import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
  reactFlashcardData: [],
  javascriptFlashcardData: [],
  displayedFlashcardData: [],
  currentCard: 0,
  maxNumberOfFlashcards: 0,
  menuClicked: false,
  decksButtonClicked: false,
  testButtonClicked: false,
  totalNumberOfFlashcards: 0,
  deckTypeSelected: "react",
  testFlashcardData: [],
  reactJavascriptCombinedData: [],
  reactFlashcardTestSwitch: false,
  javascriptFlashcardTestSwitch: false,
  trueOrFalseSwitch: false,
  multipuleChoiceSwitch: false,
  matchingSwitch: false,
  loadTestPage: false,
  dropDownMenuValue: 0,
  loadState: [],
  numberOfQuestionsAnswered: 0,
  termNumberClicked: 0,
  termClickedText: null,
  activeElementNumber: 0,
  matchingTermClicked: false,
  dottedBoxUpdated: false,
  testAnswersArray: null,
  lengthOfMultipleAndTrueOrFalseQuestions: 0,
  endOfQuestions: false,
  returnedTerm: null,
  returnedTermKey: null,
  matchingTermClickedTwice: false,
};

const flashcardSlice = createSlice({
  name: "Flashcard Data",
  initialState: initialState,
  reducers: {
    setReactFlashcardData(state, action) {
      state.reactFlashcardData = action.payload;
    },
    setJavascriptFlashcardData(state, action) {
      state.javascriptFlashcardData = action.payload;
    },
    setDisplayedFlashcardData(state, action) {
      state.displayedFlashcardData = action.payload;
    },
    setMaxNumberOfFlashcards(state, action) {
      state.maxNumberOfFlashcards = action.payload;
    },
    setMenuClicked(state) {
      state.menuClicked = !state.menuClicked;
    },
    setDecksButtonClicked(state) {
      state.decksButtonClicked = !state.decksButtonClicked;
    },
    setTestButtonClicked(state) {
      state.testButtonClicked = !state.testButtonClicked;
    },
    setTotalNumberOfFlashcards(state, action) {
      state.totalNumberOfFlashcards = action.payload;
    },
    setDeckTypeSelected(state, action) {
      state.deckTypeSelected = action.payload;
    },
    setTestFlashcardData(state, action) {
      state.testFlashcardData = action.payload;
    },
    setReactJavascriptCombinedData(state, action) {
      state.reactJavascriptCombinedData = action.payload;
    },
    setReactFlashcardTestSwitch(state, { payload }) {
      state.reactFlashcardTestSwitch = payload;
    },
    setJavascriptFlashcardTestSwitch(state, { payload }) {
      state.javascriptFlashcardTestSwitch = payload;
    },
    setTrueOrFalseSwitch(state, { payload }) {
      state.trueOrFalseSwitch = payload;
    },
    setMultipuleChoiceSwitch(state, { payload }) {
      state.multipuleChoiceSwitch = payload;
    },
    setMatchingSwitch(state, { payload }) {
      state.matchingSwitch = payload;
    },
    setLoadTestPage(state, { payload }) {
      state.loadTestPage = payload;
    },
    setDropDownMenuValue(state, { payload }) {
      state.dropDownMenuValue = payload;
    },
    setNumberOfQuestionsAnswered(state, { payload }) {
      state.numberOfQuestionsAnswered = payload;
    },
    setTermNumberClicked(state, { payload }) {
      state.termNumberClicked = payload;
    },
    setTermClickedText(state, { payload }) {
      state.termClickedText = payload;
    },
    setActiveElementNumber(state, { payload }) {
      state.activeElementNumber = payload;
    },
    setMatchingTermClicked(state, { payload }) {
      state.matchingTermClicked = payload;
    },
    setDottedBoxUpdated(state, { payload }) {
      state.dottedBoxUpdated = payload;
    },
    setTestAnswersArray(state, { payload }) {
      state.testAnswersArray = payload;
    },
    setLengthOfMultipleAndTrueOrFalseQuestions(state, { payload }) {
      state.lengthOfMultipleAndTrueOrFalseQuestions = payload;
    },
    setEndOfQuestions(state, { payload }) {
      state.endOfQuestions = payload;
    },
    setReturnedTerm(state, { payload }) {
      state.returnedTerm = payload;
    },
    setReturnedTermKey(state, { payload }) {
      state.returnedTermKey = payload;
    },
    setMatchingTermClickedTwice(state, { payload }) {
      state.matchingTermClickedTwice = payload;
    },
    prevFlashcard(state) {
      if (state.currentCard === 0) {
        state.currentCard = state.maxNumberOfFlashcards - 1;
      } else {
        state.currentCard = state.currentCard - 1;
      }
    },
    nextFlashcard(state) {
      if (state.currentCard === state.maxNumberOfFlashcards - 1) {
        state.currentCard = 0;
      } else {
        state.currentCard = state.currentCard + 1;
      }
    },
    addToDisplayedFlashcards(state, { payload }) {
      let tempCardHolder = [];
      let tempCardHolderTwo = [];

      payload.card.displayedData.forEach((card) => tempCardHolder.push(card));
      tempCardHolder.unshift(payload.card.data);

      for (let i = 0; i < tempCardHolder.length; i++) {
        tempCardHolderTwo[+tempCardHolder[i].id.slice(4) - 1] =
          tempCardHolder[i];
      }
      console.log(tempCardHolderTwo.length);
      state.displayedFlashcardData = tempCardHolderTwo;

      state.maxNumberOfFlashcards = state.displayedFlashcardData.length;
    },
    removeDisplayedFlashcard(state, { payload }) {
      let tempCardHolder = [];

      state.displayedFlashcardData = tempCardHolder;
      state.maxNumberOfFlashcards = state.displayedFlashcardData.length;

      state.displayedFlashcardData = payload.card.displayedData.filter(
        function (card) {
          let cardId = +card.id.slice(4);

          return cardId !== payload.card.id + 1;
        }
      );
      state.maxNumberOfFlashcards = state.displayedFlashcardData.length;
    },
    addToTestFlashcardData(state, { payload }) {
      let tempCardHolder = [];

      payload.card.prevTestFlashcardData.forEach((card) =>
        tempCardHolder.push(card)
      );
      tempCardHolder.unshift(payload.card.data);

      state.testFlashcardData = tempCardHolder;
      state.maxNumberOfFlashcards = state.testFlashcardData.length;
    },
    removeTestFlashcardData(state, { payload }) {
      state.testFlashcardData = payload.card.prevTestFlashcardData.filter(
        function (card) {
          let cardId = +card.id.slice(4);
          return cardId !== payload.card.id + 1;
        }
      );
      state.maxNumberOfFlashcards = state.testFlashcardData.length;
    },
  },
});

const store = configureStore({ reducer: flashcardSlice.reducer });

export const flashcardStoreActions = flashcardSlice.actions;

export default store;
