import { useEffect } from 'react';
import { ModalWindowCardProductComponent } from '../components/modal-window-card-product/modal-window-card-product';
import { ModalWindowBasketSuccess } from '../components/modal-window-product-basket-success/modal-window-product-basket-success';
import { ModalWindowReviewProductComponent } from '../components/modal-window-reviev-product/modal-window-rewiev-product';
import { useAppDispatch, useAppSelector } from '../hooks/use-store';
import { windowsSlice } from '../store/slice/modal-windows';
import { ModalWindowAddCatalogSuccessComponent } from '../components/modal-window-add-catalog-success/modal-window-add-catalog-success';

function ModalWindowComponent () {
  const isWindowModalOpen = useAppSelector((state) => state.windows.isWindowModalOpen);
  const isCardProductOpen = useAppSelector((state) => state.windows.isWindowProductOpen);
  const isFormReviewOpen = useAppSelector((state) => state.windows.isWindowReviewOpen);
  const isBasketSuccessOpen = useAppSelector((state) => state.windows.isWindowBasketSuccessOpen);
  const isBasketAddSuccessOpen = useAppSelector((state) => state.windows.isWindowAddBasketSuccessOpen);
  const dispatch = useAppDispatch();
  const isActive = isWindowModalOpen ? 'modal is-active' : 'modal modal--narrow';


  function pushDispatch () {
    dispatch(windowsSlice.actions.isModalWindow(false));
    dispatch(windowsSlice.actions.windowBasketSuccess(false));
    dispatch(windowsSlice.actions.windowBasketSuccess(false));
    dispatch(windowsSlice.actions.windowProduct(false));
    dispatch(windowsSlice.actions.windowReview(false));
    dispatch(windowsSlice.actions.windowAddBasketSuccess(false));
  }

  function handleClickOverlay () {
    pushDispatch();
  }

  useEffect(() => {
    const handleKeyDownEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        pushDispatch();
      }
    };

    document.addEventListener('keydown', handleKeyDownEscape);

    return () => {
      document.removeEventListener('keydown', handleKeyDownEscape);
    };
  }, []);

  return (
    <div className={isActive}>
      <div className="modal__wrapper " >
        <div className="modal__overlay" onClick={handleClickOverlay}/>
        {isCardProductOpen ? <ModalWindowCardProductComponent/> : ''}
        {isFormReviewOpen ? <ModalWindowReviewProductComponent/> : ''}
        {isBasketSuccessOpen ? <ModalWindowBasketSuccess/> : ''}
        {isBasketAddSuccessOpen ? <ModalWindowAddCatalogSuccessComponent/> : ''}
      </div>
    </div>
  );
}

export {ModalWindowComponent};
