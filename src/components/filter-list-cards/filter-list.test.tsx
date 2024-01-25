import { Provider } from 'react-redux';
import { store } from '../../store';
import { withHistory } from '../mock-component/mock-component';
import { render, screen } from '@testing-library/react';
import { FilterListCardsComponent } from './filter-list-cards';

describe('component: FilterListCards', () => {
  it('should render correctly', () => {
    const expectedText = 'Фильтр';
    const preparedComponent = withHistory(
      <Provider store={store}>
        <FilterListCardsComponent />
      </Provider>
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
