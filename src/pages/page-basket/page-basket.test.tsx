import { Provider } from 'react-redux';
import { store } from '../../store/store-index';
import { render, screen } from '@testing-library/react';
import { withHistory } from '../../components/mock-component/mock-component';
import { BasketPage } from './page-basket';

describe('component: BasketPage', () => {
  it('should render correctly', () => {
    const expectedData = 'basket-page';
    const preparedComponent = withHistory(
      <Provider store={store}>
        <BasketPage title={''}/>
      </Provider>
    );

    render(preparedComponent);

    expect(screen.getByTestId(expectedData)).toBeInTheDocument();
  });
});
