import { render, screen} from '@testing-library/react';
import { withHistory } from '../mock-component/mock-component';
import { Provider } from 'react-redux';
import { store } from '../../store/store-index';
import { CardListBasketComponent } from './card-list-basket';

describe('component: CardListBasketComponent', () => {
  it('should render correctly', () => {
    const expectedDataId = 'card-list-basket';

    const preparedComponent = withHistory(
      <Provider store={store}>
        <CardListBasketComponent/>
      </Provider>
    );

    render(preparedComponent);

    expect(screen.getByTestId(expectedDataId)).toBeInTheDocument();
  });
});
