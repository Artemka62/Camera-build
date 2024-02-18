import { useState } from 'react';
import { BannerComponent } from '../../components/banner/banner';
import { CardsListComponent } from '../../components/cards-list/cards-list';
import { FilterListCardsComponent } from '../../components/filter-list-cards/filter-list-cards';
import { FooterComponent } from '../../components/footer/footer';
import { HeaderComponent } from '../../components/header/header';
import { PaginationMainPageComponent } from '../../components/pagination-main-page/pagination-main-page';
import { SortListCardsComponent } from '../../components/sort-list-cards/sort-list-cards';
import { useDocumentTitle } from '../../hooks/hook-use-document-title';
import { useAppSelector } from '../../hooks/hook-use-store';
import { NavigationInPageComponent } from '../../components/navigation-in-page/navigation-in-page';
import { AppRoute, MAX_LENGTH_CARDS } from '../../src-const';
import { ModalWindowComponent } from '../../components/modal-window-list/modal-window-list';
import { LoadingComponent } from '../../components/loading-component/loading-component';
import { ErrorPage } from '../page-error/page-error';
import { useSearchParams } from 'react-router-dom';

type MainPageProps = {
  title: string;
}

function MainPage ({title}: MainPageProps): JSX.Element {
  const [urlParam] = useSearchParams();
  const setCurrentPage = urlParam.get('page') || 1;
  const stateOffers = useAppSelector((state) => state.offers.offers);
  const [offersPerPages] = useState(MAX_LENGTH_CARDS);
  const lastOfferIndex = +setCurrentPage * offersPerPages;
  const firstOfferIndex = lastOfferIndex - offersPerPages;
  const currentOffers = stateOffers.slice(firstOfferIndex, lastOfferIndex);
  const isLoadingOffers = useAppSelector((state) => state.offers.loading);
  const isErrorLoadOffers = useAppSelector((state) => state.offers.error);

  useDocumentTitle(title);

  if(isLoadingOffers){
    return <LoadingComponent/>;
  }

  if(isErrorLoadOffers) {
    return <ErrorPage title ={AppRoute.Error}/>;
  }

  return (
    <div className="wrapper" >
      <HeaderComponent/>
      <main data-testid ='main-page'>
        <BannerComponent/>
        <div className="page-content">
          <NavigationInPageComponent/>
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
                    currentPage={+setCurrentPage}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <ModalWindowComponent/>
      <FooterComponent/>
    </div>
  );
}

export {MainPage};
