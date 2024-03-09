import { Provider } from 'react-redux';
import { store } from '../../store/store-index';
import { withHistory } from '../mock-component/mock-component';
import { render, screen } from '@testing-library/react';
import { OrderProductComponent } from './order-product-component';

describe('component: OrderProductComponent', () => {
  it('should render correctly', () => {
    const expectedText = 'Если у вас есть промокод на скидку, примените его в этом поле';

    const preparedComponent = withHistory(
      <Provider store={store}>
        <OrderProductComponent/>
      </Provider>
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
