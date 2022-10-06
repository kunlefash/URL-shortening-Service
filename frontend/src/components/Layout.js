import Head from "next/head";
import Navbar from "./Navbar";

function Layout({ pageTitle, children }) {
  return (
    <div>
      <Head>
        <title>{pageTitle} | URL Shortener </title>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      <Navbar />
      {children}
    </div>
  );
}

export default Layout;
