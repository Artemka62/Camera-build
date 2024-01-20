import { useAppSelector } from '../../hooks/use-store';
import { ModalWindowComponent } from '../../modal-window/modal-window';
import { OfferCard } from '../../types/types-store';
import { CardComponent } from '../card/card';

type SimilarCardsListComponentProps = {
  offers: OfferCard[];
}

function SimilarCardsListComponent ({offers}: SimilarCardsListComponentProps) {
  const isWindowModalOpen = useAppSelector((state) => state.window.isWindowOpen);

  return(
    <div className="product-similar__slider">
      <div className="product-similar__slider-list">

        {offers.map((offer) => <CardComponent key={offer.id} offer={offer}/>).slice(0,3)}

        <ModalWindowComponent modalStatus={isWindowModalOpen}/>

      </div>
      <button
        className="slider-controls slider-controls--prev"
        type="button"
        aria-label="Предыдущий слайд"
        disabled
      >
        <svg width={7} height={12} aria-hidden="true">
          <use xlinkHref="#icon-arrow" />
        </svg>
      </button>
      <button
        className="slider-controls slider-controls--next"
        type="button"
        aria-label="Следующий слайд"
      >
        <svg width={7} height={12} aria-hidden="true">
          <use xlinkHref="#icon-arrow" />
        </svg>
      </button>
    </div>
  );
}

export {SimilarCardsListComponent};
