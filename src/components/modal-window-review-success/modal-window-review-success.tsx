import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/hook-use-store';
import { windowsSlice } from '../../store/slice/modal-windows';
import { AppRoute, DELAY_FOCUS } from '../../src-const';
import { useEffect, useRef } from 'react';

function ModalWindowReviewSuccess () {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const successBuyButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (successBuyButtonRef.current) {
      setTimeout(() => {
        successBuyButtonRef.current?.focus();
      }, DELAY_FOCUS);
    }
  }, []);

  function pushDispatch () {
    dispatch(windowsSlice.actions.isModalWindow(false));
    dispatch(windowsSlice.actions.windowReviewSuccess(false));
  }

  function handleClickButtonClose () {
    pushDispatch();
  }

  function handleClickButtonCardsProduct () {
    pushDispatch();
    navigate(AppRoute.Main);
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
          onClick={handleClickButtonCardsProduct}
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
