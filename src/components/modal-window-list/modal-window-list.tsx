import { useEffect } from 'react';
import { ModalWindowCardProductComponent } from '../modal-window-card-product/modal-window-card-product';
import { ModalWindowReviewSuccess } from '../modal-window-review-success/modal-window-review-success';
import { ModalWindowReviewProductComponent } from '../modal-window-reviev-product/modal-window-rewiev-product';
import { useAppDispatch, useAppSelector } from '../../hooks/hook-use-store';
import { windowsSlice } from '../../store/slice/slice-modal-windows';
import { ModalWindowAddBasketSuccessComponent } from '../modal-window-add-basket-success/modal-window-add-basket-success';

function ModalWindowComponent () {
  const isWindowModalOpen = useAppSelector((state) => state.windows.isWindowModalOpen);
  const isCardProductOpen = useAppSelector((state) => state.windows.isWindowProductOpen);
  const isFormReviewOpen = useAppSelector((state) => state.windows.isWindowReviewOpen);
  const isBasketSuccessOpen = useAppSelector((state) => state.windows.isWindowReviewSuccessOpen);
  const isBasketAddSuccessOpen = useAppSelector((state) => state.windows.isWindowAddBasketSuccessOpen);
  const dispatch = useAppDispatch();
  const isActive = isWindowModalOpen ? 'modal is-active' : 'modal modal--narrow';


  function pushDispatch () {
    dispatch(windowsSlice.actions.isModalWindow(false));
    dispatch(windowsSlice.actions.windowReviewSuccess(false));
    dispatch(windowsSlice.actions.windowProduct(false));
    dispatch(windowsSlice.actions.windowReview(false));
    dispatch(windowsSlice.actions.windowAddBasketSuccess(false));
  }

  function handleClickOverlay () {
    pushDispatch();
  }

  useEffect(() => {
    let isMounted = true;

    const handleKeyDownEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMounted) {
        pushDispatch();
      }
    };

    if(isMounted){
      document.addEventListener('keydown', handleKeyDownEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDownEscape);
      isMounted = false;
    };
  }, []);

  return (
    <div className={isActive}>
      <div className="modal__wrapper " >
        <div className="modal__overlay" onClick={handleClickOverlay}/>
        {isCardProductOpen ? <ModalWindowCardProductComponent/> : ''}
        {isFormReviewOpen ? <ModalWindowReviewProductComponent/> : ''}
        {isBasketSuccessOpen ? <ModalWindowReviewSuccess/> : ''}
        {isBasketAddSuccessOpen ? <ModalWindowAddBasketSuccessComponent/> : ''}
      </div>
    </div>
  );
}

export {ModalWindowComponent};
