import React, { useState } from 'react';
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
  const stateBasketOffer = stateBasketOffers.find((offerBasket) => offerBasket.id === offer.id);
  const dispatch = useAppDispatch();
  const stateBasket = useAppSelector((state) => state.offersBasket.offers);
  const [valueInput, setValueInput] = useState(stateBasketOffer ? stateBasketOffer.count : '');


  function handleDeleteOffer () {
    const deleteOffer = stateBasketOffers.filter((offerStorage) => +offerStorage.id !== +offer.id);

    dispatch(offersBasketSlice.actions.offersBasket(deleteOffer));
    setLocalStorage(KEY_LOCAL_STORAGE, deleteOffer);
  }


  // useEffect(() => {
  //   setLocalStorage(KEY_LOCAL_STORAGE, stateBasketOffers);
  // },[stateBasketOffers]);

  function handleClickCountBack () {
    const isOfferInBasket = stateBasket.find((offerBasket) => offerBasket.id === offer.id);

    if(isOfferInBasket && offer){
      const changeOffer = {...isOfferInBasket};
      const changeOffers = [...stateBasket];

      changeOffer.count = changeOffer.count - 1;

      changeOffers.map((offerState, index) => {
        if (offerState.id === offer.id) {

          changeOffers.splice(index, 1, changeOffer);
        }
      });

      dispatch(offersBasketSlice.actions.offersBasket(changeOffers));
      setLocalStorage(KEY_LOCAL_STORAGE, changeOffers);
      setValueInput(changeOffer.count);

      //return;
    }


    //console.log(321);
  }


  function handleClickCountNext () {
    const isOfferInBasket = stateBasket.find((offerBasket) => offerBasket.id === offer.id);

    if(isOfferInBasket && offer){
      const changeOffer = {...isOfferInBasket};
      const changeOffers = [...stateBasket];

      changeOffer.count = changeOffer.count + 1;

      changeOffers.map((offerState, index) => {
        if (offerState.id === offer.id) {

          changeOffers.splice(index, 1, changeOffer);
        }
      });

      dispatch(offersBasketSlice.actions.offersBasket(changeOffers));
      setLocalStorage(KEY_LOCAL_STORAGE, changeOffers);
      setValueInput(changeOffer.count);

      // return;
    }


    //console.log(123);
  }

  function handleChangeCount (event:React.ChangeEvent<HTMLInputElement>) {

    setValueInput(event.currentTarget.value);
    // console.log(555)
  }


  function handleKeyDownInput (event: React.KeyboardEvent) {
    const isOfferInBasket = stateBasket.find((offerBasket) => offerBasket.id === offer.id);

    if(event.key === '.' || event.key === '+' || event.key === '-'){
      event.preventDefault();
    }


    if(isOfferInBasket && offer && event.key === 'Enter'){
      const changeOffer = {...isOfferInBasket};
      const changeOffers = [...stateBasket];

      changeOffer.count = +valueInput;

      changeOffers.map((offerState, index) => {
        if (offerState.id === offer.id) {

          changeOffers.splice(index, 1, changeOffer);
        }
      });

      dispatch(offersBasketSlice.actions.offersBasket(changeOffers));
      setLocalStorage(KEY_LOCAL_STORAGE, changeOffers);
    }

  }

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
          name='back'
          onClick={handleClickCountBack}
        >
          <svg width={7} height={12} aria-hidden="true">
            <use xlinkHref="#icon-arrow" />
          </svg>
        </button>
        <label className="visually-hidden" htmlFor="counter1" />
        <input
          type="number"
          id="counter1"
          value={valueInput}
          onChange={handleChangeCount}
          onKeyDown={handleKeyDownInput}
          min={1}
          max={99}
          aria-label="количество товара"
        />
        <button
          className="btn-icon btn-icon--next"
          aria-label="увеличить количество товара"
          name='next'
          onClick={handleClickCountNext}
        >
          <svg width={7} height={12} aria-hidden="true">
            <use xlinkHref="#icon-arrow" />
          </svg>
        </button>
      </div>
      <div className="basket-item__total-price">
        <span className="visually-hidden">Общая цена:</span>{formatNumberWithSpaces(stateBasketOffer ? offer.price * stateBasketOffer.count : offer.price)} ₽
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
