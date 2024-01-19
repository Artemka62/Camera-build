import { useEffect, useState } from 'react';
import { BannerComponent } from '../../components/banner/banner';
import { CardsListComponent } from '../../components/cards-list/cards-list';
import { FilterListCardsComponent } from '../../components/filter-list-cards/filter-list-cards';
import { FooterComponent } from '../../components/footer/footer';
import { HeaderComponent } from '../../components/header/header';
import { PaginationMainPageComponent } from '../../components/pagination-main-page/pagination-main-page';
import { SortListCardsComponent } from '../../components/sort-list-cards/sort-list-cards';
import { useDocumentTitle } from '../../hooks/use-document-title';
import { useAppSelector } from '../../hooks/use-store';


type MainPageProps = {
  title: string;
}

function MainPage ({title}: MainPageProps): JSX.Element {
  const stateOffers = useAppSelector((state) => state.offers.offers);
  const [currentPage, setCurrentPage] = useState(1);
  const [offersPerPages] = useState(9);
  const lastOfferIndex = currentPage * offersPerPages;
  const firstOfferIndex = lastOfferIndex - offersPerPages;
  const currentOffers = stateOffers.slice(firstOfferIndex, lastOfferIndex);
  const searchParams = new URLSearchParams(window.location.search);

  const pageParam = searchParams.get('page');


  useEffect(() => {
    if (pageParam) {
      const lastDigit = pageParam.slice(-1);

      setCurrentPage(+lastDigit);
    }
  },[]);


  function setPage (pageNumber: number) {
    setCurrentPage(pageNumber);
  }

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

                  <CardsListComponent offers={currentOffers}/>

                  <PaginationMainPageComponent
                    offersPerPages={offersPerPages}
                    totalOffers={stateOffers.length}
                    callbackPaginate={setPage}
                    currentPage={currentPage}
                  />

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
