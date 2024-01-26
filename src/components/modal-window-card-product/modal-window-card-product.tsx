import { useEffect, useRef} from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hook-use-store';
import { windowsSlice } from '../../store/slice/modal-windows';
import { DELAY_FOCUS } from '../../src-const';

function ModalWindowCardProductComponent () {
  const stateCard = useAppSelector((state) => state.offer.reviews);
  const dispatch = useAppDispatch();
  const addBasketButtonRef = useRef<HTMLButtonElement>(null);

  function handleClickButtonClose () {
    dispatch(windowsSlice.actions.windowProduct(false));
    dispatch(windowsSlice.actions.isModalWindow(false));
    dispatch(windowsSlice.actions.windowAddBasketSuccess(false));
  }

  function handleClickAddBasket () {
    dispatch(windowsSlice.actions.windowProduct(false));
    dispatch(windowsSlice.actions.windowAddBasketSuccess(true));

  }

  useEffect(() => {
    if (addBasketButtonRef.current) {
      setTimeout(() => {
        addBasketButtonRef.current?.focus();
      }, DELAY_FOCUS);
    }

    document.body.classList.add('scroll-lock');

    return () => document.body.classList.remove('scroll-lock');
  }, []);

  return (
    <div className="modal__content">
      <p className="title title--h4">Добавить товар в корзину</p>
      <div className="basket-item basket-item--short">
        <div className="basket-item__img">
          <picture>
            <source
              type="/image/webp"
              srcSet={`/${stateCard?.previewImgWebp || ''}`}
            />
            <img
              src={`/${stateCard?.previewImg || ''}`}
              srcSet={`/${stateCard?.previewImgWebp || ''}`}
              width={140}
              height={120}
              alt={stateCard?.name}
            />
          </picture>
        </div>
        <div className="basket-item__description">
          <p className="basket-item__title">{stateCard?.name}</p>
          <ul className="basket-item__list">
            <li className="basket-item__list-item">
              <span className="basket-item__article">Артикул:</span>{' '}
              <span className="basket-item__number">{stateCard?.vendorCode}</span>
            </li>
            <li className="basket-item__list-item">{stateCard?.category}</li>
            <li className="basket-item__list-item">{stateCard?.level} уровень</li>
          </ul>
          <p className="basket-item__price">
            <span className="visually-hidden">Цена:</span>{stateCard?.price} ₽
          </p>
        </div>
      </div>
      <div className="modal__buttons">
        <button
          onClick={handleClickAddBasket}
          ref={addBasketButtonRef}
          className="btn btn--purple modal__btn modal__btn--fit-width"
          type="button"
        >
          <svg width={24} height={16} aria-hidden="true">
            <use xlinkHref="#icon-add-basket" />
          </svg>
          Добавить в корзину
        </button>
      </div>
      <button onClick={handleClickButtonClose} className="cross-btn" type="button" aria-label="Закрыть попап" >
        <svg width={10} height={10} aria-hidden="true">
          <use xlinkHref="#icon-close" />
        </svg>
      </button>
    </div>
  );
}

export {ModalWindowCardProductComponent};
