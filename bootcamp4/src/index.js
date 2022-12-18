import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { BrowserRouter } from 'react-router-dom';

import firebase from 'firebase/compat/app';
import { Provider } from 'react-redux'
import { initializeApp } from 'firebase/app';
import 'firebase/compat/database';
import { legacy_createStore as createStore, combineReducers } from 'redux'
import {
  ReactReduxFirebaseProvider,
  firebaseReducer
} from 'react-redux-firebase'
import { composeWithDevTools } from 'redux-devtools-extension';

const firebaseConfig = {
    apiKey: "AIzaSyBpUS8hI7tnKr9rLKcR1wdntUIPZGk3zeg",
    authDomain: "lxlchristian-bootcamp4.firebaseapp.com",
    databaseURL: "https://lxlchristian-bootcamp4-default-rtdb.firebaseio.com",
    projectId: "lxlchristian-bootcamp4",
    storageBucket: "lxlchristian-bootcamp4.appspot.com",
    messagingSenderId: "727234419647",
    appId: "1:727234419647:web:8c28cc374c5b4614355f0a"
  };

firebase.initializeApp(firebaseConfig);

// Add firebase to reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer
    // firestore: firestoreReducer // <- needed if using firestore
})
  
// Create store with reducers
const store = createStore(rootReducer, composeWithDevTools())
  
// react-redux-firebase config
const rrfConfig = {
    userProfile: 'users'
    // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
    // enableClaims: true // Get custom claims along with the profile
}

const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch
    // createFirestoreInstance // <- needed if using firestore
}

ReactDOM.render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ReactReduxFirebaseProvider>
    </Provider>,
    document.getElementById('root')
);