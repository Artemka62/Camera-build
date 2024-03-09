import { useEffect, useLayoutEffect, useRef } from 'react';

type TUseClickOutsideProps = (e: Event) => void;

function useClickOutside<T extends HTMLElement>(
  cb: TUseClickOutsideProps,
) {
  const ref = useRef<T>(null);
  const refCb = useRef(cb);

  useLayoutEffect(() => {
    refCb.current = cb;
  });

  useEffect(() => {
    let isMounted = true;

    const handler = (event: Event) => {
      const element = ref.current;
      if (element && !element.contains(event.target as HTMLElement)) {
        refCb.current(event);
      }
    };

    if(isMounted) {
      document.addEventListener('mousedown', handler);
      document.addEventListener('touchstart', handler);
      document.addEventListener('focusin', handler);
    }

    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
      document.addEventListener('focusin', handler);
      isMounted = false;
    };
  }, []);

  return ref;
}

export {useClickOutside};
