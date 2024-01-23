import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import {useDocumentTitle} from '../../hooks/use-document-title';
import { useAppDispatch } from '../../hooks/use-store';
import { fetchOffersAction } from '../../services/thunk/fetch-offers';

type ErrorPageProps = {
  title: string;
}

function ErrorPage ({title} : ErrorPageProps) {
  const dispatch = useAppDispatch();
  useDocumentTitle(title);

  function handleClickButton () {
    dispatch(fetchOffersAction());
  }

  return(
    <div>
      <h1>404 Not Found</h1>
      <Link to={AppRoute.Main} onClick={handleClickButton}><p> Перейти на главную страницу</p></Link>
    </div>
  );
}

export {ErrorPage};
