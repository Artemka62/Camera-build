import { render, screen} from '@testing-library/react';
import { withHistory } from '../mock-component/mock-component';
import { CardComponent } from './card';
import { mockOffer } from '../../mock-test/mock-offer/mock-offer';
import { Provider } from 'react-redux';
import { store } from '../../store/index';

describe('component: Card', () => {
  const isTrue = true;

  it('should render correctly', () => {
    const expectedText = 'card';
    const preparedComponent = withHistory(
      <Provider store={store}>
        {isTrue ? <CardComponent offer={mockOffer}/> : ''}
      </Provider>
    );

    render(preparedComponent);

    expect(screen.getByTestId(expectedText)).toBeInTheDocument();
  });
});
