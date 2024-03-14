import { Provider } from 'react-redux';
import { store } from '../../store/index';
import { withHistory } from '../mock-component/mock-component';
import { CardsListComponent } from './cards-list';
import { mockOffer } from '../../mock-test/mock-offer/mock-offer';
import { render, screen } from '@testing-library/react';
import { LoadingComponent } from '../loading-component/loading-component';

describe('component: CardList', () => {
  const isLoadingOffers = true;

  it('should render correctly', () => {
    const expectedData = 'card-list';
    const preparedComponent = withHistory(
      <Provider store={store}>
        {isLoadingOffers ? <CardsListComponent offers={[mockOffer]}/> : <LoadingComponent/>}
      </Provider>
    );

    render(preparedComponent);

    expect(screen.getByTestId(expectedData)).toBeInTheDocument();
  });
});
