import React, { useState } from 'react';
import { postCoupon } from '../../services/thunk/thunk-post-coupon';
import { OfferLocalStorage } from '../../types/types-store';
import { useAppDispatch, useAppSelector } from '../../use-hooks/use-hook-store';
import { formatNumberWithSpaces } from '../../utils/utils-format-price';
import { setLocalStorage } from '../../utils/utils-local-storage';
import { KEY_LOCAL_STORAGE_COUPON,} from '../../src-const';
import { couponSlice } from '../../store/slice/slice-coupon';

function OrderProductComponent () {
  const stateOfferBasket:OfferLocalStorage[] = useAppSelector((state) => state.offersBasket.offers);
  const priceAllOffers = stateOfferBasket.reduce((accumulator: number, offerPrice: OfferLocalStorage) => (offerPrice.offer.price * offerPrice.count) + accumulator, 0);
  const dispatch = useAppDispatch();
  const stateCoupon = useAppSelector((state) => state.coupon.coupon);
  const [valueInput, setValueInput] = useState(stateCoupon);
  const [styleCouponIsValid, setStyleCouponIsValid] = useState('');
  const percentCoupon = useAppSelector((state) => state.coupon.percent);
  const couponDiscount = (priceAllOffers * percentCoupon) / 100;
  const priceAllOffersDiscount = priceAllOffers - couponDiscount;
  const styleDiscountPrice = percentCoupon === 0 ? 'basket__summary-value' : 'basket__summary-value basket__summary-value--bonus';

  const postCoupons = {
    coupon: valueInput
  };

  function handleClickCheckCoupon (event: React.MouseEvent) {
    event.preventDefault();

    dispatch(postCoupon(postCoupons)).unwrap().then((data) => {
      setStyleCouponIsValid('custom-input is-valid');

      setLocalStorage(KEY_LOCAL_STORAGE_COUPON, {
        coupon: valueInput,
        percent: data
      });
      dispatch(couponSlice.actions.coupon(valueInput));

    }).catch (() => {
      setStyleCouponIsValid('custom-input is-invalid');

      setLocalStorage(KEY_LOCAL_STORAGE_COUPON, {
        coupon: '',
        percent: 0
      });

      dispatch(couponSlice.actions.percent(0));
      dispatch(couponSlice.actions.coupon(''));
    }) ;
  }

  function handleChangeInputCoupon (event: React.ChangeEvent<HTMLInputElement>) {
    const valueInputHtml = event.target.value;

    if(valueInputHtml.includes(' ')) {
      setValueInput(valueInput);

      return;
    }

    setStyleCouponIsValid('custom-input');
    setValueInput(valueInputHtml);
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
            {couponDiscount === 0 ? formatNumberWithSpaces(priceAllOffers) : formatNumberWithSpaces(priceAllOffersDiscount)} ₽
          </span>
        </p>
        <button className="btn btn--purple" type="submit">
          Оформить заказ
        </button>
      </div>
    </div>
  );
}

export {OrderProductComponent};
