import { useEffect, useState } from "react";

function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  function fetchData() {
    const unparsedData = localStorage.getItem(key);
    if (!unparsedData) return initialValue;

    const data: T = JSON.parse(unparsedData);
    return data;
  }

  const [data, setData] = useState(fetchData);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data));
    setData(data);
  }, [data, key]);

  return [data, setData];
}

export default useLocalStorage;
