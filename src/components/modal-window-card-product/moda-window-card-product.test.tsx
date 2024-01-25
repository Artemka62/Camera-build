import { Provider } from 'react-redux';
import { store } from '../../store';
import { withHistory } from '../mock-component/mock-component';
import { render, screen } from '@testing-library/react';
import { ModalWindowCardProductComponent } from './modal-window-card-product';


describe('component: ModalWindowCardProduct', () => {
  it('should render correctly', () => {
    const expectedText = 'Добавить товар в корзину';
    const preparedComponent = withHistory(
      <Provider store={store}>
        <ModalWindowCardProductComponent/>
      </Provider>
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
