import { OfferCard } from '../../type/index';
import { CardComponent } from '../card/card';
import { useAppSelector } from '../../use-hook/use-hook-store';
import { EmptyMessageComponent } from '../empty-message/empty-message';
import { DEFAULT_NULL } from '../../src-const';

type CardsListComponentProps ={
  offers: OfferCard[];
}

function CardsListComponent ({offers}: CardsListComponentProps) {
  const isErrorLoadingOffers = useAppSelector((state) => state.offers.error);

  if(offers.length === DEFAULT_NULL && isErrorLoadingOffers === false) {
    return <EmptyMessageComponent/>;
  }

  return (
    <div className="cards catalog__cards" data-testid='card-list'>
      {offers?.map((offer) => <CardComponent key={offer.id} offer={offer}/>)}
    </div>
  );
}

export {CardsListComponent};
