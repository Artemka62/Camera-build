import { DEFAULT_NULL } from '../../src-const';
import { useAppSelector } from '../../use-hook/use-hook-store';
import { CardBasketComponent } from '../card-basket/card-basket';

function CardListBasketComponent () {
  const stateBasketOffers = useAppSelector((state) => state.offersBasket.offers);

  return (
    <ul className="basket__list" data-testid='card-list-basket'>
      {stateBasketOffers.length !== DEFAULT_NULL ? stateBasketOffers.map((offer) => <CardBasketComponent key={offer.id} offer = {offer.offer}/>) : <div><strong>Корзина пуcта. Выберите товар для оформления заказа.</strong></div>}
    </ul>
  );
}

export {CardListBasketComponent};
