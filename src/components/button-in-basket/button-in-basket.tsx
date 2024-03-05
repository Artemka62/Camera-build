function ButtonInBasketComponent () {
  return (
    <a
      className="btn btn--purple-border product-card__btn product-card__btn--in-cart"
      href="#"
    >
      <svg width={16} height={16} aria-hidden="true">
        <use xlinkHref="#icon-basket" />
      </svg>
      В корзине
    </a>
  );
}

export {ButtonInBasketComponent};
