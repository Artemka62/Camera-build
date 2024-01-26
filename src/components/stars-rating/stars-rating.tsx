import { OPTIONS } from '../../src-const';

type StarsRatingComponentProps = {
  rating: number;
  reviewCount?: number;
}

function StarsRatingComponent({rating, reviewCount}: StarsRatingComponentProps) {

  return (
    <div className="rate product-card__rate" data-testid='stars-rating'>
      {OPTIONS.slice().reverse().map((value) => (
        <svg
          key={value.label}
          width={17}
          height={16}
          aria-hidden="true"
        >
          <use xlinkHref={value.value <= rating ? '#icon-full-star' : '#icon-star'} />
        </svg>
      ))}
      <p className="visually-hidden">Рейтинг:{rating}</p>
      <p className="rate__count">
        <span className="visually-hidden">Всего оценок:</span>{reviewCount}
      </p>
    </div>
  );
}

export { StarsRatingComponent };
