import { Provider } from 'react-redux';
import { store } from '../../store/store-index';
import { withHistory } from '../mock-component/mock-component';
import { render, screen } from '@testing-library/react';
import { HeaderComponent } from './header';

describe('component: Header', () => {
  it('should render correctly', () => {
    const expectedText = 'Каталог';

    const preparedComponent = withHistory(
      <Provider store={store}>
        <HeaderComponent />
      </Provider>
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
