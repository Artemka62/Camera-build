import { Provider } from 'react-redux';
import { store } from '../../store';
import { withHistory } from '../mock-component/mock-component';
import { render, screen } from '@testing-library/react';
import { ModalWindowAddBasketSuccessComponent } from './modal-window-add-basket-success';

describe('component: ModalWindowAddBasketSuccess', () => {
  it('should render correctly', () => {
    const expectedText = 'Товар успешно добавлен в корзину';
    const preparedComponent = withHistory(
      <Provider store={store}>
        <ModalWindowAddBasketSuccessComponent/>
      </Provider>
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
