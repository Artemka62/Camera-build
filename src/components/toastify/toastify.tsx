import { ToastContainer } from 'react-toastify';
import { useAppSelector } from '../../hooks/hook-use-store';
import { useEffect } from 'react';
import { notify } from '../../utils/utils-toastify';

function ToastifyComponent () {
  const isErrorLoadingPromoOffers = useAppSelector((state) => state.offersPromo.error);
  const isErrorLoadingOffers = useAppSelector((state) => state.offers.error);

  useEffect(() => {
    if(isErrorLoadingPromoOffers || isErrorLoadingOffers) {
      notify();
    }
  },[isErrorLoadingPromoOffers, isErrorLoadingOffers]);


  return(
    <ToastContainer/>
  );
}

export {ToastifyComponent};
