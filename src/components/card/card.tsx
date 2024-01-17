import { StarsRatingComponent } from '../stars-rating/stars-rating';

function CardComponent () {
  return (
    <div className="product-card">
      <div className="product-card__img">
        <picture>
          <source
            type="image/webp"
            srcSet="img/content/das-auge.webp, img/content/das-auge@2x.webp 2x"
          />
          <img
            src="img/content/das-auge.jpg"
            srcSet="img/content/das-auge@2x.jpg 2x"
            width={280}
            height={240}
            alt="Ретрокамера «Das Auge IV»"
          />
        </picture>
      </div>
      <div className="product-card__info">

        <StarsRatingComponent/>

        <p className="product-card__title">
          Ретрокамера Das Auge IV
        </p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>73 450 ₽
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
