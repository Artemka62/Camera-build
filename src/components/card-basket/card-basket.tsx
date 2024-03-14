import React, { useRef, useState } from 'react';
import { DEFAULT_NULL, DEFAULT_UNIT, KEY_LOCAL_STORAGE_OFFERS, SettingParamCardBasket } from '../../src-const';
import { offersBasketSlice } from '../../store/slice/slice-basket-offers';
import { OfferCard} from '../../type/type-store';
import { useAppDispatch, useAppSelector } from '../../use-hook/use-hook-store';
import { formatNumberWithSpaces } from '../../utils/utils-format-price';
import { setLocalStorage } from '../../utils/utils-local-storage';
import { windowsSlice } from '../../store/slice/slice-modal-windows';

type CardBasketProps = {
  offer: OfferCard;
}

function CardBasketComponent ({offer}: CardBasketProps) {
  const stateBasketOffers = useAppSelector((state) => state.offersBasket.offers);
  const stateBasketOffer = stateBasketOffers.find((offerBasket) => offerBasket.id === offer.id);
  const dispatch = useAppDispatch();
  const stateBasket = useAppSelector((state) => state.offersBasket.offers);
  const [valueInput, setValueInput] = useState(stateBasketOffer ? stateBasketOffer.count : '');
  const inputRef = useRef<HTMLInputElement>(null);

  function handleClickDeleteOffer () {
    dispatch(windowsSlice.actions.isModalWindow(true));
    dispatch(windowsSlice.actions.windowDeleteBasket(true));
    dispatch(windowsSlice.actions.windowDeleteBasketId(offer.id));
  }

  function setValidationOffer (nameInput: string) {
    const isOfferInBasket = stateBasket.find((offerBasket) => offerBasket.id === offer.id);

    if(isOfferInBasket && offer){
      const changeOffer = {...isOfferInBasket};
      const changeOffers = [...stateBasket];

      if(nameInput === SettingParamCardBasket.ButtonBack) {
        changeOffer.count = changeOffer.count - DEFAULT_UNIT;
      }

      if(nameInput === SettingParamCardBasket.ButtonNext) {
        changeOffer.count = changeOffer.count + DEFAULT_UNIT;
      }

      if(nameInput === SettingParamCardBasket.Input) {
        changeOffer.count = +valueInput;
      }

      if(nameInput === SettingParamCardBasket.Input && +valueInput === DEFAULT_NULL || +valueInput > SettingParamCardBasket.MaxCountCard){
        changeOffer.count = DEFAULT_UNIT;
      }

      changeOffers.map((offerState, index) => {
        if (offerState.id === offer.id) {
          changeOffers.splice(index, DEFAULT_UNIT, changeOffer);
        }
      });

      dispatch(offersBasketSlice.actions.offersBasket(changeOffers));
      setLocalStorage(KEY_LOCAL_STORAGE_OFFERS, changeOffers);
      setValueInput(changeOffer.count);
    }
  }

  function handleClickOnBlur () {
    inputRef.current?.blur();
    setValidationOffer(SettingParamCardBasket.Input);
  }

  function handleClickCountBack () {
    setValidationOffer(SettingParamCardBasket.ButtonBack);
  }

  function handleClickCountNext () {
    setValidationOffer(SettingParamCardBasket.ButtonNext);
  }

  function handleChangeCount (event:React.ChangeEvent<HTMLInputElement>) {
    setValueInput(event.currentTarget.value);
  }

  function handleKeyDownInput (event: React.KeyboardEvent) {
    const isOfferInBasket = stateBasket.find((offerBasket) => offerBasket.id === offer.id);

    if(event.key === SettingParamCardBasket.KeyDot || event.key === SettingParamCardBasket.KeyPlus || event.key === SettingParamCardBasket.KeyMinus){
      event.preventDefault();
    }

    if(isOfferInBasket && offer && event.key === SettingParamCardBasket.KeyEnter){
      setValidationOffer(SettingParamCardBasket.Input);
    }
  }

  return (
    <li className="basket-item" data-testid={'card-basket'}>
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
          disabled ={stateBasketOffer ? stateBasketOffer.count < SettingParamCardBasket.MinCountButton : true}
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
          onBlur={handleClickOnBlur}
          ref={inputRef}
          min={1}
          max={99}
          aria-label="количество товара"
        />
        <button
          className="btn-icon btn-icon--next"
          aria-label="увеличить количество товара"
          name='next'
          onClick={handleClickCountNext}
          disabled = {stateBasketOffer ? stateBasketOffer.count > SettingParamCardBasket.MaxCountButton : true}
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
        onClick={handleClickDeleteOffer}
      >
        <svg width={10} height={10} aria-hidden="true">
          <use xlinkHref="#icon-close" />
        </svg>
      </button>
    </li>
  );
}

export {CardBasketComponent};
