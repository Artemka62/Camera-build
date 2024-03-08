import { couponSlice } from './slice-coupon';

describe('Coupon slice', () => {
  const emptyAction = { type: '' };

  const expectedState = {
    percent: 0,
    error: false,
    loading: false,
    coupon: ''
  };

  it('should return initial state with empty action', () => {
    const result = couponSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return initial state with empty action and undefined', () => {
    const result = couponSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });
});
