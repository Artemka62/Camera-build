import { KEY_LOCAL_STORAGE } from '../../src-const';
import { OfferLocalStorage } from '../../types/types-store';
import { getLocalStorage } from '../../utils/utils-local-storage';
import { CardBasketComponent } from '../card-basket/card-basket';

function CardListBasketComponent () {
  const localStorage: OfferLocalStorage[] = getLocalStorage(KEY_LOCAL_STORAGE) || [];

  return (
    <ul className="basket__list">
      {localStorage.length !== 0 ? localStorage?.map((offer) => <CardBasketComponent key={offer.id} offer = {offer.offer}/>) : ''}
    </ul>
  );
}

export {CardListBasketComponent};
