import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

import Routes from "./components/routing/Routes";
// some things we import with {} and some without {} so {} comes when we directly write export in the start of that function from the file that it comes here and we dont write {} when we have default export using which the thing comes to us from the file refer :
//import { loadUser } from "./actions/auth";
//import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    // since we arent using classes but functions this useEffect is like an replacement to componentsDidMount which is a part of class lifecycle
    store.dispatch(loadUser());
  }, []); // useEffect without [] will keep running in loops but we want it like componentDidMount ie to run just once when its mounted thus we use []
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
