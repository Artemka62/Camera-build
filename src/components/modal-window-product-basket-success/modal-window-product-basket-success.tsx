import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/use-store';
import { windowsSlice } from '../../store/slice/modalWindows';
import { AppRoute, DELAY_FOCUS } from '../../const';
import { useEffect, useRef } from 'react';

function ModalWindowBasketSuccess () {
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


  function handleClickButtonClose () {
    dispatch(windowsSlice.actions.isModalWindow(false));
    dispatch(windowsSlice.actions.windowBasketSuccess(false));
  }

  function handleClickButtonCardsProduct () {
    dispatch(windowsSlice.actions.isModalWindow(false));
    dispatch(windowsSlice.actions.windowBasketSuccess(false));
    navigate(AppRoute.Main);
  }


  return (
    <div className="modal__content">
      <p className="title title--h4">Спасибо за покупку</p>
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

export {ModalWindowBasketSuccess};
