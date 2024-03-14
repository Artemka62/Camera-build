import { useEffect, useRef } from 'react';
import { AppRoute, DEFAULT_NULL, DELAY_FOCUS, KEY_LOCAL_STORAGE_OFFERS } from '../../src-const';
import { offersBasketSlice } from '../../store/slice/slice-basket-offers';
import { windowsSlice } from '../../store/slice/slice-modal-windows';
import { useAppDispatch, useAppSelector } from '../../use-hook/use-hook-store';
import { setLocalStorage } from '../../utils/utils-local-storage';
import { Link } from 'react-router-dom';

function ModalWindowDeleteProductComponent () {
  const idDeleteOffer = useAppSelector((state) => state.windows.idDeleteOffer);
  const stateBasketOffers = useAppSelector((state) => state.offersBasket.offers);
  const offer = stateBasketOffers.find((findOffer) => findOffer.id === idDeleteOffer);
  const dispatch = useAppDispatch();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const deleteButtonRef = useRef<HTMLButtonElement>(null);
  const buyButtonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    let isMounted = true;

    if (deleteButtonRef.current && isMounted) {
      setTimeout(() => {
        deleteButtonRef.current?.focus();
      }, DELAY_FOCUS);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    if(isMounted){
      document.body.classList.add('scroll-lock');
    }

    return () => {
      document.body.classList.remove('scroll-lock');
      isMounted = false;
    };
  }, []);


  function pushDispatch () {
    dispatch(windowsSlice.actions.isModalWindow(false));
    dispatch(windowsSlice.actions.windowDeleteBasket(false));
  }

  function handleDeleteOffer () {
    const deleteOffer = stateBasketOffers.filter((offerStorage) => +offerStorage.id !== +idDeleteOffer);

    dispatch(offersBasketSlice.actions.offersBasket(deleteOffer));
    setLocalStorage(KEY_LOCAL_STORAGE_OFFERS, deleteOffer);
    pushDispatch();
  }

  function handleClickReturnBuy () {
    pushDispatch();

    window.scrollTo({
      top: DEFAULT_NULL,
      behavior: 'smooth'
    });
  }

  function handleClickButtonClose () {
    pushDispatch();
  }

  function handlePressKeyCardsProduct (event:React.KeyboardEvent, nextInputRef: React.RefObject<HTMLButtonElement | HTMLAnchorElement> | null) {
    if(event.key === ' '){
      event.preventDefault();
    }

    if (event.key === 'Tab' && nextInputRef && nextInputRef.current) {
      event.preventDefault();
      nextInputRef.current.focus();
    }
  }

  return (
    <div className="modal__content">
      <p className="title title--h4">Удалить этот товар?</p>
      <div className="basket-item basket-item--short">
        <div className="basket-item__img">
          <picture>
            <source
              type="image/webp"
              srcSet={`/${offer?.offer.previewImgWebp ?? ''}, /${offer?.offer.previewImgWebp2x ?? ''} 2x`}
            />
            <img
              src={`/${offer?.offer.previewImg ?? ''}`}
              srcSet={`/${offer?.offer.previewImg2x ?? ''} 2x`}
              width={140}
              height={120}
              alt="Фотоаппарат «Орлёнок»"
            />
          </picture>
        </div>
        <div className="basket-item__description">
          <p className="basket-item__title">{offer?.offer.name}</p>
          <ul className="basket-item__list">
            <li className="basket-item__list-item">
              <span className="basket-item__article">Артикул:</span>{' '}
              <span className="basket-item__number">{offer?.offer.vendorCode}</span>
            </li>
            <li className="basket-item__list-item">{offer?.offer.type}</li>
            <li className="basket-item__list-item">{offer?.offer.level}</li>
          </ul>
        </div>
      </div>
      <div className="modal__buttons">
        <button
          className="btn btn--purple modal__btn modal__btn--half-width"
          type="button"
          onClick={handleDeleteOffer}
          ref={deleteButtonRef}
          onKeyDown={(event) => handlePressKeyCardsProduct(event, closeButtonRef)}
        >
          Удалить
        </button>
        <Link
          to={`${AppRoute.Main}`}
          className="btn btn--transparent modal__btn modal__btn--half-width"
          onClick={handleClickReturnBuy}
          ref={buyButtonRef}
          onKeyDown={(event) => handlePressKeyCardsProduct(event, deleteButtonRef)}
        >
          Продолжить покупки
        </Link>
      </div>
      <button
        className="cross-btn"
        type="button"
        aria-label="Закрыть попап"
        onClick={handleClickButtonClose}
        onKeyDown={(event) => handlePressKeyCardsProduct(event, buyButtonRef)}
        ref={closeButtonRef}
      >
        <svg width={10} height={10} aria-hidden="true">
          <use xlinkHref="#icon-close" />
        </svg>
      </button>
    </div>
  );
}

export {ModalWindowDeleteProductComponent};
