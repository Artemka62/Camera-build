import { reviewsSlice } from './reviews';

describe('Similar offers slice', () => {
  const emptyAction = { type: '' };

  const expectedState = {
    reviews: []
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
