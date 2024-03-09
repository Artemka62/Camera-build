import { Route, Routes } from 'react-router-dom';
import { AppRoute, DEFAULT_NULL, EMPTY_STRING, KEY_LOCAL_STORAGE_COUPON, KEY_LOCAL_STORAGE_OFFERS, TitleDescription } from '../../src-const';
import { MainPage } from '../../pages/page-main/page-main';
import { ProductPage } from '../../pages/page-product/page-product';
import { BasketPage } from '../../pages/page-basket/page-basket';
import { ErrorPage } from '../../pages/page-error/page-error';
import { useAppDispatch } from '../../use-hooks/use-hook-store';
import { fetchOffersAction } from '../../services/thunk/thunk-fetch-offers';
import { fetchPromoOffersAction } from '../../services/thunk/thunk-fetch-promo-offers';
import { CouponLocalStorage, OfferLocalStorage } from '../../types/types-store';
import { getLocalStorage, setLocalStorage } from '../../utils/utils-local-storage';
import { offersBasketSlice } from '../../store/slice/slice-basket-offers';
import { couponSlice } from '../../store/slice/slice-coupon';

function App () {
  const dispatch = useAppDispatch();
  const myLocalStorageOffers = getLocalStorage(KEY_LOCAL_STORAGE_OFFERS) as OfferLocalStorage[];
  const myLocalStorageCoupon = getLocalStorage(KEY_LOCAL_STORAGE_COUPON) as CouponLocalStorage;

  if(myLocalStorageOffers === undefined) {
    const array: OfferLocalStorage[] = [];

    localStorage.setItem(KEY_LOCAL_STORAGE_OFFERS, JSON.stringify(array));
    dispatch(offersBasketSlice.actions.offersBasket(array));
  } else {
    dispatch(offersBasketSlice.actions.offersBasket(myLocalStorageOffers));
  }


  if(myLocalStorageCoupon === undefined) {
    setLocalStorage(KEY_LOCAL_STORAGE_COUPON, {
      coupon: EMPTY_STRING,
      percent: DEFAULT_NULL
    });
  }else{
    dispatch(couponSlice.actions.percent(myLocalStorageCoupon.percent));
    dispatch(couponSlice.actions.coupon(myLocalStorageCoupon.coupon));
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
