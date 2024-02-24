import {render, screen} from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import { AppRoute} from '../../src-const';
import { App } from './app';
import { withHistory, withStore } from '../mock-component/mock-component';
import { useMakeFakeStore } from '../../use-hooks/use-hook-mock';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render "MainPage" when user navigates to "/"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, useMakeFakeStore());
    const expectData = 'main-page';
    const expectedText = 'Каталог фото- и видеотехники';
    mockHistory.push(AppRoute.Main);

    render(withStoreComponent);

    expect(screen.getByTestId(expectData)).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
  it('should render "Product-page" when user navigates to "/product"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, useMakeFakeStore());
    const expectedText = 'Главная';
    const expectData = 'product-page';
    mockHistory.push(`${AppRoute.Product}/2/description`);

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByTestId(expectData)).toBeInTheDocument();
  });
  it('should render "Basket-page" when user navigates to "/basket"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, useMakeFakeStore());
    const expectedText = 'Главная';
    const expectData = 'basket-page';
    mockHistory.push(`${AppRoute.Basket}`);

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByTestId(expectData)).toBeInTheDocument();
  });
  it('should render "ErrorPage" when user navigates to "/unknown-route"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, useMakeFakeStore());
    const expectData = 'error-page';
    const expectedText = '404 Not Found';
    mockHistory.push('/unknown-route');

    render(withStoreComponent);

    expect(screen.getByTestId(expectData)).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
