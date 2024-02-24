import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../use-hooks/use-hook-store';
import { windowsSlice } from '../../store/slice/slice-modal-windows';
import { AppRoute, DEFAULT_NULL, DELAY_FOCUS } from '../../src-const';
import { useEffect, useRef } from 'react';

function ModalWindowReviewSuccess () {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const successBuyButtonRef = useRef<HTMLButtonElement>(null);
  const stateOfferProduct = useAppSelector((state) => state.offer.offer);

  useEffect(() => {
    let isMounted = true;

    if (successBuyButtonRef.current && isMounted) {
      setTimeout(() => {
        successBuyButtonRef.current?.focus();
      }, DELAY_FOCUS);
    }

    return () => {
      isMounted = false;
    };
  }, []);

  function pushDispatch () {
    dispatch(windowsSlice.actions.isModalWindow(false));
    dispatch(windowsSlice.actions.windowReviewSuccess(false));
  }

  function handleClickButtonClose () {
    pushDispatch();
  }

  function handleClickButtonCardProduct () {
    pushDispatch();

    navigate(`${AppRoute.Product}/${stateOfferProduct?.id || ''}${AppRoute.Description}`);

    window.scrollTo({
      top: DEFAULT_NULL,
      behavior: 'smooth'
    });
  }

  function handlePressKeyCardsProduct (event:React.KeyboardEvent) {
    if(event.key === ' '){
      event.preventDefault();
    }
  }

  return (
    <div className="modal__content">
      <p className="title title--h4">Спасибо за отзыв</p>
      <svg className="modal__icon" width={80} height={78} aria-hidden="true">
        <use xlinkHref="#icon-review-success" />
      </svg>
      <div className="modal__buttons">
        <button
          ref={successBuyButtonRef}
          onClick={handleClickButtonCardProduct}
          onKeyDown={handlePressKeyCardsProduct}
          className="btn btn--purple modal__btn modal__btn--fit-width"
          type="button"
        >
          Вернуться к покупкам
        </button>
      </div>
      <button onClick={handleClickButtonClose}className="cross-btn" type="button" aria-label="Закрыть попап">
        <svg width={10} height={10} aria-hidden="true">
          <use xlinkHref="#icon-close" />
        </svg>
      </button>
    </div>
  );
}

export {ModalWindowReviewSuccess};
