import { Link } from 'react-router-dom';
import { OfferCard } from '../../types/types-store';
import { AppRoute } from '../../src-const';
import { useEffect, useRef } from 'react';

type SearchListProps = {
  offer: OfferCard;
  id: number;
  inFocus: boolean;
  onFocus: (idx: number) => void;
  index: number;
}

function SearchListComponent ({offer, inFocus, onFocus, index}: SearchListProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {

    if (inFocus && linkRef.current) {

      linkRef.current.focus();

    }

  }, [inFocus]);
  return(
    <li>
      <Link
        to={`${AppRoute.Product}/${offer?.id}${AppRoute.Description}`}
        ref={linkRef}
        className="form-search__select-item"
        style={{ display: 'block' }}
        onFocus={() => onFocus(index)}
      >
        {offer.name}
      </Link>
    </li>
  );
}

export {SearchListComponent};
