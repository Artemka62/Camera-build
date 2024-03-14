import { render, screen} from '@testing-library/react';
import { withHistory } from '../mock-component/mock-component';
import { mockOffer } from '../../mock-test/mock-offer/mock-offer';
import { Provider } from 'react-redux';
import { store } from '../../store/index';
import { CardBasketComponent } from './card-basket';

describe('component: CardBasketComponent', () => {
  it('should render correctly', () => {
    const expectedDataId = 'card-basket';

    const preparedComponent = withHistory(
      <Provider store={store}>
        <CardBasketComponent offer={mockOffer}/>
      </Provider>
    );

    render(preparedComponent);

    expect(screen.getByTestId(expectedDataId)).toBeInTheDocument();
  });
});
