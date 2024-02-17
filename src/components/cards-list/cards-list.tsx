import { useSearchParams } from 'react-router-dom';
import { OfferCard } from '../../types/types-store';
import { CardComponent } from '../card/card';
import { SortId } from '../../src-const';

type CardsListComponentProps ={
  offers: OfferCard[];
}

function CardsListComponent ({offers}: CardsListComponentProps) {

  const [urlParam] = useSearchParams();
  const sortType = urlParam.get('sort') || '';
  const sortMaxMin = urlParam.get('rotation') || '';


  function getSortOffers (type: string, maxMin: string) {

    if(type === SortId.Price && maxMin === SortId.Down) {

      return offers.sort((a, b) => b.price - a.price);
    }

    if(type === SortId.Price && maxMin === SortId.Up) {

      return offers.sort((a, b) => a.price - b.price);
    }

    if(type === SortId.Popular && maxMin === SortId.Up) {

      return offers.sort((a, b) => a.rating - b.rating);
    }

    if(type === SortId.Popular && maxMin === SortId.Down) {

      return offers.sort((a, b) => b.rating - a.rating);
    }
  }


  const sortOffers = getSortOffers(sortType, sortMaxMin) || offers;


  return (
    <div className="cards catalog__cards" data-testid='card-list'>
      {sortOffers?.map((offer) => <CardComponent key={offer.id} offer={offer}/>)}
    </div>
  );
}

export {CardsListComponent};
