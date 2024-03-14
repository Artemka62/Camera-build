import React, { useEffect, useState, useRef } from 'react';
import { useAppSelector } from '../../use-hooks/index';
import { OfferCard } from '../../types/index';
import { COUNT_SEARCH, DEFAULT_NULL, DEFAULT_UNIT } from '../../src-const';
import { SearchListComponent } from '../search-list/search-list';
import { useKeyPress } from '../../use-hooks/index';
import { useClickOutside } from '../../use-hooks/use-click-outside';

function SearchComponent () {
  const stateOffersProduct = useAppSelector((state) => state.offers.offers);
  const [searchTerm, setSearchTerm] = useState('');
  const [offerList, setOfferList] = useState<OfferCard[]>([]);
  const isShowButtonReset = searchTerm.length > DEFAULT_NULL ? 'form-search list-opened' : 'form-search';
  const isShowListOffers = searchTerm.length >= COUNT_SEARCH && offerList.length > DEFAULT_NULL;
  const [cursor, setCursor] = useState(-DEFAULT_UNIT);
  const cursorRef = useRef(cursor);
  const arrowUpPressed = useKeyPress('ArrowUp');
  const arrowDownPressed = useKeyPress('ArrowDown');
  const refList = useClickOutside<HTMLUListElement>(() => setCursor(-DEFAULT_UNIT));
  const refInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let isMounted = true;

    if(isMounted) {
      cursorRef.current = cursor;
    }

    return () => {
      isMounted = false;
    };
  }, [cursor]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted && arrowUpPressed && cursorRef.current > DEFAULT_NULL) {
      setCursor(cursorRef.current - DEFAULT_UNIT);
    }

    return () => {
      isMounted = false;
    };
  }, [arrowUpPressed]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted && arrowDownPressed && cursorRef.current < offerList.length - DEFAULT_UNIT) {
      setCursor(cursorRef.current + DEFAULT_UNIT);
    }

    return () => {
      isMounted = false;
    };
  }, [arrowDownPressed, offerList.length]);

  function findProduct(searchText: string, listOffersProduct: OfferCard[]): OfferCard[] {
    if (!searchText) {

      return [];
    }
    return listOffersProduct.filter(({ name }) => name.toLowerCase().includes(searchText.toLowerCase()));
  }

  useEffect(() => {
    let isMounted = true;

    if(isMounted) {
      const filteredOffers = findProduct(searchTerm, stateOffersProduct);

      setOfferList(filteredOffers);
    }

    return () => {
      isMounted = false;
    };
  }, [searchTerm, stateOffersProduct]);

  const onFocus = (index: number) => {
    setCursor(index);
  };

  function handleSearchProduct(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  function handleClickButtonReset() {
    setSearchTerm('');
    setOfferList([]);

    if (refInput.current) {
      refInput.current.focus();
      refInput.current.value = '';
    }
  }

  return (
    <div className={isShowButtonReset} data-testid='search-component'>
      <form>
        <label>
          <svg
            className="form-search__icon"
            width={16}
            height={16}
            aria-hidden="true"
          >
            <use xlinkHref="#icon-lens" />
          </svg>
          <input
            className="form-search__input"
            type="text"
            autoComplete="off"
            placeholder="Поиск по сайту"
            onChange={handleSearchProduct}
            ref={refInput}
          />
        </label>
        {isShowListOffers ?
          <ul ref={refList} className="form-search__select-list scroller" >
            {offerList.map((offer, index) => (
              <SearchListComponent
                key={offer.id}
                id={offer.id}
                offer={offer}
                inFocus={cursor === index}
                onFocus={onFocus}
                index={index}
              />
            ))}
          </ul>
          : ''}
      </form>
      <button className="form-search__reset" type="reset" onClick={handleClickButtonReset}>
        <svg width={10} height={10} aria-hidden="true">
          <use xlinkHref="#icon-close" />
        </svg>
        <span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>
  );
}

export { SearchComponent };
