import { mockBasket } from '../mock-test/mock-basket/mock-basket';
import { mockOffer } from '../mock-test/mock-offer/mock-offer';
import { mockPromo } from '../mock-test/mock-promo/mock-promo';
import { mockReview } from '../mock-test/mock-review/mock-review';
import { mockSimilar } from '../mock-test/mock-similar/mock-similar';
import { State } from '../types/types-store';

const useMakeFakeStore = (initialState?: Partial<State>): State => ({
  offers: {
    offers: [mockOffer],
    error: false,
    loading: false
  },
  offersPromo:{
    offers: [mockPromo],
    error: false,
    loading: false
  } ,
  offer:{
    offer:mockOffer,
    error: false,
    loading: false,
  } ,
  windows: {
    isWindowModalOpen: false,
    isWindowProductOpen: false,
    isWindowReviewOpen: false,
    isWindowReviewSuccessOpen: false,
    isWindowAddBasketSuccessOpen: false,
    isWindowDeleteBasketOpen: false
  },
  similarOffers: {
    similarOffers:[mockSimilar],
    error: false,
    loading: false
  },
  reviews: {
    reviews:[mockReview],
    error: false,
    loading: false
  },
  offersBasket: {
    offers: [mockBasket]
  },
  ...(initialState ?? {}),
});

export {useMakeFakeStore};
