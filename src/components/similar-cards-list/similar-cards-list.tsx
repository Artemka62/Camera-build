import { useAppSelector } from '../../hooks/use-store';
import { OfferCard } from '../../types/types-store';
import { CardComponent } from '../card/card';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './similar-cards-list.css';
import { DEFAULT_NULL } from '../../const';


type SimilarCardsListComponentProps = {
  offers: OfferCard[];
}

function SimilarCardsListComponent({ offers }: SimilarCardsListComponentProps) {

  const stateOffer = useAppSelector((state) => state.offer.reviews);

  const getSimilarOffers = offers.filter((product) => (
    stateOffer?.level === product.level && stateOffer.type === product.type && stateOffer.category === product.category
  ));

  return (
    <section className="product-similar" data-testid='similar-cards'>
      <div className="container">
        {getSimilarOffers.length !== DEFAULT_NULL ? <h2 className="title title--h3">Похожие товары</h2> : ''}
        <div className="product-similar__slider">
          <Swiper
            navigation={{
              enabled: true,
              prevEl: '.slider-controls--prev',
              nextEl: '.slider-controls--next',
            }}
            modules={[Navigation]}
            slidesPerView={3}
            watchSlidesProgress
            allowTouchMove={false}
            slidesPerGroup={3}

            className="product-similar__slider-list"
          >

            {getSimilarOffers.map((offer) => (
              <SwiperSlide key={offer.id}>
                <CardComponent offer={offer} />
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            className="slider-controls slider-controls--prev"
            type="button"
            aria-label="Предыдущий слайд"
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
      </div>
    </section>
  );
}

export { SimilarCardsListComponent };
