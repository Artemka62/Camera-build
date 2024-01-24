import { mockOffer } from '../mock-test/mock-offer/mock-offer';
import { mockPromo } from '../mock-test/mock-promo/mock-promo';
import { mockReview } from '../mock-test/mock-review/mock-review';
import { mockSimilar } from '../mock-test/mock-similar/mock-similar';
import { State } from '../types/types-store';

const makeFakeStore = (initialState?: Partial<State>): State => ({

  offers: {
    offers: [mockOffer],
    error: false,
    loading: false
  },
  offersPromo:{
    offers: [mockPromo]
  } ,
  offer:{
    reviews:mockOffer,
    error: false,
    loading: false,
  } ,
  windows: {
    isWindowModalOpen: false,
    isWindowProductOpen: false,
    isWindowReviewOpen: false,
    isWindowBasketSuccessOpen: false
  },
  similarOffers: {
    similarOffers:[mockSimilar]
  },
  reviews:{reviews:
    [mockReview]
  } ,

  ...(initialState ?? {}),
});

export {makeFakeStore};
