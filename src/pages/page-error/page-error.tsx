import {Link} from 'react-router-dom';
import {AppRoute} from '../../src-const';
import {useDocumentTitle} from '../../use-hooks/use-hook-document-title';
import { useAppDispatch } from '../../use-hooks/use-hook-store';
import { fetchOffersAction } from '../../services/thunk/thunk-fetch-offers';
import { ToastifyComponent } from '../../components/toastify/toastify';
import { fetchPromoOffersAction } from '../../services/thunk/thunk-fetch-promo-offers';

type ErrorPageProps = {
  title: string;
}

function ErrorPage ({title} : ErrorPageProps) {
  const dispatch = useAppDispatch();
  useDocumentTitle(title);

  function handleClickButton () {
    dispatch(fetchOffersAction());
    dispatch(fetchPromoOffersAction());
  }

  return(
    <div>
      <ToastifyComponent/>
      <h1 data-testid ='error-page'>404 Not Found</h1>
      <Link to={AppRoute.Main} onClick={handleClickButton}><p> Перейти на главную страницу</p></Link>
    </div>
  );
}

export {ErrorPage};
