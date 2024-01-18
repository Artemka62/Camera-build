import { OfferCard } from '../../types/types-store';

type StarsRatingComponentProps = {
  offer: OfferCard
  ;
}

function StarsRatingComponent({offer}: StarsRatingComponentProps) {

  return (
    <div className="rate product-card__rate">
      {[1, 2, 3, 4, 5].map((index) => (
        <svg
          key={index}
          width={17}
          height={16}
          aria-hidden="true"
        >
          <use xlinkHref={index <= offer.rating ? '#icon-full-star' : '#icon-star'} />
        </svg>
      ))}
      <p className="visually-hidden">Рейтинг: {offer.rating}</p>
      <p className="rate__count">
        <span className="visually-hidden">Всего оценок:</span>{offer.reviewCount}
      </p>
    </div>
  );
}

export { StarsRatingComponent };
