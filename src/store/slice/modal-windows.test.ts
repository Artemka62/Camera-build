import { windowsSlice } from './modal-windows';

describe('Modal windows slice', () => {
  const emptyAction = { type: '' };

  const expectedState = {
    isWindowModalOpen: false,
    isWindowProductOpen: false,
    isWindowReviewOpen: false,
    isWindowBasketSuccessOpen: false
  };

  it('should return initial state with empty action', () => {


    const result = windowsSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return initial state with empty action and undefined', () => {
    const result = windowsSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });
});
