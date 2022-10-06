import React from "react";
import Layout from "../components/Layout";
import ShortenUrl from "../components/ShortenUrl";
import style from "../styles/SavedLinks.module.scss";
import { useContext } from "react";
import { FirebaseContext } from "../logic/context";
import useFirestore from "../hooks/useFirestore";

function SavedLinks() {
  const { userStatus } = useContext(FirebaseContext);
  const { docs } = useFirestore("urls", userStatus);
  return (
    <Layout>
      <div className={style.container}>
        <h1>Your saved links</h1>
        {docs.length ? (
          docs.map((doc) => {
            return (
              <ShortenUrl
                key={doc.id}
                longUrl={doc.longUrl}
                shortUrl={doc.shortUrl}
              />
            );
          })
        ) : (
          <div>
            <p>No saved urls</p>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default SavedLinks;
