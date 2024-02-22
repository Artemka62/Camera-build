import { ToastContainer } from 'react-toastify';
import { useAppSelector } from '../../hooks/hook-use-store';
import { useEffect } from 'react';
import { notify } from '../../utils/utils-toastify';

function ToastifyComponent () {
  const isErrorLoadingPromoOffers = useAppSelector((state) => state.offersPromo.error);
  const isErrorLoadingOffers = useAppSelector((state) => state.offers.error);
  const isErrorLoadingOffersSimilar = useAppSelector((state) => state.similarOffers.error);
  const isErrorLoadingOffer = useAppSelector((state) => state.offer.error);
  const isErrorLoadingReviews = useAppSelector((state) => state.reviews.error);
  const isError = isErrorLoadingOffersSimilar || isErrorLoadingOffer || isErrorLoadingReviews || isErrorLoadingPromoOffers || isErrorLoadingOffers;

  useEffect(() => {
    if(isError) {
      notify();
    }
  },[isError]);

  return(
    <ToastContainer/>
  );
}

export {ToastifyComponent};
