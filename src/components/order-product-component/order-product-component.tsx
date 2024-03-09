import React, { useState } from 'react';
import { postCoupon } from '../../services/thunk/thunk-post-coupon';
import { OfferLocalStorage } from '../../types/types-store';
import { useAppDispatch, useAppSelector } from '../../use-hooks/use-hook-store';
import { formatNumberWithSpaces } from '../../utils/utils-format-price';
import { setLocalStorage } from '../../utils/utils-local-storage';
import { DEFAULT_NULL, EMPTY_STRING, KEY_LOCAL_STORAGE_COUPON, KEY_LOCAL_STORAGE_OFFERS, ONE_HUNDRED, SettingCoupon,} from '../../src-const';
import { couponSlice } from '../../store/slice/slice-coupon';
import { postOrder } from '../../services/thunk/thunk-post-order';
import { windowsSlice } from '../../store/slice/slice-modal-windows';
import { offersBasketSlice } from '../../store/slice/slice-basket-offers';

function OrderProductComponent () {
  const stateOfferBasket: OfferLocalStorage[] = useAppSelector((state) => state.offersBasket.offers);
  const priceAllOffers = stateOfferBasket.reduce((accumulator: number, offerPrice: OfferLocalStorage) => (offerPrice.offer.price * offerPrice.count) + accumulator, DEFAULT_NULL);
  const dispatch = useAppDispatch();
  const stateCoupon = useAppSelector((state) => state.coupon.coupon);
  const [valueInput, setValueInput] = useState(stateCoupon);
  const [styleCouponIsValid, setStyleCouponIsValid] = useState('');
  const percentCoupon = useAppSelector((state) => state.coupon.percent);
  const couponDiscount = Math.round((priceAllOffers * percentCoupon) / ONE_HUNDRED);
  const priceAllOffersDiscount = priceAllOffers - couponDiscount;
  const styleDiscountPrice = percentCoupon === DEFAULT_NULL ? 'basket__summary-value' : 'basket__summary-value basket__summary-value--bonus';
  const idAllOffers = stateOfferBasket.map((offer) => offer.id);
  const array: [] = [];

  function handleClickCheckCoupon (event: React.MouseEvent) {
    event.preventDefault();
    const postCoupons = {
      coupon: valueInput
    };

    dispatch(postCoupon(postCoupons)).unwrap().then((data) => {
      setStyleCouponIsValid(SettingCoupon.InputValid);

      setLocalStorage(KEY_LOCAL_STORAGE_COUPON, {
        coupon: valueInput,
        percent: data
      });

      dispatch(couponSlice.actions.coupon(valueInput));

    }).catch (() => {
      setStyleCouponIsValid(SettingCoupon.InputInvalid);

      setLocalStorage(KEY_LOCAL_STORAGE_COUPON, {
        coupon: EMPTY_STRING,
        percent: DEFAULT_NULL
      });

      dispatch(couponSlice.actions.percent(DEFAULT_NULL));
      dispatch(couponSlice.actions.coupon(EMPTY_STRING));
    }) ;
  }

  function handleChangeInputCoupon (event: React.ChangeEvent<HTMLInputElement>) {
    const valueInputHtml = event.target.value;

    if(valueInputHtml.includes(' ')) {
      setValueInput(valueInput);

      return;
    }

    setStyleCouponIsValid(SettingCoupon.Input);
    setValueInput(valueInputHtml);
  }

  function handleClickOnSubmit () {
    const order = {
      camerasIds: idAllOffers,
      coupon: stateCoupon === EMPTY_STRING ? null : stateCoupon
    };

    dispatch(postOrder(order)).unwrap().then(() => {
      dispatch(windowsSlice.actions.windowOrderSuccess(true));
      dispatch(windowsSlice.actions.isModalWindow(true));
      setLocalStorage(KEY_LOCAL_STORAGE_OFFERS, array);
      dispatch(offersBasketSlice.actions.offersBasket(array));

    }).catch(() => {
      dispatch(windowsSlice.actions.windowOrderSuccess(true));
      dispatch(windowsSlice.actions.isModalWindow(true));
    });
  }

  return (
    <div className="basket__summary" >
      <div className="basket__promo">
        <p className="title title--h4">
          Если у вас есть промокод на скидку, примените его в этом поле
        </p>
        <div className="basket-form">
          <form
            action="#"
          >
            <div className={styleCouponIsValid}>
              <label>
                <span className="custom-input__label">Промокод</span>
                <input
                  type="text"
                  name="promo"
                  placeholder="Введите промокод"
                  onChange={handleChangeInputCoupon}
                  value={valueInput}
                />
              </label>
              {styleCouponIsValid === 'custom-input is-invalid' ? <p className="custom-input__error">Промокод неверный</p> : ''}
              <p className="custom-input__success">Промокод принят!</p>
            </div>
            <button
              className="btn"
              type="submit"
              onClick={handleClickCheckCoupon}
            >
              Применить
            </button>
          </form>
        </div>
      </div>
      <div className="basket__summary-order">
        <p className="basket__summary-item">
          <span className="basket__summary-text">Всего:</span>
          <span className="basket__summary-value">{formatNumberWithSpaces(priceAllOffers)} ₽</span>
        </p>
        <p className="basket__summary-item">
          <span className="basket__summary-text">Скидка:</span>
          <span className={styleDiscountPrice}>
            {formatNumberWithSpaces(couponDiscount)} ₽
          </span>
        </p>
        <p className="basket__summary-item">
          <span className="basket__summary-text basket__summary-text--total">
            К оплате:
          </span>
          <span className="basket__summary-value basket__summary-value--total">
            {couponDiscount === DEFAULT_NULL ? formatNumberWithSpaces(priceAllOffers) : formatNumberWithSpaces(priceAllOffersDiscount)} ₽
          </span>
        </p>
        <button
          className="btn btn--purple" type="submit"
          onClick={handleClickOnSubmit}
          disabled={stateOfferBasket.length === DEFAULT_NULL}
        >
          Оформить заказ
        </button>
      </div>
    </div>
  );
}

export {OrderProductComponent};
