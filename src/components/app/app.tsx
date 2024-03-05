import { Route, Routes } from 'react-router-dom';
import { AppRoute, KEY_LOCAL_STORAGE, TitleDescription } from '../../src-const';
import { MainPage } from '../../pages/page-main/page-main';
import { ProductPage } from '../../pages/page-product/page-product';
import { BasketPage } from '../../pages/page-basket/page-basket';
import { ErrorPage } from '../../pages/page-error/page-error';
import { useAppDispatch } from '../../use-hooks/use-hook-store';
import { fetchOffersAction } from '../../services/thunk/thunk-fetch-offers';
import { fetchPromoOffersAction } from '../../services/thunk/thunk-fetch-promo-offers';
import { OfferLocalStorage } from '../../types/types-store';
import { getLocalStorage } from '../../utils/utils-local-storage';
import { offersBasketSlice } from '../../store/slice/slice-basket-offers';

function App () {
  const dispatch = useAppDispatch();
  const myLocalStorage = getLocalStorage(KEY_LOCAL_STORAGE) as OfferLocalStorage[];

  if(myLocalStorage === undefined) {
    const array: OfferLocalStorage[] = [];

    localStorage.setItem(KEY_LOCAL_STORAGE, JSON.stringify(array));

    dispatch(offersBasketSlice.actions.offersBasket(array));
  } else {
    dispatch(offersBasketSlice.actions.offersBasket(myLocalStorage));
  }

  dispatch(fetchOffersAction());
  dispatch(fetchPromoOffersAction());

  return (
    <Routes>
      <Route
        path={`${AppRoute.Main}/`}
        element ={
          <MainPage title = {TitleDescription.MainPage}/>
        }
      />
      <Route
        path={`${AppRoute.Product}/:id/:tab`}
        element ={
          <ProductPage title = {TitleDescription.ProductPage}/>
        }
      />
      <Route
        path={`${AppRoute.Basket}`}
        element ={
          <BasketPage title = {TitleDescription.BasketPage}/>
        }
      />
      <Route
        path={AppRoute.Error}
        element ={<ErrorPage title = {TitleDescription.ErrorPage}/>}
      />
      <Route
        path="*"
        element={<ErrorPage title = {TitleDescription.ErrorPage}/>}
      />
    </Routes>
  );
}

export {App};
