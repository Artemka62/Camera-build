import { useEffect } from 'react';

function useDocumentTitle (title: string) {
  useEffect(() => {
    let isMounted = true;
    let initialTitle: string = document.title;

    if(isMounted){
      initialTitle = document.title;
    }

    return () => {
      document.title = initialTitle;
      isMounted = false;
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

export { useDocumentTitle };
