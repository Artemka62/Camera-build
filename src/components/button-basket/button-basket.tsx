import { Link } from 'react-router-dom';
import { AppRoute, DEFAULT_NULL } from '../../src-const';
import { useAppSelector } from '../../use-hooks/use-hook-store';
import { OfferLocalStorage } from '../../types/types-store';

function ButtonBasketComponent () {
  const stateBasketOffer: OfferLocalStorage[] = useAppSelector((state) => state.offersBasket.offers);
  const countOffers = stateBasketOffer.reduce((accumulator: number, offerCount: OfferLocalStorage) => accumulator + offerCount.count, DEFAULT_NULL);

  return (
    <Link to={AppRoute.Basket} className="header__basket-link" data-testid='button-basket'>
      <svg width={16} height={16} aria-hidden="true">
        <use xlinkHref="#icon-basket" />
      </svg>
      {stateBasketOffer.length !== DEFAULT_NULL ? <span className="header__basket-count">{countOffers}</span> : ''}
    </Link>
  );
}

export {ButtonBasketComponent};
