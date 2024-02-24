import { useEffect, useState } from 'react';
import { DEFAULT_NULL, START_NUMBER_REVIEWS } from '../../src-const';
import { useAppDispatch, useAppSelector } from '../../use-hooks/use-hook-store';
import { CardReviewComponent } from '../card-review/card-review';
import { windowsSlice } from '../../store/slice/slice-modal-windows';

function ReviewListComponent () {
  const dispatch = useAppDispatch();
  const stateReviews = useAppSelector((state) => state.reviews.reviews);
  const [countReviews, setCountReviews] = useState(START_NUMBER_REVIEWS);

  const sortReviewsToData = [...stateReviews].sort((a, b) => {
    const timeA = new Date(a.createAt).getTime();
    const timeB = new Date(b.createAt).getTime();

    return timeB - timeA;
  });

  useEffect(() => {
    let isMounted = true;

    if(isMounted) {
      setCountReviews(START_NUMBER_REVIEWS);
    }

    return () => {
      isMounted = false;
    };
  },[stateReviews]);

  function handleClickButtonReview () {
    dispatch(windowsSlice.actions.windowReview(true));
    dispatch(windowsSlice.actions.isModalWindow(true));
  }

  function handleClickButtonAdd () {
    setCountReviews(countReviews + START_NUMBER_REVIEWS);
  }

  return (
    <section className="review-block">
      <div className="container">
        <div className="page-content__headed">
          <h2 className="title title--h3">Отзывы</h2>
          <button onClick={handleClickButtonReview} className="btn" type="button">
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
