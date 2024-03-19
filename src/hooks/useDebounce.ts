import { useEffect, useState } from "react";

export const useDebounce = (value, delay: number) => {
  const [valueDebounce, setValueDebounce] = useState('')
  useEffect(() => {
    const handle = setTimeout(() => {
      setValueDebounce(value);
    }, delay)
    return () => {
      clearTimeout(handle);
    }
  })
  return valueDebounce;
}