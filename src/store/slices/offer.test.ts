import { offerSlice } from './index';

describe('Offer slice', () => {
  const emptyAction = { type: '' };

  const expectedState = {
    offer: null,
    error: false,
    loading : false
  };

  it('should return initial state with empty action', () => {
    const result = offerSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return initial state with empty action and undefined', () => {
    const result = offerSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });
});
