import { ToastContainer } from 'react-toastify';
import { useAppSelector } from '../../hooks/hook-use-store';
import { useEffect } from 'react';
import { notify } from '../../utils/utils-toastify';
import { DEFAULT_UNIT } from '../../src-const';

function ToastifyComponent () {
  const isErrorLoadingPromoOffers = useAppSelector((state) => state.offersPromo.error);
  const isErrorLoadingOffers = useAppSelector((state) => state.offers.error);
  const isErrorLoadingOffersSimilar = useAppSelector((state) => state.similarOffers.error);
  const isErrorLoadingOffer = useAppSelector((state) => state.offer.error);
  const isErrorLoadingReviews = useAppSelector((state) => state.reviews.error);
  const isErrorMainPage = isErrorLoadingOffers || isErrorLoadingPromoOffers;
  const isErrorProductPage = isErrorLoadingReviews || isErrorLoadingOffersSimilar || isErrorLoadingOffer;

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isErrorMainPage) {
      timeoutId = setTimeout(() => {
        notify();
      }, 100);
    }

    return () => clearTimeout(timeoutId);
  }, [isErrorMainPage]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isErrorProductPage) {
      timeoutId = setTimeout(() => {
        notify();
      }, 100);
    }

    return () => clearTimeout(timeoutId);
  }, [isErrorProductPage]);

  return (
    <ToastContainer limit={DEFAULT_UNIT}/>
  );
}

export { ToastifyComponent };
