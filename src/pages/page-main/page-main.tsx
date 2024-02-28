import { useState } from 'react';
import { BannerComponent } from '../../components/banner/banner';
import { CardsListComponent } from '../../components/cards-list/cards-list';
import { FilterListCardsComponent } from '../../components/filter-list-cards/filter-list-cards';
import { FooterComponent } from '../../components/footer/footer';
import { HeaderComponent } from '../../components/header/header';
import { PaginationMainPageComponent } from '../../components/pagination-main-page/pagination-main-page';
import { SortListCardsComponent } from '../../components/sort-list-cards/sort-list-cards';
import { useDocumentTitle } from '../../use-hooks/use-hook-document-title';
import { useAppSelector } from '../../use-hooks/use-hook-store';
import { NavigationInPageComponent } from '../../components/navigation-in-page/navigation-in-page';
import { AppRoute, DEFAULT_NULL, DEFAULT_UNIT, MAX_LENGTH_CARDS, ParamFilter, ParamFilterRu, ParamSort, SortId } from '../../src-const';
import { ModalWindowComponent } from '../../components/modal-window-list/modal-window-list';
import { LoadingComponent } from '../../components/loading-component/loading-component';
import { useSearchParams } from 'react-router-dom';
import { getUrlParams } from '../../utils/utils-get-url';
import { OfferCard } from '../../types/types-store';
import { ToastifyComponent } from '../../components/toastify/toastify';

type MainPageProps = {
  title: string;
}

