import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import rootReducer from './store/reducers/rootReducer'
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux' //we need to applyMiddleware to pass a thunk as a param in th store
import { Provider } from 'react-redux'
import thunk from 'redux-thunk' //redux-thunk is a middleware
import fire from './config/Fire'
import 'index.css'
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
// core components
import Admin from "../src/components/material-ui/layouts/Admin.jsx";
import RTL from "../src/components//material-ui/layouts/RTL.jsx";
// import Dashboard from "../src/components/Dashboard/Dashboard.js";
import SignIn from '../src/components/auth/Login'
import SignUp from '../src/components/auth/SignUp'

import "../src/components/material-ui/assets/css/material-dashboard-react.css?v=1.6.0";
//create a store enhancer which will apply our applyMiddleware to the store's dispatch function.
const store = createStore(rootReducer,
  compose(
    // thunk is enhance our functionality, that functionality now being return inside our action creater which can interect with our database
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reactReduxFirebase(fire, { userProfile: 'users', useFirestoreForProfile: true, attachAuthIsReady: true }),
    reduxFirestore(fire)
  )
);

store.firebaseAuthIsReady.then(() => {
  ReactDOM.render(
    //to make the store available to all container components in the application.
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path='/' component={SignIn} />
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