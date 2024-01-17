import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function ButtonBasketComponent () {

  return (
    <Link to={AppRoute.Basket} className="header__basket-link">
      <svg width={16} height={16} aria-hidden="true">
        <use xlinkHref="#icon-basket" />
      </svg>
    </Link>
  );
}

export {ButtonBasketComponent};
