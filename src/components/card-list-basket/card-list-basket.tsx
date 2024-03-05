import { useAppSelector } from '../../use-hooks/use-hook-store';
import { CardBasketComponent } from '../card-basket/card-basket';

function CardListBasketComponent () {
  const stateBasketOffers = useAppSelector((state) => state.offersBasket.offers);

  return (
    <ul className="basket__list">
      {stateBasketOffers.length !== 0 ? stateBasketOffers.map((offer) => <CardBasketComponent key={offer.id} offer = {offer.offer}/>) : ''}
    </ul>
  );
}

export {CardListBasketComponent};
