import { useState } from 'react';
import { useAppSelector } from '../../hooks/use-store';
import { ModalWindowComponent } from '../../modal-window/modal-window';
import { OfferCard } from '../../types/types-store';
import { CardComponent } from '../card/card';

type SimilarCardsListComponentProps = {
  offers: OfferCard[];
}

function SimilarCardsListComponent({ offers }: SimilarCardsListComponentProps) {
  const isWindowModalOpen = useAppSelector((state) => state.window.isWindowOpen);




  const [currentGroup, setCurrentGroup] = useState(0);
  const groupSize = 3;

  const totalGroups = Math.ceil(offers.length / groupSize);

  function handlePrevClick () {
    setCurrentGroup((prevGroup) => (prevGroup - 1 + totalGroups) % totalGroups);
  }

  function handleNextClick () {
    setCurrentGroup((prevGroup) => (prevGroup + 1) % totalGroups);
  }

  const startIdx = currentGroup * groupSize;
  const endIdx = startIdx + groupSize;

  return (
    <div className="product-similar__slider">
      <div className="product-similar__slider-list">
        {offers.slice(startIdx, endIdx).map((offer) => (
          <CardComponent key={offer.id} offer={offer} />
        ))}
        <ModalWindowComponent modalStatus={isWindowModalOpen} />
      </div>
      <button
        onClick={handlePrevClick}
        className=" slider-controls--prev"
        type="button"
        aria-label="Предыдущий слайд"

        disabled={currentGroup === 0}
      >
        <svg width={7} height={12} aria-hidden="true">
          <use xlinkHref="#icon-arrow" />
        </svg>
      </button>
      <button
        onClick={handleNextClick}
        className=" slider-controls--next"
        type="button"
        aria-label="Следующий слайд"

        disabled={currentGroup === totalGroups - 1}
      >
        <svg width={7} height={12} aria-hidden="true">
          <use xlinkHref="#icon-arrow" />
        </svg>
      </button>
    </div>
  );
}

export { SimilarCardsListComponent };
