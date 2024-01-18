//import { useAppSelector } from '../../hooks/use-store';
import { OfferCard } from '../../types/types-store';
import { CardComponent } from '../card/card';

type CardsListComponentProps ={
  offers: OfferCard[];
}

function CardsListComponent ({offers}: CardsListComponentProps) {

  return (
    <div className="cards catalog__cards">

      {offers?.map((offer) => <CardComponent key={offer.id} offer={offer}/>)}

    </div>
  );
}

export {CardsListComponent};
