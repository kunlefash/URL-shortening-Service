import axios from "axios";
import { createContext, useState } from "react";

export const BackendContext = createContext();

const BackendContextProvider = (props) => {
  const [urls, setUrls] = useState(null);

  // //Handle post request to backend
  async function createShortUrlFromLongUrl(longUrl) {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/url/shorten",
        {
          longUrl,
        }
      );
      setUrls(response.data);
      return response.data;
    } catch (error) {
      console.log(error.message);
      return error;
    }
  }

  return (
    <BackendContext.Provider value={{ createShortUrlFromLongUrl, urls }}>
      {props.children}
    </BackendContext.Provider>
  );
};

export default BackendContextProvider;