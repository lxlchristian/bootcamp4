import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { BrowserRouter } from 'react-router-dom';

import firebase from 'firebase/compat/app';
import { Provider } from 'react-redux'
import { initializeApp } from 'firebase/app';
import 'firebase/database';
import { legacy_createStore as createStore, combineReducers } from 'redux'
import {
  ReactReduxFirebaseProvider,
  firebaseReducer
} from 'react-redux-firebase'
import { composeWithDevTools } from 'redux-devtools-extension';

const firebaseConfig = {
    apiKey: "AIzaSyCZLnm-pgQno1kBkFJqHzdJEXfFdi-G7Ho",
    authDomain: "lxlchristian-bootcamp2.firebaseapp.com",
    databaseURL: "https://lxlchristian-bootcamp2-default-rtdb.firebaseio.com",
    projectId: "lxlchristian-bootcamp2",
    storageBucket: "lxlchristian-bootcamp2.appspot.com",
    messagingSenderId: "164984002429",
    appId: "1:164984002429:web:5fbb774b00a2adfd545e14"
};

initializeApp(firebaseConfig);

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