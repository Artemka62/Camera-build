import React, { useEffect, useState } from 'react';
import { postCoupon } from '../../services/thunk/thunk-post-coupon';
import { OfferLocalStorage } from '../../types/types-store';
import { useAppDispatch, useAppSelector } from '../../use-hooks/use-hook-store';
import { formatNumberWithSpaces } from '../../utils/utils-format-price';

function OrderProductComponent () {
  const stateOfferBasket:OfferLocalStorage[] = useAppSelector((state) => state.offersBasket.offers);
  const priceAllOffers = stateOfferBasket.reduce((accumulator: number, offerPrice: OfferLocalStorage) => (offerPrice.offer.price * offerPrice.count) + accumulator, 0);
  const dispatch = useAppDispatch();
  const [valueInput, setValueInput] = useState('');
  const [styleCouponIsValid, setStyleCouponIsValid] = useState('');
  const isErrorCoupon = useAppSelector((state) => state.coupon.error);
  const percentCoupon = useAppSelector((state) => state.coupon.percent);
  const isValidCouponStyle = isErrorCoupon ? 'custom-input is-invalid' : 'custom-input is-valid';



  const postCoupons = {
    coupon: valueInput
  };


  // useEffect(() => {

  //   setStyleCouponIsValid(styleCouponIsValid);
  // },[styleCouponIsValid]);


  // function checkStyleValidCoupon () {
  //   if(isErrorCoupon){
  //     return setStyleCouponIsValid('custom-input is-invalid');
  //   }

  //   if(!isErrorCoupon){
  //     return setStyleCouponIsValid('custom-input is-valid');
  //   }

  // }

  function handleClickCheckCoupon (event: React.MouseEvent) {
    event.preventDefault();

    dispatch(postCoupon(postCoupons)).unwrap().then(() => {

      setStyleCouponIsValid('custom-input is-valid');

    }).catch (() => {
      setStyleCouponIsValid('custom-input is-invalid');
    }) ;
  }

  function handleChangeInputCoupon (event: React.ChangeEvent<HTMLInputElement>) {
    const valueInputHtml = event.target.value;

    if(valueInputHtml.includes(' ')) {
      setValueInput(valueInput);
      return;
    }
    //setStyleCouponIsValid('custom-input');
    setValueInput(valueInputHtml);


    //console.log(event.target.value);
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
          <span className="basket__summary-value basket__summary-value--bonus">
            0 ₽
          </span>
        </p>
        <p className="basket__summary-item">
          <span className="basket__summary-text basket__summary-text--total">
            К оплате:
          </span>
          <span className="basket__summary-value basket__summary-value--total">
            111 390 ₽
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
