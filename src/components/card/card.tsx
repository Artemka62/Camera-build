import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../use-hooks/use-hook-store';
import { fetchOfferAction } from '../../services/thunk/thunk-fetch-offer';
import { OfferCard, OfferLocalStorage } from '../../types/types-store';
import { StarsRatingComponent } from '../stars-rating/stars-rating';
import { AppRoute, DEFAULT_NULL, KEY_LOCAL_STORAGE_OFFERS } from '../../src-const';
import { windowsSlice } from '../../store/slice/slice-modal-windows';
import { fetchReviewsAction } from '../../services/thunk/thunk-fetch-reviews';
import { formatNumberWithSpaces } from '../../utils/utils-format-price';
import { getLocalStorage } from '../../utils/utils-local-storage';
import { ButtonInBasketComponent } from '../button-in-basket/button-in-basket';
import { useEffect} from 'react';

type CardComponentProps = {
  offer: OfferCard;
}

function CardComponent ({offer}: CardComponentProps) {
  const dispatch = useAppDispatch();
  const stateLocalStorage: OfferLocalStorage[] | [] = getLocalStorage(KEY_LOCAL_STORAGE_OFFERS) || [];
  const stateBasketOffers = useAppSelector((state) => state.offersBasket.offers);

  function changeButton (): boolean {
    if(stateLocalStorage){
      return stateBasketOffers.some((offerStorage: OfferLocalStorage) => offerStorage.id === offer.id);
    }

    return false;
  }

  const isButtonInBasket = changeButton();

  function handleClickButtonBuy () {
    dispatch(fetchOfferAction(offer.id));
    dispatch(windowsSlice.actions.windowProduct(true));
    dispatch(windowsSlice.actions.isModalWindow(true));
  }

  useEffect(() => {
    let isMounted = true;

    if(isMounted){
      changeButton();
    }

    return () => {
      isMounted = false;
    };
  },[stateBasketOffers]);

  function handleClickButtonDetails () {
    dispatch(fetchReviewsAction(offer.id));

    window.scrollTo({
      top: DEFAULT_NULL,
      behavior: 'smooth'
    });
  }

  return (
    <div className="product-card is-active" data-testid='card'>
      <div className="product-card__img">
        <picture>
          <source
            type="/image/webp"
            srcSet={`/${offer.previewImgWebp}, /${offer.previewImgWebp2x} 2x`}
          />
          <img
            src={`/${offer.previewImg}`}
            srcSet={`/${offer.previewImg2x} 2x`}
            width={280}
            height={240}
            alt={offer.name}
          />
        </picture>
      </div>
      <div className="product-card__info">
        <StarsRatingComponent rating={offer.rating} reviewCount={offer.reviewCount}/>
        <p className="product-card__title">
          {offer.name}
        </p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>{formatNumberWithSpaces(offer.price)} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        {isButtonInBasket ? <ButtonInBasketComponent/> :
          <button
            className="btn btn--purple product-card__btn"
            type="button"
            onClick={handleClickButtonBuy}
          >
            Купить
          </button>}
        <Link to={`${AppRoute.Product}/${offer.id}${AppRoute.Description}`} className="btn btn--transparent" onClick={handleClickButtonDetails}>
          Подробнее
        </Link>
      </div>
    </div>
  );
}

export {CardComponent};
