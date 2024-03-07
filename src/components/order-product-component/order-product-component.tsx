import React, { useState } from 'react';
import { postCoupon } from '../../services/thunk/thunk-post-coupon';
import { OfferLocalStorage } from '../../types/types-store';
import { useAppDispatch, useAppSelector } from '../../use-hooks/use-hook-store';
import { formatNumberWithSpaces } from '../../utils/utils-format-price';

function OrderProductComponent () {
  const stateOfferBasket:OfferLocalStorage[] = useAppSelector((state) => state.offersBasket.offers);
  const priceAllOffers = stateOfferBasket.reduce((accumulator: number, offerPrice: OfferLocalStorage) => (offerPrice.offer.price * offerPrice.count) + accumulator, 0);
  const dispatch = useAppDispatch();
  const [valueInput, setValueInput] = useState('');

  const postCoupons = {
    coupon: valueInput
  };

  function handleClickCheckCoupon (event: React.MouseEvent) {
    event.preventDefault();

    dispatch(postCoupon(postCoupons));
  }

  function handleInputCoupon (event: React.ChangeEvent<HTMLInputElement>) {
    const valueInputHtml = event.target.value;

    if(valueInputHtml.includes(' ')) {
      setValueInput(valueInput);
      return;
    }

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
            <div className="custom-input ">
              <label>
                <span className="custom-input__label">Промокод</span>
                <input
                  type="text"
                  name="promo"
                  placeholder="Введите промокод"
                  onChange={handleInputCoupon}
                  value={valueInput}
                />
              </label>
              <p className="custom-input__error">Промокод неверный</p>
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
