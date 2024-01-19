import { useAppSelector } from '../../hooks/use-store';
import { StarsRatingComponent } from '../stars-rating/stars-rating';

function CardOfferProductComponent () {
  const stateOffer = useAppSelector((state) => state.offer.offer);

  return (
    <section className="product">
      <div className="container">
        <div className="product__img">
          <picture>
            <source
              type="/image/webp"
              srcSet={`/${stateOffer?.previewImg || ''}`}
            />
            <img
              src={`/${stateOffer?.previewImg || ''}`}
              srcSet={`/${stateOffer?.previewImg || ''}`}
              width={560}
              height={480}
              alt={stateOffer?.name}
            />
          </picture>
        </div>
        <div className="product__content">
          <h1 className="title title--h3">{stateOffer?.name}</h1>
          {stateOffer ? <StarsRatingComponent offer={stateOffer}/> : ''}
          <p className="product__price">
            <span className="visually-hidden">Цена:</span>{stateOffer?.price} ₽
          </p>
          <button className="btn btn--purple" type="button">
            <svg width={24} height={16} aria-hidden="true">
              <use xlinkHref="#icon-add-basket" />
            </svg>
            Добавить в корзину
          </button>
          <div className="tabs product__tabs">
            <div className="tabs__controls product__tabs-controls">
              <button className="tabs__control" type="button">
                Характеристики
              </button>
              <button className="tabs__control is-active" type="button">
                Описание
              </button>
            </div>
            <div className="tabs__content">
              <div className="tabs__element">
                <ul className="product__tabs-list">
                  <li className="item-list">
                    <span className="item-list__title">Артикул:</span>
                    <p className="item-list__text"> DA4IU67AD5</p>
                  </li>
                  <li className="item-list">
                    <span className="item-list__title">Категория:</span>
                    <p className="item-list__text">Видеокамера</p>
                  </li>
                  <li className="item-list">
                    <span className="item-list__title">Тип камеры:</span>
                    <p className="item-list__text">Коллекционная</p>
                  </li>
                  <li className="item-list">
                    <span className="item-list__title">Уровень:</span>
                    <p className="item-list__text">Любительский</p>
                  </li>
                </ul>
              </div>
              <div className="tabs__element is-active">
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
