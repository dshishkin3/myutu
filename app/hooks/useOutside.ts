import { useState, useEffect, useRef } from 'react';

export default function useOutside(inititalIsVisible: boolean) {
  const [ isVisible, setIsVisible ] = useState(inititalIsVisible);

  const ref = useRef<any | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsVisible(false);
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    }
  })

  return { ref, isVisible, setIsVisible }
}