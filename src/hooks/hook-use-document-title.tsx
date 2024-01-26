import {useEffect} from 'react';

function useDocumentTitle (title: string) {
  useEffect(() => {
    const initialTitle = document.title;
    return () => {
      document.title = initialTitle;
    };
  }, []);

  useEffect(() => {
    document.title = `${title}`;
  }, [title]);
}

export {useDocumentTitle};
