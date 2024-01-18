import { Swiper, SwiperSlide } from 'swiper/react';
import { useAppSelector } from '../../hooks/use-store';
import { BannerOfferComponent } from '../banner-offer/banner-offer';
import { Autoplay, Pagination } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/swiper-bundle.css';
import './banner.css';

function BannerComponent() {
  const stateOffersPromo = useAppSelector((state) => state.offersPromo.offers);

  SwiperCore.use([Autoplay, Pagination]);

  return (
    <div className="banner">
      <Swiper
        className="my-swiper"
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
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
