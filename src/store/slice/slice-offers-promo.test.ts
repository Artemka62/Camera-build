import { offersPromoSlice } from './slice-offers-promo';

describe('Offers promo slice', () => {
  const expectedState = {
    offers: []
  };

  const emptyAction = { type: '' };

  it('should return initial state with empty action', () => {
    const result = offersPromoSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return initial state with empty action and undefined', () => {
    const result = offersPromoSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });
});
