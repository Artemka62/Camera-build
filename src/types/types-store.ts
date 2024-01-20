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
  offer: OfferCard | null;
}

type StateOffers = {
  similarOffers: OfferCard[];
}

type StateOffersPromo = {
  offers: OfferPromo[];
}

type StateWindow = {
  isWindowOpen: boolean;
};


export type {State, AppDispatch, OfferCard, OfferPromo, StateOffer, StateOffers, StateOffersPromo, StateWindow};
