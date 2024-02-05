import { Review } from '../../types/types-store';
import { formatData } from '../../utils/utils-format-data';
import { StarsRatingComponent } from '../stars-rating/stars-rating';

type CardReviewProps = {
  review: Review;
}

function CardReviewComponent ({review}: CardReviewProps) {
  return (
    <li className="review-card" data-testid='card-review'>
      <div className="review-card__head">
        <p className="title title--h4">{review.userName}</p>
        <time className="review-card__data" dateTime="2022-04-13">
          {formatData(review.createAt)}
        </time>
      </div>
      <StarsRatingComponent rating={review.rating} />
      <ul className="review-card__list">
        <li className="item-list">
          <span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">
            {review.advantage}
          </p>
        </li>
        <li className="item-list">
          <span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">
            {review.disadvantage}
          </p>
        </li>
        <li className="item-list">
          <span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">
            {review.review}
          </p>
        </li>
      </ul>
    </li>
  );
}

export {CardReviewComponent};
