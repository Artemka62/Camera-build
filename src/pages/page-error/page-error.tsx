import {Link} from 'react-router-dom';
import {AppRoute} from '../../src-const';
import {useDocumentTitle} from '../../use-hook/use-hook-document-title';
import { useAppDispatch } from '../../use-hook/use-hook-store';
import { fetchOffersAction } from '../../services/thunk/thunk-fetch-offers';
import { ToastifyComponent } from '../../components/toastify/toastify';
import { fetchPromoOffersAction } from '../../services/thunk/thunk-fetch-promo-offers';
import { offerSlice } from '../../store/slice/slice-offer';

type ErrorPageProps = {
  title: string;
}

function ErrorPage ({title} : ErrorPageProps) {
  const dispatch = useAppDispatch();
  useDocumentTitle(title);

  function handleClickButton () {
    dispatch(fetchOffersAction());
    dispatch(fetchPromoOffersAction());
    dispatch(offerSlice.actions.error(false));
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