function MainPage ({title}: MainPageProps): JSX.Element {
  const [urlParam] = useSearchParams();
  const setCurrentPage = urlParam.get(AppRoute.Page) || DEFAULT_UNIT;
  const stateOffers = useAppSelector((state) => state.offers.offers);
  const [offersPerPages] = useState(MAX_LENGTH_CARDS);
  const lastOfferIndex = +setCurrentPage * offersPerPages;
  const firstOfferIndex = lastOfferIndex - offersPerPages;
  const isLoadingOffers = useAppSelector((state) => state.offers.loading);
  const isLoadingPromoOffers = useAppSelector((state) => state.offersPromo.loading);
  const keyUrl = getUrlParams(urlParam);
  const arrayFilters = Object.keys(keyUrl);
  const sortType = urlParam.get(ParamSort.Sort) || '';
  const sortMaxMin = urlParam.get(ParamSort.Rotation) || '';
  const isPriceMin = urlParam.get(ParamFilter.PriceMin);
  const isPriceMax = urlParam.get(ParamFilter.PriceMax);


  function getOfferCategoryFilter () {
    const offers: OfferCard[] = [];

    for (let i = DEFAULT_NULL; i <= arrayFilters.length - DEFAULT_UNIT; i++) {
      switch (arrayFilters[i]) {
        case (ParamFilter.PhotoCamera): {
          stateOffers.filter((offer) => (offer.category === ParamFilterRu.PhotoCamera) ? offers.push(offer) : '');

          break;
        }
        case (ParamFilter.VideoCamera): {
          stateOffers.filter((offer) => (offer.category === ParamFilterRu.VideoCamera) ? offers.push(offer) : '');

          break;
        }
      }
    }
    const isOffers = offers.length !== DEFAULT_NULL ? offers : stateOffers;

    return isOffers;
  }


  function getOffersTypeFilter () {
    const offersFilterCategory: OfferCard[] = getOfferCategoryFilter();
    const offers: OfferCard[] = [];

    for (let i = DEFAULT_NULL; i <= arrayFilters.length - DEFAULT_UNIT; i++) {
      switch (arrayFilters[i]) {
        case (ParamFilter.Digital): {
          offersFilterCategory.filter((offer) => (offer.type === ParamFilterRu.Digital) ? offers.push(offer) : '');

          break;
        }
        case (ParamFilter.Film): {
          offersFilterCategory.filter((offer) => (offer.type === ParamFilterRu.Film) ? offers.push(offer) : '');

          break;
        }
        case (ParamFilter.SnapShot): {
          offersFilterCategory.filter((offer) => (offer.type === ParamFilterRu.SnapShot) ? offers.push(offer) : '');

          break;
        }
        case (ParamFilter.Collection): {
          offersFilterCategory.filter((offer) => (offer.type === ParamFilterRu.Collection) ? offers.push(offer) : '');

          break;
        }
      }
    }

    return offers.length === DEFAULT_NULL ? offersFilterCategory : offers;
  }

  function getOffersLevelFilter () {
    const offerType = getOffersTypeFilter();
    const offers: OfferCard[] = [];
    const isFilterZero = urlParam.get(ParamFilter.Zero);
    const filterNonProfessional = urlParam.get(ParamFilter.NonProfessional);
    const filterProfessional = urlParam.get(ParamFilter.Professional);
    const isFiltersValid = isFilterZero !== null || filterNonProfessional !== null || filterProfessional !== null;

    for (let i = DEFAULT_NULL; i <= arrayFilters.length - DEFAULT_UNIT; i++) {
      switch (arrayFilters[i]) {
        case (ParamFilter.Zero): {
          offerType.filter((offer) => (offer.level === ParamFilterRu.Zero) ? offers.push(offer) : '');

          break;
        }
        case (ParamFilter.NonProfessional): {
          offerType.filter((offer) => (offer.level === ParamFilterRu.NonProfessional) ? offers.push(offer) : '');

          break;
        }
        case (ParamFilter.Professional): {
          offerType.filter((offer) => (offer.level === ParamFilterRu.Professional) ? offers.push(offer) : '');

          break;
        }
      }
    }

    return isFiltersValid ? offers : offerType;
  }

  const getOffersNotRepeatId = () => {
    const uniqueIds = new Set();

    const uniqueObjects = getOffersLevelFilter().filter((offer) => {
      if (uniqueIds.has(offer.id)) {
        return false;
      } else {
        uniqueIds.add(offer.id);

        return true;
      }
    });
    return uniqueObjects;
  };

  const filteredOffers = getOffersNotRepeatId();

  function getSortOffers (type: string, maxMin: string) {

    const offersCopy = [...filteredOffers];

    if(type === SortId.Price && maxMin === SortId.Down) {
      return offersCopy.sort((a, b) => b.price - a.price);
    }

    if(type === SortId.Price && maxMin === SortId.Up) {
      return offersCopy.sort((a, b) => a.price - b.price);
    }

    if(type === SortId.Popular && maxMin === SortId.Up) {
      return offersCopy.sort((a, b) => a.rating - b.rating);
    }

    if(type === SortId.Popular && maxMin === SortId.Down) {
      return offersCopy.sort((a, b) => b.rating - a.rating);
    }

    return offersCopy;
  }

  const filteredAndSortedOffers = getSortOffers(sortType, sortMaxMin);

  function getFilterOffersPrice () {
    const minObjectPrice = filteredAndSortedOffers.reduce((min, offer) => offer.price < min.price ? offer : min, filteredAndSortedOffers[DEFAULT_NULL]);
    const maxObjectPrice = filteredAndSortedOffers.reduce((min, offer) => offer.price > min.price ? offer : min, filteredAndSortedOffers[DEFAULT_NULL]);

    if(isPriceMin !== null && isPriceMax !== null) {

      const getFilterOfferPrice = filteredAndSortedOffers.filter((offer:OfferCard) => {
        if(offer.price >= +isPriceMin && offer.price <= +isPriceMax) {

          return offer;
        }
      });

      return getFilterOfferPrice;
    }

    if(isPriceMax !== null && isPriceMin === null){

      const getFilterOfferPrice = filteredAndSortedOffers.filter((offer:OfferCard) => {
        if(offer.price >= +minObjectPrice.price && offer.price <= +isPriceMax) {

          return offer;
        }
      });

      return getFilterOfferPrice;
    }

    if(isPriceMax === null && isPriceMin !== null){

      const getFilterOfferPrice = filteredAndSortedOffers.filter((offer:OfferCard) => {
        if(offer.price >= +isPriceMin && offer.price <= +maxObjectPrice.price) {

          return offer;
        }
      });

      return getFilterOfferPrice;
    }

    return filteredAndSortedOffers;
  }

  const filterOfferPrice = getFilterOffersPrice();
  const offersSortAndFilter = filterOfferPrice;
  const currentOffers = offersSortAndFilter.slice(firstOfferIndex, lastOfferIndex);
  const lengthOffers = offersSortAndFilter.length;

  useDocumentTitle(title);

  return (
    <div className="wrapper" >
      <HeaderComponent/>
      <ToastifyComponent/>
      <main data-testid ='main-page'>
        {!isLoadingPromoOffers ? <BannerComponent/> : <LoadingComponent/>}
        <div className="page-content">
          <NavigationInPageComponent/>
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <FilterListCardsComponent offers={offersSortAndFilter} dataPriceMinMax={filteredAndSortedOffers}/>
                <div className="catalog__content">
                  <SortListCardsComponent/>
                  {!isLoadingOffers ? <CardsListComponent offers={currentOffers}/> : <LoadingComponent/>}
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
