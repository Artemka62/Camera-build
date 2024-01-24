import {render, screen} from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import { AppRoute } from '../../const';
import { App } from './app';
import { withStore } from '../mock-component/mock-component';
import { makeFakeStore } from '../../hooks/mock';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render "MainPages" when user navigates to "/"', () => {
    const {withStoreComponent} = withStore(<App />, makeFakeStore());
    const expectData = 'main-page';
    const expectedText = 'Каталог фото- и видеотехники';
    mockHistory.push(AppRoute.Main);

    render(withStoreComponent);

    expect(screen.getByTestId(expectData)).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
