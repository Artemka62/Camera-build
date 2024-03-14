import { render, screen} from '@testing-library/react';
import { withHistory } from '../mock-component/mock-component';
import { ButtonBasketComponent } from './button-basket';
import { Provider } from 'react-redux';
import { store } from '../../store/index';

describe('component: ButtonBasket', () => {
  it('should render correctly', () => {
    const expectedText = 'button-basket';
    const preparedComponent = withHistory(
      <Provider store={store}>
        <ButtonBasketComponent/>
      </Provider>
    );

    render(preparedComponent);

    expect(screen.getByTestId(expectedText)).toBeInTheDocument();
  });
});
