import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngridients from '../BurgerIngridients/BurgerIngridients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import styles from "./App.module.css"

function App() {

  const [state, setState] = React.useState({
    isLoading: false,
    hasError: false,
    data: []
  });

  const getIngridients = () => {
    setState({...state, isLoading: true, hasError: false});
    fetch(`https://norma.nomoreparties.space/api/ingredients`)
    .then(res => {
      if (res.ok) {
          return res.json();
      }
      return Promise.reject(`Error ${res.status}`);
  })
    .then(res => setState({...state, data: res.data, isLoading: false}))
    .catch(e => setState({...state, isLoading: false, hasError: true}));
  }

  React.useEffect(() => {
    getIngridients()
  }, [])

  const { data, isLoading, hasError } = state

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngridients data={data} isLoading={isLoading} hasError={hasError}/>
        <BurgerConstructor />
      </main>
    </>
  );
}

export default App;