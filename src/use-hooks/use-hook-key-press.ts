import { useEffect, useState } from 'react';

function useKeyPress(targetKey: string) {
  const [keyPressed, setKeyPressed] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const downHandler = (event: KeyboardEvent) => {
      if (event.key === targetKey && isMounted) {
        event.preventDefault();
        setKeyPressed(true);
      }
    };

    const upHandler = (event: KeyboardEvent) => {
      if (event.key === targetKey && isMounted) {
        event.preventDefault();
        setKeyPressed(false);
      }
    };

    if(isMounted){
      window.addEventListener('keydown', downHandler);
      window.addEventListener('keyup', upHandler);
    }

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
      isMounted = false;
    };
  }, [targetKey]);

  return keyPressed;
}

export { useKeyPress };
