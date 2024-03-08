import { Link } from 'react-router-dom';
import { AppRoute, DEFAULT_NULL } from '../../src-const';

function ButtonInBasketComponent () {

  function handleClickButtonInBasket () {
    window.scrollTo({
      top: DEFAULT_NULL,
      behavior: 'smooth'
    });
  }

  return (
    <Link
      to={AppRoute.Basket}
      className="btn btn--purple-border product-card__btn product-card__btn--in-cart"
      onClick={handleClickButtonInBasket}
    >
      <svg width={16} height={16} aria-hidden="true">
        <use xlinkHref="#icon-basket" />
      </svg>
      В корзине
    </Link>
  );
}

export {ButtonInBasketComponent};
