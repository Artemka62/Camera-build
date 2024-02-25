import { Provider } from 'react-redux';
import { store } from '../../store/store-index';
import { withHistory } from '../mock-component/mock-component';
import { render, screen } from '@testing-library/react';
import { SearchListComponent } from './search-list';
import { mockOffer } from '../../mock-test/mock-offer/mock-offer';
import { DEFAULT_UNIT } from '../../src-const';

describe('component: SearchListComponent', () => {
  const onFocus = (number: number) => {
    number = number + DEFAULT_UNIT;

    return number;
  };

  it('should render correctly', () => {
    const expectedData = 'search-list-component';

    const preparedComponent = withHistory(
      <Provider store={store}>
        <SearchListComponent offer={mockOffer} inFocus={false} onFocus={onFocus} index={DEFAULT_UNIT} id={DEFAULT_UNIT}/>
      </Provider>
    );

    render(preparedComponent);

    expect(screen.getByTestId(expectedData)).toBeInTheDocument();
  });
});
