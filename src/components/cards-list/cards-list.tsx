import { OfferCard } from '../../types/types-store';
import { CardComponent } from '../card/card';

type CardsListComponentProps ={
  offers: OfferCard[];
}

function CardsListComponent ({offers}: CardsListComponentProps) {


  if(offers.length === 0) {
    return 'по вашему запросу ничего не найдено';
  }
  return (
    <div className="cards catalog__cards" data-testid='card-list'>
      {offers?.map((offer) => <CardComponent key={offer.id} offer={offer}/>)}
    </div>
  );
}

export {CardsListComponent};
