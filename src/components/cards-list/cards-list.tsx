import { useAppSelector } from '../../hooks/use-store';
import { CardComponent } from '../card/card';

function CardsListComponent () {

  const stateOffers = useAppSelector((state) => state.offers.offers);

  return (
    <div className="cards catalog__cards">

      {stateOffers?.map((offer) => <CardComponent key={offer.id} offer={offer}/>)}

    </div>
  );
}

export {CardsListComponent};
