import React from 'react';
import { Switch, Route } from 'react-router-dom';
import NavigationBar from './common/NavigationBar';
import HomePage from './HomePage';
import LoginPage from './LoginPage';

function App() {
  return (
    <>
      <NavigationBar />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route  path="/login">
          <LoginPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
