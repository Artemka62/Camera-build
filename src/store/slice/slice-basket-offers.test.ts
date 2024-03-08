import { offersBasketSlice } from './slice-basket-offers';

describe('Offers basket slice', () => {
  const emptyAction = { type: '' };

  const expectedState = {
    offers: []
  };

  it('should return initial state with empty action', () => {
    const result = offersBasketSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return initial state with empty action and undefined', () => {
    const result = offersBasketSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });
});
