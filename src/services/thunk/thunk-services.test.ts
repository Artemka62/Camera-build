import { createApi } from '../services-api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { ApiRoute } from '../../src-const';
import { fetchOffersAction } from './thunk-fetch-offers';
import { mockOffer } from '../../mock-test/mock-offer/mock-offer';
import { State } from '../../types/types-store';
import { fetchOfferAction } from './thunk-fetch-offer';
import { mockPromo } from '../../mock-test/mock-promo/mock-promo';
import { fetchPromoOffersAction } from './thunk-fetch-promo-offers';
import { fetchReviewsAction } from './thunk-fetch-rewiews';
import { mockReview, mockReviewPost} from '../../mock-test/mock-review/mock-review';
import { mockSimilar } from '../../mock-test/mock-similar/mock-similar';
import { fetchSimilarOffersAction } from './thunk-fetch-similar-offers';
import { postReview } from './thunk-post-review';

type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createApi>, Action>

const extractActionsTypes = (actions: Action<string>[]) => actions.map(({type}) => type);


describe('Async actions', () => {
  const axios = createApi();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({});
  });

  describe('fetchOffersAction', () => {
    it('should dispatch "fetchOffersAction.pending", when server response 200', async() => {
      const mockOffers = [mockOffer];

      mockAxiosAdapter.onGet(ApiRoute.Offers).reply(200, mockOffers);

      await store.dispatch(fetchOffersAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOffersActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOffersAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.fulfilled.type,
      ]);

      expect(fetchOffersActionFulfilled.payload)
        .toEqual(mockOffers);
    });

    it('should dispatch "fetchOffersAction.pending", "fetchOffersAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(ApiRoute.Offers).reply(400, []);

      await store.dispatch(fetchOffersAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.rejected.type,
      ]);
    });
  });
  describe('fetchOfferAction', () => {
    const offer = mockOffer;

    it('should dispatch "fetchOfferAction.pending", when server response 200', async() => {


      mockAxiosAdapter.onGet(`${ApiRoute.Offers}/${offer.id}`).reply(200, offer);

      await store.dispatch(fetchOfferAction(offer.id));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOfferActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOfferAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchOfferAction.pending.type,
        fetchOfferAction.fulfilled.type,
      ]);

      expect(fetchOfferActionFulfilled.payload)
        .toEqual(offer);
    });

    it('should dispatch "fetchOfferAction.pending", "fetchOffersAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(`${ApiRoute.Offers}/${offer.id}`).reply(400, []);

      await store.dispatch(fetchOfferAction(offer.id));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOfferAction.pending.type,
        fetchOfferAction.rejected.type,
      ]);
    });
  });
  describe('fetchPromoOffersAction', () => {


    it('should dispatch "fetchPromoOffersAction.pending", when server response 200', async() => {
      const offersPromo = [mockPromo];

      mockAxiosAdapter.onGet(ApiRoute.OffersPromo).reply(200, offersPromo);

      await store.dispatch(fetchPromoOffersAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOffersActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchPromoOffersAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchPromoOffersAction.pending.type,
        fetchPromoOffersAction.fulfilled.type,
      ]);

      expect(fetchOffersActionFulfilled.payload)
        .toEqual(offersPromo);
    });

    it('should dispatch "fetchPromoOffersAction.pending", "fetchPromoOffersAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(ApiRoute.OffersPromo).reply(400, []);

      await store.dispatch(fetchPromoOffersAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchPromoOffersAction.pending.type,
        fetchPromoOffersAction.rejected.type,
      ]);
    });
  });
  describe('fetchReviewsAction', () => {
    it('should dispatch "fetchReviewsAction.pending", when server response 200', async() => {
      const reviews = [mockReview];

      mockAxiosAdapter.onGet(`${ApiRoute.Offers}/${mockReview.cameraId}/reviews`).reply(200, reviews);

      await store.dispatch(fetchReviewsAction(mockReview.cameraId));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchReviewsActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchReviewsAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchReviewsAction.pending.type,
        fetchReviewsAction.fulfilled.type,
      ]);

      expect(fetchReviewsActionFulfilled.payload)
        .toEqual(reviews);

    });

    it('should dispatch "fetchReviewsAction.pending", "fetchReviewsAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(`${ApiRoute.Offers}/${mockReview.cameraId}/reviews`).reply(400, []);

      await store.dispatch(fetchReviewsAction(mockReview.cameraId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchReviewsAction.pending.type,
        fetchReviewsAction.rejected.type,
      ]);
    });
  });
  describe('fetchSimilarOffersAction', () => {
    it('should dispatch "fetchSimilarOffersAction.pending", when server response 200', async() => {
      const similarOffers = [mockSimilar];

      mockAxiosAdapter.onGet(`${ApiRoute.Offers}/${mockSimilar.id}/similar`).reply(200, similarOffers);

      await store.dispatch(fetchSimilarOffersAction(mockSimilar.id));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchReviewsActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchSimilarOffersAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchSimilarOffersAction.pending.type,
        fetchSimilarOffersAction.fulfilled.type,
      ]);

      expect(fetchReviewsActionFulfilled.payload)
        .toEqual(similarOffers);

    });

    it('should dispatch "fetchSimilarOffersAction.pending", "fetchSimilarOffersAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(`${ApiRoute.Offers}/${mockSimilar.id}/similar`).reply(400, []);

      await store.dispatch(fetchSimilarOffersAction(mockSimilar.id));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchSimilarOffersAction.pending.type,
        fetchSimilarOffersAction.rejected.type,
      ]);
    });
  });

  describe('postReviewAction', () => {
    const dataForm = mockReviewPost;

    it('should dispatch "postReviewAction.pending", when server response 201', async() => {
      mockAxiosAdapter.onPost(`${ApiRoute.ReviewsProduct}`, mockReviewPost).reply(201);

      await store.dispatch(postReview({dataForm}));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        postReview.pending.type,
        postReview.fulfilled.type
      ]);
    });

    it('should dispatch "postReviewAction.pending", "postReviewAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onPost(`${ApiRoute.ReviewsProduct}`, dataForm).reply(400, []);

      await store.dispatch(postReview({dataForm}));

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        postReview.pending.type,
        postReview.rejected.type,
      ]);
    });
  });
});
