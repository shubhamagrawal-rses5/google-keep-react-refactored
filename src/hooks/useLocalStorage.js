import { useEffect, useState } from "react";

function useLocalStorage(key, initialValue) {
  function fetchData() {
    const data = JSON.parse(localStorage.getItem(key));
    if (data) return data;
    return initialValue;
  }

  const [data, setData] = useState(fetchData);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data));
    setData(data);
  }, [data, key]);

  return [data, setData];
}

export default useLocalStorage;
