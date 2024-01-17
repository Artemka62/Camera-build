import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import {useDocumentTitle} from '../../hooks/use-document-title';

type ErrorPageProps = {
  title: string;
}

function ErrorPage ({title} : ErrorPageProps) {
  useDocumentTitle(title);

  return(
    <div>
      <h1>404 Not Found</h1>
      <Link to={AppRoute.Main}><p> Перейти на главную страницу</p></Link>
    </div>
  );
}

export {ErrorPage};
