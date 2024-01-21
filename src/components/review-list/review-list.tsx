import { useAppSelector } from '../../hooks/use-store';
import { CardReviewComponent } from '../card-review/card-review';

function ReviewListComponent () {
  const stateReviews = useAppSelector((state) => state.reviews.reviews);

  return (
    <section className="review-block">
      <div className="container">
        <div className="page-content__headed">
          <h2 className="title title--h3">Отзывы</h2>
          <button className="btn" type="button">
            Оставить свой отзыв
          </button>
        </div>
        <ul className="review-block__list">

          {stateReviews.map((review) => <CardReviewComponent key={review.id} review={review} />)}

        </ul>
        <div className="review-block__buttons">
          <button className="btn btn--purple" type="button">
            Показать больше отзывов
          </button>
        </div>
      </div>
    </section>
  );
}

export {ReviewListComponent};
