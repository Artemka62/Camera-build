import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/hook-use-store';
import { fetchOfferAction } from '../../services/thunk/thunk-fetch-offer';
import { OfferCard } from '../../types/types-store';
import { StarsRatingComponent } from '../stars-rating/stars-rating';
import { AppRoute, DEFAULT_NULL } from '../../src-const';
import { windowsSlice } from '../../store/slice/slice-modal-windows';
import { fetchReviewsAction } from '../../services/thunk/thunk-fetch-rewiews';

type CardComponentProps = {
  offer: OfferCard;
}

function CardComponent ({offer}: CardComponentProps) {
  const dispatch = useAppDispatch();

  function handleClickButtonBuy () {
    dispatch(fetchOfferAction(offer.id));
    dispatch(windowsSlice.actions.windowProduct(true));
    dispatch(windowsSlice.actions.isModalWindow(true));
  }

  function handleClickButtonDetails () {
    dispatch(fetchReviewsAction(offer.id));

    window.scrollTo({
      top: DEFAULT_NULL,
      behavior: 'smooth'
    });
  }

  return (
    <div className="product-card is-active" data-testid='card'>
      <div className="product-card__img">
        <picture>
          <source
            type="/image/webp"
            srcSet={`/${offer.previewImgWebp}, /${offer.previewImgWebp2x} 2x`}
          />
          <img
            src={`/${offer.previewImg}`}
            srcSet={`/${offer.previewImg2x} 2x`}
            width={280}
            height={240}
            alt={offer.name}
          />
        </picture>
      </div>
      <div className="product-card__info">
        <StarsRatingComponent rating={offer.rating} reviewCount={offer.reviewCount}/>
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
          onClick={handleClickButtonBuy}
        >
          Купить
        </button>
        <Link to={`${AppRoute.Product}/${offer.id}${AppRoute.Description}`} className="btn btn--transparent" onClick={handleClickButtonDetails}>
          Подробнее
        </Link>
      </div>
    </div>
  );
}

export {CardComponent};
