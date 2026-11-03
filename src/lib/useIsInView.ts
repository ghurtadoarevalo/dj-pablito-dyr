import { useEffect, useRef, useState, type RefObject } from "react";

export function useIsInView<T extends Element>(): [RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry?.isIntersecting ?? true);
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, inView];
}
