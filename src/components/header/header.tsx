import { Link } from 'react-router-dom';
import { ButtonBasketComponent } from '../button-basket/button-basket';
import { LogotypeComponent } from '../logotype/logotype';
import { AppRoute } from '../../src-const';
import { SearchComponent } from '../search/search';

function HeaderComponent () {
  return (
    <header className="header" id="header">
      <div className="container">
        <LogotypeComponent/>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link className="main-nav__link" to={AppRoute.Main}>
                Каталог
              </Link>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="#">
                Гарантии
              </a>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="#">
                Доставка
              </a>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="#">
                О компании
              </a>
            </li>
          </ul>
        </nav>
        <SearchComponent/>
        <ButtonBasketComponent/>
      </div>
    </header>
  );
}

export {HeaderComponent};
