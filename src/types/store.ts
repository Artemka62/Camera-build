import { store } from '../store/index';

type State = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

type OfferCard = {
  id: number;
  name: string;
  vendorCode: string;
  type: string;
  category: string;
  description: string;
  level: string;
  price: number;
  rating: number;
  reviewCount: number;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
};

type OfferPromo = {
  id: number;
  name: string;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
}

type StateOffer = {
  offer: OfferCard | null;
  error: boolean;
  loading: boolean;
}

type StateOffers = {
  offers: OfferCard[];
  error: boolean;
  loading: boolean;
}

type StateOffersSimilar = {
  similarOffers: OfferCard[];
  error: boolean;
  loading: boolean;
}

type StateOffersPromo = {
  offers: OfferPromo[];
  error: boolean;
  loading: boolean;
}

type StateWindow = {
  isWindowProductOpen: boolean;
  isWindowReviewOpen: boolean;
  isWindowModalOpen: boolean;
  isWindowReviewSuccessOpen: boolean;
  isWindowAddBasketSuccessOpen: boolean;
  isWindowDeleteBasketOpen: boolean;
  idDeleteOffer: boolean | number;
  isOrderSuccessOpen: boolean;
};

type Review = {
  id: string;
  createAt: string;
  cameraId: number;
  userName: string;
  advantage: string;
  disadvantage: string;
  review: string;
  rating: number;
}

type StateReviews = {
  reviews: Review[];
  error: boolean;
  loading: boolean;
}

type StateCoupon = {
  percent: number;
  error: boolean;
  loading: boolean;
  coupon: string;
}

type StateOrder = {
  error: boolean;
  loading: boolean;
}

type StateCouponLocalStorage = {
  coupon: null | string;
  percent: number;
}

type OfferLocalStorage = {
  count: number;
  id: number;
  offer: OfferCard;
}

type CouponLocalStorage = {
  coupon: string;
  percent: number;
}

type StateBasket = {
  offers: OfferLocalStorage[] | [];
}

export type {
  State,
  AppDispatch,
  OfferCard,
  OfferPromo,
  StateOffer,
  StateOffers,
  StateOffersSimilar,
  StateOffersPromo,
  StateWindow,
  Review,
  StateReviews,
  StateCoupon,
  StateOrder,
  StateCouponLocalStorage,
  OfferLocalStorage,
  CouponLocalStorage,
  StateBasket
};
