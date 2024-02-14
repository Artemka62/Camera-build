import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/hook-use-store';
import { OfferCard } from '../../types/types-store';

function SearchComponent () {
  const stateOffersProduct = useAppSelector((state) => state.offers.offers);
  const [searchTerm, setSearchTerm] = useState('');
  const [offerList, setOfferList] = useState<OfferCard[]>([]);

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
    }, 0);

    return () => clearTimeout(debounce);
  }, [searchTerm, stateOffersProduct]);

  function handleSearchProduct(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  return (
    <div className="form-search list-opened">
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
          />
        </label>
        <ul className="form-search__select-list">
          {offerList.map((offer, index) => (
            <li key={offer.name} className="form-search__select-item" tabIndex={index}>
              {offer.name}
            </li>
          ))}
        </ul>
      </form>
      <button className="form-search__reset" type="reset">
        <svg width={10} height={10} aria-hidden="true">
          <use xlinkHref="#icon-close" />
        </svg>
        <span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>
  );
}

export { SearchComponent };
