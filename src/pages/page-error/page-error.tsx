import {Link} from 'react-router-dom';
import {AppRoute} from '../../src-const';
import {useDocumentTitle} from '../../hooks/hook-use-document-title';
import { useAppDispatch } from '../../hooks/hook-use-store';
import { fetchOffersAction } from '../../services/thunk/thunk-fetch-offers';

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
      <h1 data-testid ='error-page'>404 Not Found</h1>
      <Link to={AppRoute.Main} onClick={handleClickButton}><p> Перейти на главную страницу</p></Link>
    </div>
  );
}

export {ErrorPage};
