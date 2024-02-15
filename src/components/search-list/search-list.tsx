import { useNavigate } from 'react-router-dom';
import { OfferCard } from '../../types/types-store';
import { AppRoute } from '../../src-const';

type SearchListProps = {
  offers: OfferCard[];
}

function SearchListComponent ({offers}: SearchListProps) {
  const navigate = useNavigate();
  return(
    <ul className="form-search__select-list scroller">
      {offers.map((offer) => (
        <li
          key={offer.name}
          onClick={() => navigate(`${AppRoute.Product}/${offer?.id}${AppRoute.Description}`)}
          className="form-search__select-item"
          tabIndex={0}
        >
          {offer.name}
        </li>
      ))}
    </ul>
  );
}

export {SearchListComponent};
