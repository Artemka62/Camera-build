import { Link, useNavigate } from 'react-router-dom';
import { AppRoute, DEFAULT_NULL, DELAY_FOCUS } from '../../src-const';
import { useAppDispatch, useAppSelector } from '../../use-hooks/use-hook-store';
import { windowsSlice } from '../../store/slice/slice-modal-windows';
import { useEffect, useRef } from 'react';

function ModalWindowAddBasketSuccessComponent () {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const goToBasket = useRef<HTMLButtonElement>(null);
  const refGoToBuy = useRef<HTMLAnchorElement>(null);
  const refCloseButton = useRef<HTMLButtonElement>(null);
  const stateOfferProduct = useAppSelector((state) => state.offer.offer);

  useEffect(() => {
    let isMounted = true;

    if (goToBasket.current && isMounted) {
      document.body.classList.add('scroll-lock');

      setTimeout(() => {
        goToBasket.current?.focus();
      }, DELAY_FOCUS);

      return () => {
        isMounted = false;
        document.body.classList.remove('scroll-lock');
      };
    }
  }, []);

  function dispatchStateWindows () {
    dispatch(windowsSlice.actions.isModalWindow(false));
    dispatch(windowsSlice.actions.windowAddBasketSuccess(false));
  }

  function handleClickReturnBuy () {
    dispatchStateWindows();

    window.scrollTo({
      top: DEFAULT_NULL,
      behavior: 'smooth'
    });
  }

  function handleKeyPressGoToBuy (event:React.KeyboardEvent, nextInputRef: React.RefObject<HTMLButtonElement | HTMLAnchorElement> | null) {
    if(event.key === ' '){
      event.preventDefault();
    }

    if (event.key === 'Tab' && nextInputRef && nextInputRef.current) {
      event.preventDefault();
      nextInputRef.current.focus();
    }
  }

  function handleClickGoToBuy () {
    dispatchStateWindows();
    navigate(AppRoute.Basket);

    window.scrollTo({
      top: DEFAULT_NULL,
      behavior: 'smooth'
    });
  }

  function handleClickCloseModal () {
    dispatchStateWindows();
  }

  return (
    <div className="modal__content">
      <p className="title title--h4">Товар успешно добавлен в корзину</p>
      <svg className="modal__icon" width={86} height={80} aria-hidden="true">
        <use xlinkHref="#icon-success" />
      </svg>
      <div className="modal__buttons" >
        <Link
          to={`${AppRoute.Product}/${stateOfferProduct?.id || ''}${AppRoute.Description}`}
          onClick={handleClickReturnBuy} className="btn btn--transparent modal__btn"
          onKeyDown={(event) => handleKeyPressGoToBuy(event, refCloseButton)}
          ref={refGoToBuy}
        >
          Продолжить покупки
        </Link>
        <button
          onClick={handleClickGoToBuy}
          ref={goToBasket}
          onKeyDown={(event) => handleKeyPressGoToBuy(event, refGoToBuy)}
          className="btn btn--purple modal__btn modal__btn--fit-width"
        >
          Перейти в корзину
        </button>
      </div>
      <button
        onClick={handleClickCloseModal}
        onKeyDown={(event) => handleKeyPressGoToBuy(event, goToBasket)}
        className="cross-btn" type="button"
        aria-label="Закрыть попап"
        ref={refCloseButton}
      >
        <svg width={10} height={10} aria-hidden="true">
          <use xlinkHref="#icon-close" />
        </svg>
      </button>
    </div>
  );
}

export {ModalWindowAddBasketSuccessComponent};
