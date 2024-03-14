import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../use-hooks/index';
import { AppRoute, DEFAULT_UNIT } from '../../src-const';

function NavigationInPageComponent () {
  const location = useLocation();
  const currentPath = location.pathname;
  const pathParts = currentPath.split(AppRoute.Main);
  const pageName = pathParts[DEFAULT_UNIT];
  const isActive = (pageName === '') ? 'breadcrumbs__link breadcrumbs__link--active' : 'breadcrumbs__link';
  const stateOfferProduct = useAppSelector((state) => state.offer.offer);

  return (
    <div className="breadcrumbs" data-testid='navigation-in-page'>
      <div className="container">
        <ul className="breadcrumbs__list">
          <li className="breadcrumbs__item">
            <Link to={AppRoute.Main} className="breadcrumbs__link">
              Главная
              <svg width={5} height={8} aria-hidden="true">
                <use xlinkHref="#icon-arrow-mini" />
              </svg>
            </Link>
          </li>
          <li className="breadcrumbs__item">
            <Link to={AppRoute.Main} className={isActive}>
              Каталог
              {pageName === 'product' || pageName === 'basket' ?
                <svg width={5} height={8} aria-hidden="true">
                  <use xlinkHref="#icon-arrow-mini" />
                </svg> : ''}
            </Link>
          </li>
          {pageName === 'product' ?
            <li className="breadcrumbs__item">
              <span className="breadcrumbs__link breadcrumbs__link--active">
                {stateOfferProduct?.name}
              </span>
            </li>
            : ''}
          {pageName === 'basket' ?
            <li className="breadcrumbs__item">
              <span className="breadcrumbs__link breadcrumbs__link--active">
                Kорзина
              </span>
            </li>
            : ''}
        </ul>
      </div>
    </div>
  );
}

export {NavigationInPageComponent};
