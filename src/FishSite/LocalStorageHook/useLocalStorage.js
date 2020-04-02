import { useState, useEffect } from "react";

function useLocalStorage(storageKey, initialData) {
  if (!storageKey || typeof(storageKey) !== "string") {
    throw new Error(
      "useLocalStorage must be supplied with a string storage key"
    );
  }
    
  const [data, setData] = useState(
    localStorage.getItem(storageKey) ?
      JSON.parse(localStorage.getItem(storageKey)) : 
      initialData
  );

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(data));
  }, [data, storageKey]);
  
  const setLocalStorage = (newData) => {
    setData(newData)
  }

  return [data, setLocalStorage]
}

export default useLocalStorage;
