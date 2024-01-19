//import { useAppSelector } from '../../hooks/use-store';
import { useState } from 'react';
import { ModalWindowComponent } from '../../modal-window/modal-window';
import { OfferCard } from '../../types/types-store';
import { CardComponent } from '../card/card';

type CardsListComponentProps ={
  offers: OfferCard[];
}

function CardsListComponent ({offers,}: CardsListComponentProps) {

  const [modalStatus, setModalStatus] = useState(false);

  function getStatusModalWindow (status: boolean) {
    setModalStatus(status);
  }


  return (
    <>
      <div className="cards catalog__cards">

        {offers?.map((offer) => <CardComponent key={offer.id} offer={offer} getStatusModalWindow={getStatusModalWindow}/>)}

      </div>

      <ModalWindowComponent modalStatus={modalStatus} getStatusModalWindow={getStatusModalWindow}/>

    </>
  );
}

export {CardsListComponent};
