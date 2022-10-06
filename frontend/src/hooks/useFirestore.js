import { firestoreDB } from "../firebase/config";
import { useState, useEffect } from "react";

const useFirestore = (collection, user) => {
  const [docs, setDocs] = useState([]);

  if (user) {
    useEffect(() => {
      const unsubcrib = firestoreDB
        .collection(collection)
        .where("id", "==", user.uid)
        .onSnapshot((snapshot) => {
          let documents = [];
          snapshot.docs.forEach((doc) => {
            documents.push({ ...doc.data(), id: doc.id });
          });
          setDocs(documents);
        });
      return () => unsubcrib();
    }, [collection]);
  }

  return { docs };
};

export default useFirestore;
