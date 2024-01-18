import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute, TitleDescription } from '../../const';
import { MainPage } from '../../pages/main-page/main-page';
import { ProductPage } from '../../pages/product-page/product-page';
import { BasketPage } from '../../pages/basket-page/basket-page';
import { ErrorPage } from '../../pages/error-page/error-page';
import { useAppDispatch } from '../../hooks/use-store';
import { fetchOffersAction } from '../../services/thunk/fetch-offers';
import { fetchPromoOffersAction } from '../../services/thunk/fetch-promo-offers';

function App () {
  const dispatch = useAppDispatch();

  dispatch(fetchOffersAction());
  dispatch(fetchPromoOffersAction());

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={`${AppRoute.Main}`}
          element ={
            <MainPage title = {TitleDescription.MainPage}/>
          }
        />
        <Route
          path={`${AppRoute.Product}`}
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
    </BrowserRouter>
  );
}

export {App};
