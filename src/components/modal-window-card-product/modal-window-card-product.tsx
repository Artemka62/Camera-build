import { useEffect, useRef} from 'react';
import { useAppDispatch, useAppSelector } from '../../use-hooks/use-hook-store';
import { windowsSlice } from '../../store/slice/slice-modal-windows';
import { DEFAULT_NULL, DELAY_FOCUS, KEY_LOCAL_STORAGE} from '../../src-const';
import { formatNumberWithSpaces } from '../../utils/utils-format-price';
import { LoadingComponent } from '../loading-component/loading-component';
import { offersBasketSlice } from '../../store/slice/slice-basket-offers';
import { OfferLocalStorage } from '../../types/types-store';
import { setLocalStorage } from '../../utils/utils-local-storage';

function ModalWindowCardProductComponent () {
  const stateCard = useAppSelector((state) => state.offer.offer);
  const dispatch = useAppDispatch();
  const addBasketButtonRef = useRef<HTMLButtonElement>(null);
  const refCloseButton = useRef<HTMLButtonElement>(null);
  const isLoadingOffer = useAppSelector((state) => state.offer.loading);
  const stateBasket = useAppSelector((state) => state.offersBasket.offers);

  function handleClickButtonClose () {
    dispatch(windowsSlice.actions.windowProduct(false));
    dispatch(windowsSlice.actions.isModalWindow(false));
    dispatch(windowsSlice.actions.windowAddBasketSuccess(false));
  }

  function handleClickAddBasket () {
    const isOfferInBasket = stateBasket.find((offerBasket) => offerBasket.id === stateCard?.id);

    dispatch(windowsSlice.actions.windowProduct(false));
    dispatch(windowsSlice.actions.windowAddBasketSuccess(true));

    if(isOfferInBasket && stateCard){
      const changeOffer = {...isOfferInBasket};
      const changeOffers = [...stateBasket];

      changeOffer.count = changeOffer.count + 1;

      changeOffers.map((offer, index) => {
        if (offer.id === stateCard.id) {

          changeOffers.splice(index, 1, changeOffer);
        }
      });

      dispatch(offersBasketSlice.actions.offersBasket(changeOffers));
      setLocalStorage(KEY_LOCAL_STORAGE, changeOffers);

      return;
    }

    if(stateCard){
      const updatedStateBasket: OfferLocalStorage[] = [...stateBasket];

      updatedStateBasket.push({
        count: 1,
        id: +stateCard.id,
        offer: stateCard,
      });

      dispatch(offersBasketSlice.actions.offersBasket(updatedStateBasket));
      setLocalStorage(KEY_LOCAL_STORAGE, updatedStateBasket);
    }
  }

  function handlePressKeyAddBasket (event:React.KeyboardEvent, nextInputRef: React.RefObject<HTMLButtonElement> | null) {
    if(event.key === ' '){
      event.preventDefault();
    }

    if (event.key === 'Tab' && nextInputRef && nextInputRef.current) {
      event.preventDefault();
      nextInputRef.current.focus();
    }
  }

  useEffect(() => {
    let isMounted = true;

    if (addBasketButtonRef.current && isMounted) {
      setTimeout(() => {
        addBasketButtonRef.current?.focus();
      }, DELAY_FOCUS);
    }

    if (isMounted) {
      document.body.classList.add('scroll-lock');
    }

    return () => {
      document.body.classList.remove('scroll-lock');
      isMounted = false;
    };
  }, []);

  if(isLoadingOffer){
    return <LoadingComponent/>;
  }

  return (
    <div className="modal__content">
      <p className="title title--h4">Добавить товар в корзину</p>
      <div className="basket-item basket-item--short">
        <div className="basket-item__img">
          <picture>
            <source
              type="/image/webp"
              srcSet={`/${stateCard?.previewImgWebp || ''}, /${stateCard?.previewImgWebp2x || ''} 2x`}
            />
            <img
              src={`/${stateCard?.previewImg || ''}`}
              srcSet={`/${stateCard?.previewImgWebp2x || ''} 2x`}
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
            <span className="visually-hidden">Цена:</span>{formatNumberWithSpaces(stateCard?.price || DEFAULT_NULL)} ₽
          </p>
        </div>
      </div>
      <div className="modal__buttons">
        <button
          onClick={handleClickAddBasket}
          onKeyDown={(event) => handlePressKeyAddBasket(event, refCloseButton)}
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
      <button
        onClick={handleClickButtonClose}
        className="cross-btn" type="button"
        aria-label="Закрыть попап"
        ref={refCloseButton}
        onKeyDown={(event) => handlePressKeyAddBasket(event, addBasketButtonRef)}
      >
        <svg width={10} height={10} aria-hidden="true">
          <use xlinkHref="#icon-close" />
        </svg>
      </button>
    </div>
  );
}

export {ModalWindowCardProductComponent};
