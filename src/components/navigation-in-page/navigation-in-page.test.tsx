import { Provider } from 'react-redux';
import { store } from '../../store';
import { withHistory } from '../mock-component/mock-component';
import { render, screen } from '@testing-library/react';
import { NavigationInPageComponent } from './navigation-in-page';

describe('component: NavigationInPage', () => {
  it('should render correctly', () => {
    const expectedData = 'navigation-in-page';
    const preparedComponent = withHistory(
      <Provider store={store}>
        <NavigationInPageComponent/>
      </Provider>
    );

    render(preparedComponent);

    expect(screen.getByTestId(expectedData)).toBeInTheDocument();
  });
});
