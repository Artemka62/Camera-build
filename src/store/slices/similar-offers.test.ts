import { reviewsSlice } from './index';

describe('Similar offers slice', () => {
  const emptyAction = { type: '' };

  const expectedState = {
    reviews: [],
    error: false,
    loading: false
  };

  it('should return initial state with empty action', () => {
    const result = reviewsSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return initial state with empty action and undefined', () => {
    const result = reviewsSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });
});
