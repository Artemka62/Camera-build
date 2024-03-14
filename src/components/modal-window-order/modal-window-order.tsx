import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../use-hook/use-hook-store';
import { useEffect, useRef } from 'react';
import { AppRoute, DEFAULT_NULL, DELAY_FOCUS, STRING_SPACE } from '../../src-const';
import { windowsSlice } from '../../store/slices/index';

function ModalWindowOrderComponent () {
  const isErrorLoading = useAppSelector((state) => state.order.error);
  const navigate = useNavigate();
  const returnToCatalogButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let isMounted = true;

    if (returnToCatalogButtonRef.current && isMounted) {
      setTimeout(() => {
        returnToCatalogButtonRef.current?.focus();
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
    dispatch(windowsSlice.actions.windowOrderSuccess(false));
  }

  function handleClickButtonClose () {
    pushDispatch();
  }

  function handleClickButtonReturnToCatalog () {
    pushDispatch();
    navigate(`${AppRoute.Main}`);

    window.scrollTo({
      top: DEFAULT_NULL,
      behavior: 'smooth'
    });
  }

  function handlePressKeyReturnToCatalog (event:React.KeyboardEvent, nextInputRef: React.RefObject<HTMLButtonElement> | null) {
    if(event.key === STRING_SPACE){
      event.preventDefault();
    }

    if (event.key === 'Tab' && nextInputRef && nextInputRef.current) {
      event.preventDefault();
      nextInputRef.current.focus();
    }
  }

  return(
    <div className="modal__content">
      <p className="title title--h4">{isErrorLoading ? <div>Заказ не оформлен<br/>попробуйте снова оформить заказ</div> : 'Спасибо за покупку'}</p>
      <svg className="modal__icon" width={80} height={78} aria-hidden="true">
        <use xlinkHref="#icon-review-success" />
      </svg>
      <div className="modal__buttons">
        <button
          className="btn btn--purple modal__btn modal__btn--fit-width"
          type="button"
          ref={returnToCatalogButtonRef}
          onClick={handleClickButtonReturnToCatalog}
          onKeyDown={(event) => handlePressKeyReturnToCatalog(event, closeButtonRef)}
        >
          Вернуться к покупкам
        </button>
      </div>
      <button
        className="cross-btn"
        type="button"
        aria-label="Закрыть попап"
        onKeyDown={(event) => handlePressKeyReturnToCatalog(event, returnToCatalogButtonRef)}
        ref={closeButtonRef}
        onClick={handleClickButtonClose}
      >
        <svg width={10} height={10} aria-hidden="true">
          <use xlinkHref="#icon-close" />
        </svg>
      </button>
    </div>
  );
}

export {ModalWindowOrderComponent};
