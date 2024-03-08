import { useAppSelector } from '../../use-hooks/use-hook-store';

function ModalWindowOrderSuccessComponent () {
  const isErrorLoading = useAppSelector((state) => state.order.error);

  return(
    <div className="modal__content">
      <p className="title title--h4">{isErrorLoading ? <div>Заказ не оформлен <br/>попробуйте снова оформить заказ</div> : 'Спасибо за покупку'}</p>
      <svg className="modal__icon" width={80} height={78} aria-hidden="true">
        <use xlinkHref="#icon-review-success" />
      </svg>
      <div className="modal__buttons">
        <button
          className="btn btn--purple modal__btn modal__btn--fit-width"
          type="button"
        >
          Вернуться к покупкам
        </button>
      </div>
      <button className="cross-btn" type="button" aria-label="Закрыть попап">
        <svg width={10} height={10} aria-hidden="true">
          <use xlinkHref="#icon-close" />
        </svg>
      </button>
    </div>
  );
}

export {ModalWindowOrderSuccessComponent};
