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
import { NavigationInPageComponent } from '../../components/navigation-in-page/navigation-in-page';
import { AppRoute, DEFAULT_UNIT, MAX_LENGTH_CARDS } from '../../const';
import { ModalWindowComponent } from '../../components/modal-window-list/modal-window-list';
import { LoadingComponent } from '../../components/loading-component/loading-component';
import { ErrorPage } from '../error-page/error-page';

type MainPageProps = {
  title: string;
}

function MainPage ({title}: MainPageProps): JSX.Element {
  const stateOffers = useAppSelector((state) => state.offers.offers);
  const [currentPage, setCurrentPage] = useState(DEFAULT_UNIT);
  const [offersPerPages] = useState(MAX_LENGTH_CARDS);
  const lastOfferIndex = currentPage * offersPerPages;
  const firstOfferIndex = lastOfferIndex - offersPerPages;
  const currentOffers = stateOffers.slice(firstOfferIndex, lastOfferIndex);
  const searchParams = new URLSearchParams(window.location.search);
  const pageParam = searchParams.get('page');
  const isLoadingOffers = useAppSelector((state) => state.offers.loading);
  const isErrorLoadOffers = useAppSelector((state) => state.offers.error);

  useDocumentTitle(title);

  useEffect(() => {
    if (pageParam) {
      const lastDigit = pageParam.slice(-DEFAULT_UNIT);

      setCurrentPage(+lastDigit);
    }
  },[]);


  function setPage (pageNumber: number) {
    setCurrentPage(pageNumber);
  }

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
                    callbackPaginate={setPage}
                    currentPage={currentPage}
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
