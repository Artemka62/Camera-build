import { ModalWindowCardProductComponent } from '../modal-window-card-product/modal-window-card-product';
import { ModalWindowReviewSuccess } from '../modal-window-review-success/modal-window-review-success';
import { useAppDispatch, useAppSelector } from '../../use-hooks/index';
import { windowsSlice } from '../../store/slices/index';
import { ModalWindowAddBasketSuccessComponent } from '../modal-window-add-basket-success/modal-window-add-basket-success';
import { ModalWindowReviewProductComponent } from '../modal-window-review-product/modal-window-review-product';
import { useEffect } from 'react';
import { useNavigationType } from 'react-router-dom';
import { browserHistory } from '../../src-browser-history';
import { CHANGE_PAGE } from '../../src-const';
import { ModalWindowDeleteProductComponent } from '../modal-window-delete-product/modal-window-delete-product';
import { ModalWindowOrderComponent } from '../modal-window-order/modal-window-order';
import { orderSlice } from '../../store/slices/index';

function ModalWindowComponent () {
  const isWindowModalOpen = useAppSelector((state) => state.windows.isWindowModalOpen);
  const isCardProductOpen = useAppSelector((state) => state.windows.isWindowProductOpen);
  const isFormReviewOpen = useAppSelector((state) => state.windows.isWindowReviewOpen);
  const isBasketSuccessOpen = useAppSelector((state) => state.windows.isWindowReviewSuccessOpen);
  const isBasketAddSuccessOpen = useAppSelector((state) => state.windows.isWindowAddBasketSuccessOpen);
  const iDeleteProductOpen = useAppSelector((state) => state.windows.isWindowDeleteBasketOpen);
  const isOrderSuccessOpen = useAppSelector((state) => state.windows.isOrderSuccessOpen);
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
    dispatch(windowsSlice.actions.windowDeleteBasket(false));
    dispatch(windowsSlice.actions.windowOrderSuccess(false));
  }

  useEffect(() => {
    let isMounted = true;

    if (isMounted && buttonNextBackBrowser === CHANGE_PAGE) {
      pushDispatch();
    }

    return () => {
      dispatch(orderSlice.actions.error(false));
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
      <div className="modal__wrapper ">
        <div className="modal__overlay" onClick={handleClickOverlay} />
        {isCardProductOpen ? <ModalWindowCardProductComponent/> : ''}
        {isFormReviewOpen ? <ModalWindowReviewProductComponent/> : ''}
        {isBasketSuccessOpen ? <ModalWindowReviewSuccess/> : ''}
        {isBasketAddSuccessOpen ? <ModalWindowAddBasketSuccessComponent/> : ''}
        {iDeleteProductOpen ? <ModalWindowDeleteProductComponent/> : ''}
        {isOrderSuccessOpen ? <ModalWindowOrderComponent/> : ''}
      </div>
    </div>
  );
}

export {ModalWindowComponent};
