import { BannerComponent } from '../../components/banner/banner';
import { CardsListComponent } from '../../components/cards-list/cards-list';
import { FilterListCardsComponent } from '../../components/filter-list-cards/filter-list-cards';
import { FooterComponent } from '../../components/footer/footer';
import { HeaderComponent } from '../../components/header/header';
import { SortListCardsComponent } from '../../components/sort-list-cards/sort-list-cards';
import { useDocumentTitle } from '../../hooks/use-document-title';

type MainPageProps = {
  title: string;
}

function MainPage ({title}: MainPageProps): JSX.Element {

  useDocumentTitle(title);

  return (
    <div className="wrapper">

      <HeaderComponent/>

      <main>

        <BannerComponent/>

        <div className="page-content">
          <div className="breadcrumbs">
            <div className="container">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link" href="index.html">
                    Главная
                    <svg width={5} height={8} aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini" />
                    </svg>
                  </a>
                </li>
                <li className="breadcrumbs__item">
                  <span className="breadcrumbs__link breadcrumbs__link--active">
                    Каталог
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">

                <FilterListCardsComponent/>

                <div className="catalog__content">


                  <SortListCardsComponent/>

                  <CardsListComponent/>

                  <div className="pagination">
                    <ul className="pagination__list">
                      <li className="pagination__item">
                        <a
                          className="pagination__link pagination__link--active"
                          href={1}
                        >
                          1
                        </a>
                      </li>
                      <li className="pagination__item">
                        <a className="pagination__link" href={2}>
                          2
                        </a>
                      </li>
                      <li className="pagination__item">
                        <a className="pagination__link" href={3}>
                          3
                        </a>
                      </li>
                      <li className="pagination__item">
                        <a
                          className="pagination__link pagination__link--text"
                          href={2}
                        >
                          Далее
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <FooterComponent/>

    </div>
  );
}

export {MainPage};
