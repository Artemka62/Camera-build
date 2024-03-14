import { useParams } from 'react-router-dom';
import { FooterComponent } from '../../components/footer/footer';
import { HeaderComponent } from '../../components/header/header';
import { useDocumentTitle } from '../../use-hooks/index';
import { useAppDispatch, useAppSelector} from '../../use-hooks/index';
import { fetchOfferAction } from '../../services/thunks/index';
import { useEffect } from 'react';
import { CardOfferProductComponent } from '../../components/card-offer-product/card-offer-product';
import { NavigationInPageComponent } from '../../components/navigation-in-page/navigation-in-page';
import { fetchSimilarOffersAction } from '../../services/thunks/index';
import { SimilarCardsListComponent } from '../../components/similar-cards-list/similar-cards-list';
import { ReviewListComponent } from '../../components/review-list/review-list';
import { fetchReviewsAction } from '../../services/thunks/index';
import { ModalWindowComponent } from '../../components/modal-window-list/modal-window-list';
import { AppRoute, DEFAULT_NULL } from '../../src-const';
import { LoadingComponent } from '../../components/loading-component/loading-component';
import { ErrorPage } from '../page-error/page-error';
import { ToastifyComponent } from '../../components/toastify/toastify';

type ProductProps = {
  title: string;
}

function ProductPage ({title}: ProductProps) {
  const {id, tab} = useParams<string>();
  const dispatch = useAppDispatch();
  const stateSimilarOffers = useAppSelector((state) => state.similarOffers.similarOffers);
  const isErrorLoadOffer = useAppSelector((state) => state.offer.error);
  const isLoadingOffer = useAppSelector((state) => state.offer.loading);
  const isLoadingSimilarOffers = useAppSelector((state) => state.offer.loading);
  const isLoadingReviews = useAppSelector((state) => state.offer.loading);

  useDocumentTitle(title);

  useEffect(() => {
    let isMounted = true;

    if (id && isMounted) {
      dispatch(fetchOfferAction(+id));
      dispatch(fetchSimilarOffersAction(+id));
      dispatch(fetchReviewsAction(+id));
    }

    return () => {
      isMounted = false;
    };
  },[]);

  useEffect(() => {
    let isMounted = true;

    if (id && isMounted) {
      dispatch(fetchOfferAction(+id));
    }

    return () => {
      isMounted = false;
    };
  },[id]);

  function handleClickButtonUp () {
    window.scrollTo({
      top: DEFAULT_NULL,
      behavior: 'smooth'
    });
  }

  if(tab !== 'description' && tab !== 'characteristic') {
    return <ErrorPage title ={AppRoute.Error}/>;
  }

  if(isErrorLoadOffer) {
    return <ErrorPage title ={AppRoute.Error}/>;
  }

  return(
    <div className="wrapper" data-testid ='product-page' >
      <ToastifyComponent/>
      <HeaderComponent/>
      <main >
        <div className="page-content">
          <NavigationInPageComponent/>
          <div className="page-content__section">
            {!isLoadingOffer ? <CardOfferProductComponent/> : <LoadingComponent/>}
          </div>
          <div className="page-content__section">
            {!isLoadingSimilarOffers ? <SimilarCardsListComponent offers={stateSimilarOffers}/> : <LoadingComponent/>}
          </div>
          <div className="page-content__section">
            {!isLoadingReviews ? <ReviewListComponent/> : <LoadingComponent/>}
          </div>
          <ModalWindowComponent/>
        </div>
      </main>
      <a onClick={handleClickButtonUp} className="up-btn">
        <svg width={12} height={18} aria-hidden="true">
          <use xlinkHref="#icon-arrow2" />
        </svg>
      </a>
      <FooterComponent/>
    </div>
  );
}

export {ProductPage};
