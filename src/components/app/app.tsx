import { Route, Routes } from 'react-router-dom';
import { AppRoute, TitleDescription } from '../../src-const';
import { MainPage } from '../../pages/page-main/page-main';
import { ProductPage } from '../../pages/page-product/page-product';
import { BasketPage } from '../../pages/page-basket/page-basket';
import { ErrorPage } from '../../pages/page-error/page-error';
import { useAppDispatch } from '../../hooks/hook-use-store';
import { fetchOffersAction } from '../../services/thunk/thunk-fetch-offers';
import { fetchPromoOffersAction } from '../../services/thunk/thunk-fetch-promo-offers';

function App () {
  const dispatch = useAppDispatch();

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
