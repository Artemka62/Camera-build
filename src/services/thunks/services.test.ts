import { createApi } from '../index';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { ApiRoute, DEFAULT_UNIT, ServerAnswer } from '../../src-const';
import { fetchOffersAction } from './index';
import { mockOffer } from '../../mock-test/mock-offer/mock-offer';
import { State } from '../../types/index';
import { fetchOfferAction } from './index';
import { mockPromo } from '../../mock-test/mock-promo/mock-promo';
import { fetchPromoOffersAction } from './index';
import { fetchReviewsAction } from './index';
import { mockReview, mockReviewPost} from '../../mock-test/mock-review/mock-review';
import { mockSimilar } from '../../mock-test/mock-similar/mock-similar';
import { fetchSimilarOffersAction } from './index';
import { postReview } from './index';
import { postCoupon } from './index';
import { mockDataCoupon } from '../../mock-test/mock-coupon/mock-coupon';
import { postOrder } from './index';
import { mockOrder } from '../../mock-test/mock-order/mock-order';

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

      mockAxiosAdapter.onGet(ApiRoute.Offers).reply(ServerAnswer.Ok, mockOffers);

      await store.dispatch(fetchOffersAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOffersActionFulfilled = emittedActions.at(DEFAULT_UNIT) as ReturnType<typeof fetchOffersAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.fulfilled.type,
      ]);

      expect(fetchOffersActionFulfilled.payload)
        .toEqual(mockOffers);
    });

    it('should dispatch "fetchOffersAction.pending", "fetchOffersAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(ApiRoute.Offers).reply(ServerAnswer.Error, []);

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

      mockAxiosAdapter.onGet(`${ApiRoute.Offers}/${offer.id}`).reply(ServerAnswer.Ok, offer);

      await store.dispatch(fetchOfferAction(offer.id));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOfferActionFulfilled = emittedActions.at(DEFAULT_UNIT) as ReturnType<typeof fetchOfferAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchOfferAction.pending.type,
        fetchOfferAction.fulfilled.type,
      ]);

      expect(fetchOfferActionFulfilled.payload)
        .toEqual(offer);
    });

    it('should dispatch "fetchOfferAction.pending", "fetchOffersAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(`${ApiRoute.Offers}/${offer.id}`).reply(ServerAnswer.Error, []);

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

      mockAxiosAdapter.onGet(ApiRoute.OffersPromo).reply(ServerAnswer.Ok, offersPromo);

      await store.dispatch(fetchPromoOffersAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOffersActionFulfilled = emittedActions.at(DEFAULT_UNIT) as ReturnType<typeof fetchPromoOffersAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchPromoOffersAction.pending.type,
        fetchPromoOffersAction.fulfilled.type,
      ]);

      expect(fetchOffersActionFulfilled.payload)
        .toEqual(offersPromo);
    });

    it('should dispatch "fetchPromoOffersAction.pending", "fetchPromoOffersAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(ApiRoute.OffersPromo).reply(ServerAnswer.Error, []);

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

      mockAxiosAdapter.onGet(`${ApiRoute.Offers}/${mockReview.cameraId}${ApiRoute.ReviewsProduct}`).reply(ServerAnswer.Ok, reviews);

      await store.dispatch(fetchReviewsAction(mockReview.cameraId));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchReviewsActionFulfilled = emittedActions.at(DEFAULT_UNIT) as ReturnType<typeof fetchReviewsAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchReviewsAction.pending.type,
        fetchReviewsAction.fulfilled.type,
      ]);

      expect(fetchReviewsActionFulfilled.payload)
        .toEqual(reviews);

    });

    it('should dispatch "fetchReviewsAction.pending", "fetchReviewsAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(`${ApiRoute.Offers}/${mockReview.cameraId}${ApiRoute.ReviewsProduct}`).reply(ServerAnswer.Error, []);

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

      mockAxiosAdapter.onGet(`${ApiRoute.Offers}/${mockSimilar.id}${ApiRoute.Similar}`).reply(ServerAnswer.Ok, similarOffers);

      await store.dispatch(fetchSimilarOffersAction(mockSimilar.id));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchReviewsActionFulfilled = emittedActions.at(DEFAULT_UNIT) as ReturnType<typeof fetchSimilarOffersAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchSimilarOffersAction.pending.type,
        fetchSimilarOffersAction.fulfilled.type,
      ]);

      expect(fetchReviewsActionFulfilled.payload)
        .toEqual(similarOffers);

    });

    it('should dispatch "fetchSimilarOffersAction.pending", "fetchSimilarOffersAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(`${ApiRoute.Offers}/${mockSimilar.id}${ApiRoute.Similar}`).reply(ServerAnswer.Error, []);

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
      mockAxiosAdapter.onPost(`${ApiRoute.ReviewsProduct}`, mockReviewPost).reply(ServerAnswer.Created);

      await store.dispatch(postReview({dataForm}));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        postReview.pending.type,
        postReview.fulfilled.type
      ]);
    });

    it('should dispatch "postReviewAction.pending", "postReviewAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onPost(`${ApiRoute.ReviewsProduct}`, dataForm).reply(ServerAnswer.Error, []);

      await store.dispatch(postReview({dataForm}));

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        postReview.pending.type,
        postReview.rejected.type,
      ]);
    });
  });

  describe('postCouponAction', () => {
    const dataCoupon = mockDataCoupon;

    it('should dispatch "postCouponAction.pending", when server response 201', async() => {
      mockAxiosAdapter.onPost(`${ApiRoute.Coupon}`, dataCoupon).reply(ServerAnswer.Created);

      await store.dispatch(postCoupon(dataCoupon));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        postCoupon.pending.type,
        postCoupon.fulfilled.type
      ]);
    });

    it('should dispatch "postCouponAction.pending", "postCouponAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onPost(`${ApiRoute.Coupon}`, dataCoupon).reply(ServerAnswer.Error, []);

      await store.dispatch(postCoupon(dataCoupon));

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        postCoupon.pending.type,
        postCoupon.rejected.type,
      ]);
    });
  });

  describe('postOrderAction', () => {
    const dataOrder = mockOrder;

    it('should dispatch "postOrderAction.pending", when server response 201', async() => {
      mockAxiosAdapter.onPost(`${ApiRoute.Order}`, dataOrder).reply(ServerAnswer.Created);

      await store.dispatch(postOrder(dataOrder));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        postOrder.pending.type,
        postOrder.fulfilled.type
      ]);
    });

    it('should dispatch "postOrderAction.pending", "postOrderAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onPost(`${ApiRoute.Order}`, dataOrder).reply(ServerAnswer.Error, []);

      await store.dispatch(postOrder(dataOrder));

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        postOrder.pending.type,
        postOrder.rejected.type,
      ]);
    });
  });
});
