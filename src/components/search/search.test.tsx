import { Provider } from 'react-redux';
import { store } from '../../store/store-index';
import { withHistory } from '../mock-component/mock-component';
import { render, screen } from '@testing-library/react';
import { SearchComponent } from './search';

describe('component: PaginationMainPage', () => {

  it('should render correctly', () => {
    const expectedData = 'search-component';
    const preparedComponent = withHistory(
      <Provider store={store}>
        <SearchComponent/>
      </Provider>
    );

    render(preparedComponent);

    expect(screen.getByTestId(expectedData)).toBeInTheDocument();
  });
});
