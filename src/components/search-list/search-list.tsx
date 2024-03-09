import { Link } from 'react-router-dom';
import { OfferCard } from '../../types/types-store';
import { AppRoute } from '../../src-const';
import { useEffect, useRef } from 'react';
import './search-list.css';

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
    let isMounted = true;

    if (inFocus && linkRef.current && isMounted) {
      linkRef.current.focus();
    }

    return () => {
      isMounted = false;
    };
  }, [inFocus]);

  return(
    <li data-testid='search-list-component'>
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
