import { OfferCard } from '../../types/types-store';
import { StarsRatingComponent } from '../stars-rating/stars-rating';

type CardComponentProps = {
  offer: OfferCard;
}

function CardComponent ({offer}: CardComponentProps) {
  return (
    <div className="product-card">
      <div className="product-card__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`${offer.previewImgWebp}, ${offer.previewImgWebp} 2x`}
          />
          <img
            src={offer.previewImg}
            srcSet={`${offer.previewImgWebp} 2x`}
            width={280}
            height={240}
            alt="Ретрокамера «Das Auge IV»"
          />
        </picture>
      </div>
      <div className="product-card__info">

        <StarsRatingComponent offer={offer}/>

        <p className="product-card__title">
          {offer.name}
        </p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>{offer.price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <button
          className="btn btn--purple product-card__btn"
          type="button"
        >
          Купить
        </button>
        <a className="btn btn--transparent" href="#">
          Подробнее
        </a>
      </div>
    </div>
  );
}

export {CardComponent};
