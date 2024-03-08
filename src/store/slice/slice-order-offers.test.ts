import { orderSlice } from './slice-order-offers';

describe('Order offers slice', () => {
  const expectedState = {
    error: false,
    loading: false,
  };

  const emptyAction = { type: '' };

  it('should return initial state with empty action', () => {
    const result = orderSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return initial state with empty action and undefined', () => {
    const result = orderSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });
});
