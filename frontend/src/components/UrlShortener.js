import style from "../styles/UrlShortener.module.scss";
import { useContext, useState } from "react";
import { BackendContext } from "../logic/backendContext";
import { FirebaseContext } from "../logic/context";

const UrlShortener = () => {

  const { createShortUrlFromLongUrl } = useContext(BackendContext);
  const { saveUrlToDB, userStatus } = useContext(FirebaseContext);

  //Shows border upon error
  const [errorBorder, setErrorBorder] = useState(style.no_error);

  //Dynamic show of error message
  const [isError, setIsError] = useState(null);
  const [url, setUrl] = useState("");

  //Async function handles link submission
  async function handleClick() {
    if (!url) {
      setErrorBorder(style.error);
      setIsError(style.error_message);
    } else {
      // communitcate with backend to get shorten url
      const result = await createShortUrlFromLongUrl(url);
      if (userStatus) {
        saveUrlToDB(result.longUrl, result.shortUrl);
      }
      setErrorBorder(style.no_error);
      setIsError(null);
      setUrl("");
    }
  }
  return (
    <div className={style.container}>
      <input
        type="text"
        placeholder="Shorten a link here...."
        className={errorBorder}
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={handleClick}>Shorten It!</button>
      {isError && <div className={style.error_message}>Please add a link</div>}
    </div>
  );
};

export default UrlShortener;
