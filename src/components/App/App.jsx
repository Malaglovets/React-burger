import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngridients from '../BurgerIngridients/BurgerIngridients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import styles from "./App.module.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { compose, createStore } from 'redux';
// const enhancer = composeEnhancers();

// const store = createStore(rootReducer, enhancer);
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

function App() {

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <DndProvider backend={HTML5Backend}>
        <BurgerIngridients />
        <BurgerConstructor />
        </DndProvider>
      </main>
    </>
  );
}

export default App;