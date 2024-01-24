import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function LogotypeComponent () {
  return (
    <Link data-testid ='logotype'
      to={AppRoute.Main}
      className="header__logo"
      aria-label="Переход на главную"
    >
      <svg width={100} height={36} aria-hidden="true" >
        <use xlinkHref="#icon-logo" />
      </svg>
    </Link>
  );
}

export{LogotypeComponent};
