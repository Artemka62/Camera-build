import { render, screen} from '@testing-library/react';
import { withHistory } from '../mock-component/mock-component';
import { ButtonInBasketComponent } from './button-in-basket';

describe('component: ButtonInBasketComponent', () => {
  it('should render correctly', () => {
    const expectedText = 'В корзине';
    const preparedComponent = withHistory(<ButtonInBasketComponent/>);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
