import { Provider } from 'react-redux';
import { store } from '../../store';
import { withHistory } from '../mock-component/mock-component';
import { CardsListComponent } from './cards-list';
import { mockOffer } from '../../mock-test/mock-offer/mock-offer';
import { render, screen } from '@testing-library/react';

describe('component: CardList', () => {
  it('should render correctly', () => {
    const expectedData = 'card-list';
    const preparedComponent = withHistory(
      <Provider store={store}>
        <CardsListComponent offers={[mockOffer]}/>
      </Provider>
    );

    render(preparedComponent);

    expect(screen.getByTestId(expectedData)).toBeInTheDocument();
  });
});
