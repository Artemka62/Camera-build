import { render, screen} from '@testing-library/react';
import { withHistory } from '../mock-component/mock-component';
import { Provider } from 'react-redux';
import { store } from '../../store/index';
import { CardOfferProductComponent } from './card-offer-product';

describe('component: CardOfferProduct', () => {
  it('should render correctly', () => {
    const expectData = 'card-offer-product';
    const expectedText = 'Добавить в корзину';

    const preparedComponent = withHistory(
      <Provider store={store}>
        <CardOfferProductComponent/>
      </Provider>
    );

    render(preparedComponent);

    expect(screen.getByTestId(expectData)).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
