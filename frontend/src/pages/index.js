import Layout from "../components/Layout";
import style from "../styles/Home.module.scss";
import Link from "next/link";
import UrlShortener from "../components/UrlShortener";
import ShortenUrl from "../components/ShortenUrl";
import { useContext, useState } from "react";
import { FirebaseContext } from "../logic/context";
import { BackendContext } from "../logic/backendContext";

const Home = () => {
  // context data
  const { urls } = useContext(BackendContext);
  return (
    <Layout pageTitle="Home">
      <>
        <div className={style.container}>
          <div className={style.copy_right}>
            <h1>More then just shorter links</h1>
            <p>
              Build your brand's recognition and get detailed insights on how
              your links are performing.
            </p>
            <div className={style.btn}>
              <Link href="#start">Get Started</Link>
            </div>
          </div>
          <div className={style.img}>
            <img
              src="/images/illustration-working.svg"
              alt="illustration-working"
            />
          </div>
        </div>

        <section className={style.main} id="start">
          <UrlShortener />
          {/* Show the converted url */}
          {urls && (
            <ShortenUrl longUrl={urls.longUrl} shortUrl={urls.shortUrl} />
          )}
        </section>
      </>
    </Layout>
  );
};

export default Home;