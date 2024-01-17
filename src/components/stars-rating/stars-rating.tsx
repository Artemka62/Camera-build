
function StarsRatingComponent() {
  const rating = 2;

  return (
    <div className="rate product-card__rate">
      {[1, 2, 3, 4, 5].map((index) => (
        <svg
          key={index}
          width={17}
          height={16}
          aria-hidden="true"
        >
          <use xlinkHref={index <= rating ? '#icon-full-star' : '#icon-star'} />
        </svg>
      ))}
      <p className="visually-hidden">Рейтинг: {rating}</p>
      <p className="rate__count">
        <span className="visually-hidden">Всего оценок:</span>23
      </p>
    </div>
  );
}

export { StarsRatingComponent };
