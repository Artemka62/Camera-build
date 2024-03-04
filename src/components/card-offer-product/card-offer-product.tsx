import { AppRoute, DEFAULT_NULL, KEY_LOCAL_STORAGE, SettingTab } from '../../src-const';
import { useAppDispatch, useAppSelector } from '../../use-hooks/use-hook-store';
import { windowsSlice } from '../../store/slice/slice-modal-windows';
import { StarsRatingComponent } from '../stars-rating/stars-rating';
import { useNavigate, useParams } from 'react-router-dom';
import { formatNumberWithSpaces } from '../../utils/utils-format-price';
import { addProductToBasket } from '../../utils/utils-local-storage';

function CardOfferProductComponent () {
  const dispatch = useAppDispatch();
  const stateOffer = useAppSelector((state) => state.offer.offer);
  const navigate = useNavigate();
  const {tab} = useParams();
  const isActiveForCharacteristic = (tab === SettingTab.Characteristic) ? 'is-active' : '';
  const isActiveForDescription = (tab === SettingTab.Description) ? 'is-active' : '';

  function handleClickCharacteristic () {
    navigate(`${AppRoute.Product}/${stateOffer?.id || ''}${AppRoute.Characteristic}`);
  }

  function handleClickDescription () {
    navigate(`${AppRoute.Product}/${stateOffer?.id || ''}${AppRoute.Description}`);
  }

  function handleClickAddBasket () {
    dispatch(windowsSlice.actions.isModalWindow(true));
    dispatch(windowsSlice.actions.windowAddBasketSuccess(true));

    if(stateOffer) {
      addProductToBasket(KEY_LOCAL_STORAGE, stateOffer);
    }
  }

  return (
    <section className="product" data-testid='card-offer-product'>
      <div className="container">
        <div className="product__img">
          <picture>
            <source
              type="/image/webp"
              srcSet={`/${stateOffer?.previewImgWebp || ''}, /${stateOffer?.previewImgWebp2x || ''} 2x`}
            />
            <img
              src={`/${stateOffer?.previewImg || ''}`}
              srcSet={`/${stateOffer?.previewImg2x || ''} 2x`}
              width={560}
              height={480}
              alt={stateOffer?.name}
            />
          </picture>
        </div>
        <div className="product__content">
          <h1 className="title title--h3">{stateOffer?.name}</h1>
          {stateOffer ?
            <StarsRatingComponent rating={stateOffer.rating} reviewCount={stateOffer.reviewCount}/>
            : ''}
          <p className="product__price">
            <span className="visually-hidden">Цена:</span>{formatNumberWithSpaces(stateOffer?.price || DEFAULT_NULL)} ₽
          </p>
          <button onClick={handleClickAddBasket}className="btn btn--purple" type="button">
            <svg width={24} height={16} aria-hidden="true">
              <use xlinkHref="#icon-add-basket" />
            </svg>
            Добавить в корзину
          </button>
          <div className="tabs product__tabs">
            <div className="tabs__controls product__tabs-controls">
              <button
                onClick={handleClickCharacteristic}
                className={`tabs__control ${isActiveForCharacteristic}`}
                type="button"
              >
                Характеристики
              </button>
              <button
                onClick={handleClickDescription}
                className={`tabs__control ${isActiveForDescription}`}
                type="button"
              >
                Описание
              </button>
            </div>
            <div className="tabs__content">
              <div className={`tabs__element ${isActiveForCharacteristic}`}>
                <ul className="product__tabs-list">
                  <li className="item-list">
                    <span className="item-list__title">Артикул:</span>
                    <p className="item-list__text">{stateOffer?.vendorCode}</p>
                  </li>
                  <li className="item-list">
                    <span className="item-list__title">Категория:</span>
                    <p className="item-list__text">{stateOffer?.category}</p>
                  </li>
                  <li className="item-list">
                    <span className="item-list__title">Тип камеры:</span>
                    <p className="item-list__text">{stateOffer?.type}</p>
                  </li>
                  <li className="item-list">
                    <span className="item-list__title">Уровень:</span>
                    <p className="item-list__text">{stateOffer?.level}</p>
                  </li>
                </ul>
              </div>
              <div className={`tabs__element ${isActiveForDescription}`}>
                <div className="product__tabs-text">
                  <p>
                    {stateOffer?.description}
                  </p>
                  <p>
                    Вы&nbsp;тоже можете прикоснуться к&nbsp;волшебству
                     съёмки, заказав этот чудо-аппарат. Кто знает,
                    может с&nbsp;{stateOffer?.name}&nbsp;начнётся ваш путь
                    к&nbsp;наградам всех престижных кинофестивалей.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export {CardOfferProductComponent};
