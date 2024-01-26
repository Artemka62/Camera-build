import { Link } from 'react-router-dom';
import { AppRoute } from '../../src-const';

function ButtonBasketComponent () {

  return (
    <Link to={AppRoute.Basket} className="header__basket-link" data-testid='button-basket'>
      <svg width={16} height={16} aria-hidden="true">
        <use xlinkHref="#icon-basket" />
      </svg>
    </Link>
  );
}

export {ButtonBasketComponent};
