import { OfferCard } from '../../types/types-store';
import { CardComponent } from '../card/card';
import { useAppSelector } from '../../hooks/hook-use-store';

type CardsListComponentProps ={
  offers: OfferCard[];
}

function CardsListComponent ({offers}: CardsListComponentProps) {
  const isErrorLoadingOffers = useAppSelector((state) => state.offers.error);

  if(offers.length === 0 && isErrorLoadingOffers === false) {
    return 'по вашему запросу ничего не найдено';
  }

  return (
    <div className="cards catalog__cards" data-testid='card-list'>
      {offers?.map((offer) => <CardComponent key={offer.id} offer={offer}/>)}

    </div>
  );
}

export {CardsListComponent};
