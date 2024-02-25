import { Provider } from 'react-redux';
import { store } from '../../store/store-index';
import { withHistory } from '../mock-component/mock-component';
import { render, screen } from '@testing-library/react';
import { PaginationMainPageComponent } from './pagination-main-page';
import { DEFAULT_NULL, DEFAULT_UNIT } from '../../src-const';

describe('component: PaginationMainPage', () => {

  it('should render correctly', () => {
    const expectedData = 'pagination-main-page';

    const preparedComponent = withHistory(
      <Provider store={store}>
        <PaginationMainPageComponent
          offersPerPages={DEFAULT_UNIT}
          totalOffers={DEFAULT_UNIT}
          currentPage={DEFAULT_NULL}
        />
      </Provider>
    );

    render(preparedComponent);

    expect(screen.getByTestId(expectedData)).toBeInTheDocument();
  });
});
