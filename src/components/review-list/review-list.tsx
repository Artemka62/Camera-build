import { useEffect, useState } from 'react';
import { DEFAULT_NULL, START_NUMBER_REVIEWS } from '../../const';
import { useAppSelector } from '../../hooks/use-store';
import { CardReviewComponent } from '../card-review/card-review';
import { ModalWindowCardProductComponent } from '../modal-window-card-product/modal-window-card-product';

function ReviewListComponent () {
  const stateReviews = useAppSelector((state) => state.reviews.reviews);
  const [countReviews, setCountReviews] = useState(START_NUMBER_REVIEWS);

  const sortReviewsToData = [...stateReviews].sort((a, b) => {
    const timeA = new Date(a.createAt).getTime();
    const timeB = new Date(b.createAt).getTime();

    return timeB - timeA;
  });


  useEffect(() => {
    setCountReviews(START_NUMBER_REVIEWS);
  },[stateReviews]);

  function handleClickButtonAdd () {
    setCountReviews(countReviews + START_NUMBER_REVIEWS);
  }

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

          {sortReviewsToData.slice(DEFAULT_NULL, countReviews).map((review) => <CardReviewComponent key={review.id} review={review} />)}

        </ul>
        {
          stateReviews.length - START_NUMBER_REVIEWS >= countReviews ?
            <div className="review-block__buttons">
              <button onClick={handleClickButtonAdd} className="btn btn--purple" type="button">
                Показать больше отзывов
              </button>
            </div>
            : ''
        }
      </div>

    </section>
  );
}

export {ReviewListComponent};
