import { ModalWindowCardProductComponent } from '../modal-window-card-product/modal-window-card-product';
import { ModalWindowReviewSuccess } from '../modal-window-review-success/modal-window-review-success';
import { useAppDispatch, useAppSelector } from '../../hooks/hook-use-store';
import { windowsSlice } from '../../store/slice/slice-modal-windows';
import { ModalWindowAddBasketSuccessComponent } from '../modal-window-add-basket-success/modal-window-add-basket-success';
import { ModalWindowReviewProductComponent } from '../modal-window-review-product/modal-window-review-product';
import { useEffect } from 'react';
import { useNavigationType } from 'react-router-dom';
import { browserHistory } from '../../src-browser-history';
import { CHANGE_PAGE } from '../../src-const';

function ModalWindowComponent () {
  const isWindowModalOpen = useAppSelector((state) => state.windows.isWindowModalOpen);
  const isCardProductOpen = useAppSelector((state) => state.windows.isWindowProductOpen);
  const isFormReviewOpen = useAppSelector((state) => state.windows.isWindowReviewOpen);
  const isBasketSuccessOpen = useAppSelector((state) => state.windows.isWindowReviewSuccessOpen);
  const isBasketAddSuccessOpen = useAppSelector((state) => state.windows.isWindowAddBasketSuccessOpen);
  const dispatch = useAppDispatch();
  const isActive = isWindowModalOpen ? 'modal is-active' : 'modal modal--narrow';
  const browserLocation = browserHistory.location.key;
  const buttonNextBackBrowser = useNavigationType();

  function pushDispatch () {
    dispatch(windowsSlice.actions.isModalWindow(false));
    dispatch(windowsSlice.actions.windowReviewSuccess(false));
    dispatch(windowsSlice.actions.windowProduct(false));
    dispatch(windowsSlice.actions.windowReview(false));
    dispatch(windowsSlice.actions.windowAddBasketSuccess(false));
  }

  useEffect(() => {
    let isMounted = true;

    if (isMounted && buttonNextBackBrowser === CHANGE_PAGE) {
      pushDispatch();
    }

    return () => {
      isMounted = false;
    };
  }, [browserLocation]);

  function handleClickOverlay () {
    pushDispatch();
  }

  function handleKeyDownEscape (event: React.KeyboardEvent) {
    if (event.key === 'Escape') {
      pushDispatch();
    }
  }

  return (
    <div className={isActive} data-testid= 'modal-window' onKeyDown={handleKeyDownEscape}>
      <div className="modal__wrapper " >
        <div className="modal__overlay" onClick={handleClickOverlay} />
        {isCardProductOpen ? <ModalWindowCardProductComponent/> : ''}
        {isFormReviewOpen ? <ModalWindowReviewProductComponent/> : ''}
        {isBasketSuccessOpen ? <ModalWindowReviewSuccess/> : ''}
        {isBasketAddSuccessOpen ? <ModalWindowAddBasketSuccessComponent/> : ''}
      </div>
    </div>
  );
}

export {ModalWindowComponent};
