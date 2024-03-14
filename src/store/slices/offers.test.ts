import { offersSlice } from './index';

describe('Offers slice', () => {
  const expectedState = {
    offers: [],
    error: false,
    loading: false
  };

  const emptyAction = { type: '' };

  it('should return initial state with empty action', () => {
    const result = offersSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return initial state with empty action and undefined', () => {
    const result = offersSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });
});

