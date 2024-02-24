import { ToastContainer } from 'react-toastify';
import { useAppSelector } from '../../use-hooks/use-hook-store';
import { useEffect } from 'react';
import { notify } from '../../utils/utils-toastify';
import { AppRoute, DEFAULT_UNIT, DELAY_NOTIFY } from '../../src-const';
import { useLocation} from 'react-router-dom';

function ToastifyComponent () {
  const isErrorLoadingPromoOffers = useAppSelector((state) => state.offersPromo.error);
  const isErrorLoadingOffers = useAppSelector((state) => state.offers.error);
  const isErrorLoadingOffersSimilar = useAppSelector((state) => state.similarOffers.error);
  const isErrorLoadingOffer = useAppSelector((state) => state.offer.error);
  const isErrorLoadingReviews = useAppSelector((state) => state.reviews.error);
  const isErrorMainPage = isErrorLoadingOffers || isErrorLoadingPromoOffers;
  const isErrorProductPage = isErrorLoadingReviews || isErrorLoadingOffersSimilar || isErrorLoadingOffer;
  const location = useLocation();
  const pageLocation = location.pathname;

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isErrorMainPage && false === pageLocation.includes(AppRoute.Product)) {
      timeoutId = setTimeout(() => {
        notify();
      }, DELAY_NOTIFY);
    }

    return () => clearTimeout(timeoutId);
  }, [isErrorMainPage]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isErrorProductPage && pageLocation.includes(AppRoute.Product)) {
      timeoutId = setTimeout(() => {
        notify();
      }, DELAY_NOTIFY);
    }

    return () => clearTimeout(timeoutId);
  }, [isErrorProductPage]);

  return (
    <div data-testid='toastify-component'>
      <ToastContainer limit={DEFAULT_UNIT}/>
    </div>
  );
}

export { ToastifyComponent };
