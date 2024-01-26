import { Provider } from 'react-redux';
import { store } from '../../store/store-index';
import { withHistory } from '../mock-component/mock-component';
import { render, screen } from '@testing-library/react';
import { ModalWindowReviewProductComponent } from './modal-window-rewiev-product';


describe('component: ModalWindowReviewProduct', () => {
  it('should render correctly', () => {
    const expectedText = 'Оставить отзыв';
    const preparedComponent = withHistory(
      <Provider store={store}>
        <ModalWindowReviewProductComponent/>
      </Provider>
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
