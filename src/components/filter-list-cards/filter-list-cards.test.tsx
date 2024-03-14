import { Provider } from 'react-redux';
import { store } from '../../store/index';
import { withHistory } from '../mock-component/mock-component';
import { render, screen } from '@testing-library/react';
import { FilterListCardsComponent } from './filter-list-cards';
import { mockOffer } from '../../mock-test/mock-offer/mock-offer';

describe('component: FilterListCards', () => {
  it('should render correctly', () => {
    const expectedText = 'Фильтр';

    const preparedComponent = withHistory(
      <Provider store={store}>
        <FilterListCardsComponent offers={[mockOffer]} dataPriceMinMax={[mockOffer]}/>
      </Provider>
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
