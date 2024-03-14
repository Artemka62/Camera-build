import 'swiper/swiper-bundle.css';
import './banner.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useAppSelector } from '../../use-hooks/index';
import { BannerOfferComponent } from '../banner-offer/banner-offer';
import { Autoplay, Pagination } from 'swiper/modules';
import SwiperCore from 'swiper';
import { DEFAULT_NULL, DEFAULT_UNIT, DELAY_FOR_BANNER } from '../../src-const';

function BannerComponent() {
  const stateOffersPromo = useAppSelector((state) => state.offersPromo.offers);

  SwiperCore.use([Autoplay, Pagination]);

  return (
    <div className="banner" data-testid ='banner'>
      <Swiper
        className="my-swiper"
        spaceBetween={DEFAULT_NULL}
        slidesPerView={DEFAULT_UNIT}
        autoplay={{ delay: DELAY_FOR_BANNER }}
        pagination={{ clickable: true }}
        style={{ height: 280 }}
      >
        {stateOffersPromo.map((offer) => (
          <SwiperSlide key={offer.id}>
            <BannerOfferComponent offer={offer} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export { BannerComponent };
