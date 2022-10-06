//@ts-nocheck
import React from 'react';
import logo from './logo.svg';
import BackendContextProvider from "../src/logic/backendContext"
import FirebaseContextProvider from "../src/logic/context";
import './App.css';


function App(Component , pageProps) {
  return (
    <FirebaseContextProvider>
      <BackendContextProvider>
        <Component {...pageProps} />
      </BackendContextProvider>
    </FirebaseContextProvider>
  );
}

export default App;
