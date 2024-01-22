import { ModalWindowCardProductComponent } from '../components/modal-window-card-product/modal-window-card-product';
import { ModalWindowReviewProductComponent } from '../components/modal-window-review-product/modal-window-rewiew-product';
import { useAppSelector } from '../hooks/use-store';

function ModalWindowComponent () {
  const isWindowModalOpen = useAppSelector((state) => state.windows.isWindowModalOpen);
  const isCardProductOpen = useAppSelector((state) => state.windows.isWindowProductOpen);
  const isFormReviewOpen = useAppSelector((state) => state.windows.isWindowReviewOpen);
  const isActive = isWindowModalOpen ? 'modal is-active' : 'modal modal--narrow';

  return (
    <div className={isActive}>
      <div className="modal__wrapper " >
        <div className="modal__overlay" />
        {isCardProductOpen ? <ModalWindowCardProductComponent/> : ''}
        {isFormReviewOpen ? <ModalWindowReviewProductComponent/> : ''}
      </div>
    </div>
  );
}

export {ModalWindowComponent};
