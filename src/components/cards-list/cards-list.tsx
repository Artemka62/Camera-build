//import { useAppSelector } from '../../hooks/use-store';
import { ModalWindowComponent } from '../../modal-window/modal-window';
import { OfferCard } from '../../types/types-store';
import { CardComponent } from '../card/card';
import { useAppSelector } from '../../hooks/use-store';

type CardsListComponentProps ={
  offers: OfferCard[];
}

function CardsListComponent ({offers}: CardsListComponentProps) {
  const isWindowModalOpen = useAppSelector((state) => state.window.isWindowOpen);


  return (
    <>
      <div className="cards catalog__cards">

        {offers?.map((offer) => <CardComponent key={offer.id} offer={offer}/>)}

      </div>

      <ModalWindowComponent modalStatus={isWindowModalOpen}/>

    </>
  );
}

export {CardsListComponent};
