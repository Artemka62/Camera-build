import { useParams } from 'react-router-dom';
import { FooterComponent } from '../../components/footer/footer';
import { HeaderComponent } from '../../components/header/header';
import { useDocumentTitle } from '../../hooks/use-document-title';
import { useAppDispatch, useAppSelector} from '../../hooks/use-store';
import { fetchOfferAction } from '../../services/thunk/fetch-offer';
import { useEffect } from 'react';
import { CardOfferProductComponent } from '../../components/card-offer-product/card-offer-product';
import { NavigationInPageComponent } from '../../components/navigatiot-in-page/navigation-in-page';
import { fetchSimilarOffersAction } from '../../services/thunk/fetch-similar-offers';
import { SimilarCardsListComponent } from '../../components/similar-cards-list/similar-cards-list';
import { ReviewListComponent } from '../../components/review-list/review-list';
import { fetchReviewsAction } from '../../services/thunk/fetch-rewiews';

type ProductProps = {
  title: string;
}

function ProductPage ({title}: ProductProps) {
  const {id} = useParams<string>();
  const dispatch = useAppDispatch();
  const stateSimilarOffers = useAppSelector((state) => state.similarOffers.similarOffers);

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

  return(
    <div className="wrapper">
      <HeaderComponent/>
      <main>
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
