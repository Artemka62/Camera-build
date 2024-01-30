import { render, screen} from '@testing-library/react';
import { withHistory } from '../mock-component/mock-component';
import { ButtonBasketComponent } from './button-basket';

describe('component: ButtonBasket', () => {
  it('should render correctly', () => {
    const expectedText = 'button-basket';
    const preparedComponent = withHistory(<ButtonBasketComponent/>);

    render(preparedComponent);

    expect(screen.getByTestId(expectedText)).toBeInTheDocument();
  });
});
