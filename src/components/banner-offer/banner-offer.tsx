import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { OfferPromo } from '../../types/types-store';

type BannerOfferProps = {
  offer: OfferPromo;
}

function BannerOfferComponent ({offer}: BannerOfferProps) {
  return (
    <>
      <picture>
        <source
          type="image/webp"
          srcSet={`${offer.previewImgWebp}`}
        />
        <img
          src={offer.previewImg}
          srcSet={`${offer.previewImgWebp}`}
          width={1280}
          height={280}
          alt="баннер"
        />
      </picture>
      <p className="banner__info">
        <span className="banner__message">Новинка!</span>
        <span className="title title--h1">
          {offer.name}
        </span>
        <span className="banner__text">
          Профессиональная камера от&nbsp;известного производителя
        </span>
        <Link to={`${AppRoute.Product}/${offer.id}`}
          className="btn"
          onClick={() => console.log(offer)}
        >
          Подробнее
        </Link>
      </p>
    </>
  );
}

export {BannerOfferComponent};
