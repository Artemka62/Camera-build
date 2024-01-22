import { ModalWindowCardProductComponent } from '../components/modal-window-card-product/modal-window-card-product';

type ModalWindowComponent = {
  modalStatus: boolean;
}

function ModalWindowComponent ({modalStatus}: ModalWindowComponent) {
  const isActive = modalStatus ? 'modal is-active' : 'modal modal--narrow';


  return (
    <div className={isActive}>
      <div className="modal__wrapper " >
        <div className="modal__overlay" />
        <ModalWindowCardProductComponent/>
      </div>
    </div>
  );
}

export {ModalWindowComponent};
