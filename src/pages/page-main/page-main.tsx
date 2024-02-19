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
import { AppRoute, MAX_LENGTH_CARDS, ParamFilter } from '../../src-const';
import { ModalWindowComponent } from '../../components/modal-window-list/modal-window-list';
import { LoadingComponent } from '../../components/loading-component/loading-component';
import { ErrorPage } from '../page-error/page-error';
import { useSearchParams } from 'react-router-dom';
import { getUrlParams } from '../../utils/utils-grt-url';
import { OfferCard } from '../../types/types-store';

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
  const isLoadingOffers = useAppSelector((state) => state.offers.loading);
  const isErrorLoadOffers = useAppSelector((state) => state.offers.error);
  const keyUrl = getUrlParams(urlParam);
  const arrayFilters = Object.keys(keyUrl);

  function getOfferCategoryFilter () {
    const offers: OfferCard[] = [];

    for (let i = 0; i <= arrayFilters.length - 1; i++) {
      switch (arrayFilters[i]) {
        case (ParamFilter.PhotoCamera): {
          stateOffers.filter((offer) => (offer.category === 'Фотоаппарат') ? offers.push(offer) : '');
          break;
        }
        case (ParamFilter.VideoCamera): {
          stateOffers.filter((offer) => (offer.category === 'Видеокамера') ? offers.push(offer) : '');
          break;
        }
      }
    }

    const isOffers = offers.length !== 0 ? offers : stateOffers;

    return isOffers;
  }


  function getOffersTypeFilter () {
    const offersFilterCategory: OfferCard[] = getOfferCategoryFilter();
    const offers: OfferCard[] = [];

    for (let i = 0; i <= arrayFilters.length - 1; i++) {
      switch (arrayFilters[i]) {

        case (ParamFilter.Digital): {
          offersFilterCategory.filter((offer) => (offer.type === 'Цифровая') ? offers.push(offer) : '');
          break;
        }
        case (ParamFilter.Film): {
          offersFilterCategory.filter((offer) => (offer.type === 'Плёночная') ? offers.push(offer) : '');
          break;
        }
        case (ParamFilter.SnapShot): {
          offersFilterCategory.filter((offer) => (offer.type === 'Моментальная') ? offers.push(offer) : '');
          break;
        }
        case (ParamFilter.Collection): {
          offersFilterCategory.filter((offer) => (offer.type === 'Коллекционная') ? offers.push(offer) : '');
          break;
        }
      }
    }

    return offers.length === 0 ? offersFilterCategory : offers;
  }


  function getOffersLevelFilter () {
    const offerType = getOffersTypeFilter();
    const offers: OfferCard[] = [];
    const isFilterZero = urlParam.get('zero');
    const isFilterNonProfessional = urlParam.get('non-professional');
    const isFilterProfessional = urlParam.get('professional');
    const isFiltersValid = isFilterZero !== null || isFilterNonProfessional !== null || isFilterProfessional !== null;

    for (let i = 0; i <= arrayFilters.length - 1; i++) {
      switch (arrayFilters[i]) {
        case (ParamFilter.Zero): {
          offerType.filter((offer) => (offer.level === 'Нулевой') ? offers.push(offer) : '');
          break;
        }
        case (ParamFilter.NonProfessional): {
          offerType.filter((offer) => (offer.level === 'Любительский') ? offers.push(offer) : '');
          break;
        }
        case (ParamFilter.Professional): {
          offerType.filter((offer) => (offer.level === 'Профессиональный') ? offers.push(offer) : '');
          break;
        }
      }
    }

    return isFiltersValid ? offers : offerType;
  }

  const getOffersNotRepeatId = () => {
    const uniqueIds = new Set();

    const uniqueObjects = getOffersLevelFilter().filter((obj) => {
      if (uniqueIds.has(obj.id)) {
        return false;
      } else {
        uniqueIds.add(obj.id);
        return true;
      }
    });

    return uniqueObjects;
  };

  const currentOffers = getOffersNotRepeatId().slice(firstOfferIndex, lastOfferIndex);
  const lengthOffers = getOffersNotRepeatId().length;

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
                    totalOffers={lengthOffers}
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
