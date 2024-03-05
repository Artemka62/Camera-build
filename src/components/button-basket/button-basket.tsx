import { Link } from 'react-router-dom';
import { AppRoute } from '../../src-const';
import { useAppSelector } from '../../use-hooks/use-hook-store';

function ButtonBasketComponent () {
  const stateBasketOffer = useAppSelector((state) => state.offersBasket.offers);
  const countOffers = stateBasketOffer.reduce((accumulator: number, offerCount: { count: number }) => accumulator + offerCount.count, 0) as number;

  return (
    <Link to={AppRoute.Basket} className="header__basket-link" data-testid='button-basket'>
      <svg width={16} height={16} aria-hidden="true">
        <use xlinkHref="#icon-basket" />
      </svg>
      {stateBasketOffer.length !== 0 ? <span className="header__basket-count">{countOffers}</span> : ''}
    </Link>
  );
}

export {ButtonBasketComponent};
