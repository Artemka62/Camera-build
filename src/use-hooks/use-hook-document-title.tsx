import {useEffect} from 'react';

function useDocumentTitle (title: string) {
  useEffect(() => {
    const initialTitle = document.title;

    return () => {
      document.title = initialTitle;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    if(isMounted) {
      document.title = `${title}`;
    }

    return () => {
      isMounted = false;
    };
  }, [title]);
}

export {useDocumentTitle};
