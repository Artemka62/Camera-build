import React, { useEffect, useState, useRef } from 'react';
import { useAppSelector } from '../../hooks/hook-use-store';
import { OfferCard } from '../../types/types-store';
import { DEFAULT_NULL } from '../../src-const';
import { SearchListComponent } from '../search-list/search-list';

function SearchComponent () {
  const stateOffersProduct = useAppSelector((state) => state.offers.offers);
  const [searchTerm, setSearchTerm] = useState('');
  const [offerList, setOfferList] = useState<OfferCard[]>([]);
  const isShowButtonReset = searchTerm.length > DEFAULT_NULL ? 'form-search list-opened' : 'form-search';
  const isShowListOffers = searchTerm.length >= 3 && offerList.length > DEFAULT_NULL;
  const formRef = useRef<HTMLFormElement>(null);
  const [cursor, setCursor] = useState(-1);
  const cursorRef = useRef(cursor);


  const onFocus = (index: number) => {
    setCursor(index);
  };

  useEffect(() => {
    cursorRef.current = cursor;
  }, [cursor]);

  // useEffect(() => {
  //   if (arrowUpPressed && cursorRef.current > 0) {
  //     setCursor(cursorRef.current - 1);
  //   }
  // }, [arrowUpPressed]);

  // useEffect(() => {
  //   if (arrowDownPressed && cursorRef.current < offerList.length - 1) {
  //     setCursor(cursorRef.current + 1);
  //   }
  // }, [arrowDownPressed, offerList.length]);


  function findProduct(searchText: string, listOffersProduct: OfferCard[]): OfferCard[] {
    if (!searchText) {
      return [];
    }
    return listOffersProduct.filter(({ name }) => name.toLowerCase().includes(searchText.toLowerCase()));
  }

  useEffect(() => {
    const debounce = setTimeout(() => {
      const filteredOffers = findProduct(searchTerm, stateOffersProduct);
      setOfferList(filteredOffers);
    }, DEFAULT_NULL);

    return () => clearTimeout(debounce);
  }, [searchTerm, stateOffersProduct]);

  function handleSearchProduct(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  function handleReset() {
    setSearchTerm('');
    setOfferList([]);

    if (formRef.current) {
      formRef.current.reset();
    }
  }


  return (
    <div className={isShowButtonReset}>
      <form ref={formRef}>
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
          />
        </label>
        {isShowListOffers ?
          <ul className="form-search__select-list scroller" >
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
      <button className="form-search__reset" type="reset" onClick={handleReset}>
        <svg width={10} height={10} aria-hidden="true">
          <use xlinkHref="#icon-close" />
        </svg>
        <span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>
  );
}

export { SearchComponent };
