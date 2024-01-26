import { Provider } from 'react-redux';
import { store } from '../../store/store-index';
import { withHistory } from '../mock-component/mock-component';
import { render, screen } from '@testing-library/react';
import { ModalWindowReviewSuccess } from './modal-window-review-success';

describe('component: ModalWindowBasketSuccess', () => {
  it('should render correctly', () => {
    const expectedText = 'Спасибо за отзыв';
    const preparedComponent = withHistory(
      <Provider store={store}>
        <ModalWindowReviewSuccess/>
      </Provider>
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
