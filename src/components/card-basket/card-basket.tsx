import { useEffect } from 'react';
import { KEY_LOCAL_STORAGE } from '../../src-const';
import { offersBasketSlice } from '../../store/slice/slice-basket-offers';
import { OfferCard} from '../../types/types-store';
import { useAppDispatch, useAppSelector } from '../../use-hooks/use-hook-store';
import { formatNumberWithSpaces } from '../../utils/utils-format-price';
import { setLocalStorage } from '../../utils/utils-local-storage';

type CardBasketProps = {
  offer: OfferCard;
}

function CardBasketComponent ({offer}: CardBasketProps) {
  const stateBasketOffers = useAppSelector((state) => state.offersBasket.offers);
  const dispatch = useAppDispatch();

  function handleDeleteOffer () {
    const deleteOffer = stateBasketOffers.filter((offerStorage) => +offerStorage.id !== +offer.id);

    dispatch(offersBasketSlice.actions.offersBasket(deleteOffer));
    setLocalStorage(KEY_LOCAL_STORAGE, deleteOffer);
  }


  useEffect(() => {
    setLocalStorage(KEY_LOCAL_STORAGE, stateBasketOffers);
  },[stateBasketOffers]);


  return (
    <li className="basket-item">
      <div className="basket-item__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`/${offer.previewImgWebp}, /${offer.previewImgWebp2x} 2x`}
          />
          <img
            src={`/${offer.previewImg}`}
            srcSet={`/${offer.previewImg2x} 2x`}
            width={140}
            height={120}
            alt={offer.name}
          />
        </picture>
      </div>
      <div className="basket-item__description">
        <p className="basket-item__title">{offer.name}</p>
        <ul className="basket-item__list">
          <li className="basket-item__list-item">
            <span className="basket-item__article">Артикул:</span>{' '}
            <span className="basket-item__number">{offer.vendorCode}</span>
          </li>
          <li className="basket-item__list-item">
            {offer.type}
          </li>
          <li className="basket-item__list-item">
            {offer.level}
          </li>
        </ul>
      </div>
      <p className="basket-item__price">
        <span className="visually-hidden">Цена:</span>{formatNumberWithSpaces(offer.price)} ₽
      </p>
      <div className="quantity">
        <button
          className="btn-icon btn-icon--prev"
          aria-label="уменьшить количество товара"
        >
          <svg width={7} height={12} aria-hidden="true">
            <use xlinkHref="#icon-arrow" />
          </svg>
        </button>
        <label className="visually-hidden" htmlFor="counter1" />
        <input
          type="number"
          id="counter1"
          defaultValue={2}
          min={1}
          max={99}
          aria-label="количество товара"
        />
        <button
          className="btn-icon btn-icon--next"
          aria-label="увеличить количество товара"
        >
          <svg width={7} height={12} aria-hidden="true">
            <use xlinkHref="#icon-arrow" />
          </svg>
        </button>
      </div>
      <div className="basket-item__total-price">
        <span className="visually-hidden">Общая цена:</span>{555555} ₽
      </div>
      <button
        className="cross-btn"
        type="button"
        aria-label="Удалить товар"
        onClick={handleDeleteOffer}
      >
        <svg width={10} height={10} aria-hidden="true">
          <use xlinkHref="#icon-close" />
        </svg>
      </button>
    </li>
  );
}

export {CardBasketComponent};
