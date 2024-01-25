import { Provider } from 'react-redux';
import { store } from '../../store';
import { withHistory } from '../mock-component/mock-component';
import { render, screen } from '@testing-library/react';
import { ModalWindowBasketSuccess } from './modal-window-product-basket-success';

describe('component: ModalWindowBasketSuccess', () => {
  it('should render correctly', () => {
    const expectedText = 'Спасибо за покупку';
    const preparedComponent = withHistory(
      <Provider store={store}>
        <ModalWindowBasketSuccess/>
      </Provider>
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
