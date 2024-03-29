import {Link} from 'react-router-dom';
import {AppRoute} from '../../src-const';
import { useDocumentTitle } from '../../use-hooks/index';
import { useAppDispatch } from '../../use-hooks/index';
import { fetchOffersAction } from '../../services/thunks/index';
import { ToastifyComponent } from '../../components/toastify/toastify';
import { fetchPromoOffersAction } from '../../services/thunks/index';
import { offerSlice } from '../../store/slices/index';

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
