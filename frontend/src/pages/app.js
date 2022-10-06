import BackendContextProvider from "../logic/backendContext";
import FirebaseContextProvider from "../logic/context";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <FirebaseContextProvider>
      <BackendContextProvider>
        <Component {...pageProps} />
      </BackendContextProvider>
    </FirebaseContextProvider>
  );
}

export default MyApp;