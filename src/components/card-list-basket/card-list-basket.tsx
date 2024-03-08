import { DEFAULT_NULL } from '../../src-const';
import { useAppSelector } from '../../use-hooks/use-hook-store';
import { CardBasketComponent } from '../card-basket/card-basket';

function CardListBasketComponent () {
  const stateBasketOffers = useAppSelector((state) => state.offersBasket.offers);

  return (
    <ul className="basket__list">
      {stateBasketOffers.length !== DEFAULT_NULL ? stateBasketOffers.map((offer) => <CardBasketComponent key={offer.id} offer = {offer.offer}/>) : <div><strong>Корзина пута. Выберите товар для оформления заказа.</strong></div>}
    </ul>
  );
}

export {CardListBasketComponent};
