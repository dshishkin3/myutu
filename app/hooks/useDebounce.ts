import { useState, useEffect } from "react";

const useDebounce = (value: string, delay = 300) => {
  const [ debounced, setDebounced ] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);

    return () => clearInterval(handler)
  }, [value, delay])

  return debounced;
}

export default useDebounce;