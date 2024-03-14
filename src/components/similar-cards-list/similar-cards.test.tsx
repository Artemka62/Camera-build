import { Provider } from 'react-redux';
import { store } from '../../store/index';
import { withHistory } from '../mock-component/mock-component';
import { render, screen } from '@testing-library/react';
import { SimilarCardsListComponent } from './similar-cards-list';
import { mockOffer } from '../../mock-test/mock-offer/mock-offer';

describe('component: SimilarCardsList', () => {
  it('should render correctly', () => {
    const expectedData = 'similar-cards';

    const preparedComponent = withHistory(
      <Provider store={store}>
        <SimilarCardsListComponent offers={[mockOffer]}/>
      </Provider>
    );

    render(preparedComponent);

    expect(screen.getByTestId(expectedData)).toBeInTheDocument();
  });
});
