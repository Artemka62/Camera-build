import { Provider } from 'react-redux';
import { store } from '../../store/store-index';
import { withHistory } from '../mock-component/mock-component';
import { render, screen } from '@testing-library/react';
import { SortListCardsComponent } from './sort-list-cards';

describe('component: SortListCards', () => {
  it('should render correctly', () => {
    const expectedText = 'Сортировать:';

    const preparedComponent = withHistory(
      <Provider store={store}>
        <SortListCardsComponent/>
      </Provider>
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
