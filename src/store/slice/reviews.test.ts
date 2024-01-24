import { similarOffersSlice } from './similar-offers';

describe('Reviews slice', () => {
  const emptyAction = { type: '' };

  const expectedState = {
    similarOffers: []
  };

  it('should return initial state with empty action', () => {


    const result = similarOffersSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return initial state with empty action and undefined', () => {
    const result = similarOffersSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });
});
