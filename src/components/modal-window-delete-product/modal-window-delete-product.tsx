import { KEY_LOCAL_STORAGE } from '../../src-const';
import { offersBasketSlice } from '../../store/slice/slice-basket-offers';
import { windowsSlice } from '../../store/slice/slice-modal-windows';
import { useAppDispatch, useAppSelector } from '../../use-hooks/use-hook-store';
import { setLocalStorage } from '../../utils/utils-local-storage';

function ModalWindowDeleteProductComponent () {

  const idDeleteOffer = useAppSelector((state) => state.windows.idDeleteOffer);
  const stateBasketOffers = useAppSelector((state) => state.offersBasket.offers);
  const offer = stateBasketOffers.find((findOffer) => findOffer.id === idDeleteOffer);
  const dispatch = useAppDispatch();


  function handleDeleteOffer () {
    const deleteOffer = stateBasketOffers.filter((offerStorage) => +offerStorage.id !== +idDeleteOffer);

    dispatch(offersBasketSlice.actions.offersBasket(deleteOffer));
    setLocalStorage(KEY_LOCAL_STORAGE, deleteOffer);
    dispatch(windowsSlice.actions.isModalWindow(false));
    dispatch(windowsSlice.actions.windowDeleteBasket(false));
  }

  return (
    <div className="modal__content">
      <p className="title title--h4">Удалить этот товар?</p>
      <div className="basket-item basket-item--short">
        <div className="basket-item__img">
          <picture>
            <source
              type="image/webp"
              srcSet={`/${offer?.offer.previewImgWebp ?? ''}, /${offer?.offer.previewImgWebp2x ?? ''} 2x`}
            />
            <img
              src={`/${offer?.offer.previewImg ?? ''}`}
              srcSet={`${offer?.offer.previewImg2x ?? ''} 2x`}
              width={140}
              height={120}
              alt="Фотоаппарат «Орлёнок»"
            />
          </picture>
        </div>
        <div className="basket-item__description">
          <p className="basket-item__title">{offer?.offer.name}</p>
          <ul className="basket-item__list">
            <li className="basket-item__list-item">
              <span className="basket-item__article">Артикул:</span>{' '}
              <span className="basket-item__number">{offer?.offer.vendorCode}</span>
            </li>
            <li className="basket-item__list-item">{offer?.offer.type}</li>
            <li className="basket-item__list-item">{offer?.offer.level}</li>
          </ul>
        </div>
      </div>
      <div className="modal__buttons">
        <button
          className="btn btn--purple modal__btn modal__btn--half-width"
          type="button"
          onClick={handleDeleteOffer}
        >
          Удалить
        </button>
        <a
          className="btn btn--transparent modal__btn modal__btn--half-width"
          href="#"
        >
          Продолжить покупки
        </a>
      </div>
      <button className="cross-btn" type="button" aria-label="Закрыть попап">
        <svg width={10} height={10} aria-hidden="true">
          <use xlinkHref="#icon-close" />
        </svg>
      </button>
    </div>
  );
}

export {ModalWindowDeleteProductComponent};
