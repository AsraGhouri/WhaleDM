import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import rootReducer from './store/reducers/rootReducer'
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import fire from './config/Fire'
import 'index.css'
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
// core components
import Admin from "../src/components/material-ui/layouts/Admin.jsx";
import RTL from "../src/components//material-ui/layouts/RTL.jsx";
import Dashboard from "../src/components/Dashboard/Dashboard.js";
import SignIn from '../src/components/auth/Login'
import SignUp from '../src/components/auth/SignUp'

import "../src/components/material-ui/assets/css/material-dashboard-react.css?v=1.6.0";

const store = createStore(rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reactReduxFirebase(fire, { userProfile: 'users', useFirestoreForProfile: true, attachAuthIsReady: true }),
    reduxFirestore(fire)
  )
);

store.firebaseAuthIsReady.then(() => {
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
    <div className="App">
      <Switch>
            {/* <Route exact path='/' component={Dashboard} /> */}
        <Route path='/signin' component={SignIn} />
        <Route path='/signup' component={SignUp} />
        <Route path="/admin" component={Admin} />
            <Route path="/rtl" component={RTL} /> 
      </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
})
registerServiceWorker();