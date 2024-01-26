import { useParams } from 'react-router-dom';
import { FooterComponent } from '../../components/footer/footer';
import { HeaderComponent } from '../../components/header/header';
import { useDocumentTitle } from '../../hooks/hook-use-document-title';
import { useAppDispatch, useAppSelector} from '../../hooks/hook-use-store';
import { fetchOfferAction } from '../../services/thunk/thunk-fetch-offer';
import { useEffect } from 'react';
import { CardOfferProductComponent } from '../../components/card-offer-product/card-offer-product';
import { NavigationInPageComponent } from '../../components/navigation-in-page/navigation-in-page';
import { fetchSimilarOffersAction } from '../../services/thunk/thunk-fetch-similar-offers';
import { SimilarCardsListComponent } from '../../components/similar-cards-list/similar-cards-list';
import { ReviewListComponent } from '../../components/review-list/review-list';
import { fetchReviewsAction } from '../../services/thunk/thunk-fetch-rewiews';
import { ModalWindowComponent } from '../../components/modal-window-list/modal-window-list';
import { AppRoute } from '../../src-const';
import { LoadingComponent } from '../../components/loading-component/loading-component';
import { ErrorPage } from '../page-error/page-error';

type ProductProps = {
  title: string;
}

function ProductPage ({title}: ProductProps) {
  const {id, tab} = useParams<string>();
  const dispatch = useAppDispatch();
  const stateSimilarOffers = useAppSelector((state) => state.similarOffers.similarOffers);
  const isErrorLoadOffer = useAppSelector((state) => state.offer.error);
  const isLoadingOffer = useAppSelector((state) => state.offer.loading);

  useDocumentTitle(title);

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferAction(+id));
      dispatch(fetchSimilarOffersAction(+id));
      dispatch(fetchReviewsAction(+id));
    }
  },[]);

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferAction(+id));
    }
  },[id]);

  function handleClickButtonUp () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  if(isLoadingOffer){
    return <LoadingComponent/>;
  }

  if(tab !== 'description' && tab !== 'characteristic' || isErrorLoadOffer) {
    return <ErrorPage title ={AppRoute.Error}/>;
  }

  return(
    <div className="wrapper" data-testid ='product-page' >
      <HeaderComponent/>
      <main >
        <div className="page-content">

          <NavigationInPageComponent/>

          <div className="page-content__section">

            <CardOfferProductComponent/>

          </div>
          <div className="page-content__section">

            <SimilarCardsListComponent offers={stateSimilarOffers}/>

          </div>
          <div className="page-content__section">
            <ReviewListComponent/>
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
