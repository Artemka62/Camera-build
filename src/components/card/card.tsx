import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/use-store';
import { fetchOfferAction } from '../../services/thunk/fetch-offer';
import { OfferCard } from '../../types/types-store';
import { StarsRatingComponent } from '../stars-rating/stars-rating';
import { AppRoute } from '../../const';
import { windowSlice } from '../../store/slice/modalWindow';

type CardComponentProps = {
  offer: OfferCard;
}

function CardComponent ({offer}: CardComponentProps) {
  const dispatch = useAppDispatch();

  function handleClickButtonBuy () {
    dispatch(fetchOfferAction(offer.id));
    dispatch(windowSlice.actions.isWindow(true));
  }

  function handleClickButtonDetails () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }


  return (
    <div className="product-card is-active">
      <div className="product-card__img">
        <picture>
          <source
            type="/image/webp"
            srcSet={`/${offer.previewImgWebp}, /${offer.previewImgWebp} 2x`}
          />
          <img
            src={`/${offer.previewImg}`}
            srcSet={`/${offer.previewImgWebp} 2x`}
            width={280}
            height={240}
            alt={offer.name}
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
          onClick={handleClickButtonBuy}
        >
          Купить
        </button>
        <Link to={`${AppRoute.Product}/${offer.id}/description`} className="btn btn--transparent" onClick={handleClickButtonDetails}>
          Подробнее
        </Link>
      </div>
    </div>
  );
}

export {CardComponent};
