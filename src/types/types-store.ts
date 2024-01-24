import { store } from '../store';

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
  reviews: OfferCard | null;
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
}

type StateOffersPromo = {
  offers: OfferPromo[];
}

type StateWindow = {
  isWindowProductOpen: boolean;
  isWindowReviewOpen: boolean;
  isWindowModalOpen: boolean;
  isWindowBasketSuccessOpen: boolean;
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
  StateReviews
};
