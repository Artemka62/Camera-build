import { Provider } from 'react-redux';
import { store } from '../../store';
import { withHistory } from '../mock-component/mock-component';
import { render, screen } from '@testing-library/react';
import { LoadingComponent } from './loading-component';


describe('component: Loading', () => {
  it('should render correctly', () => {
    const expectedText = 'Loading...';
    const preparedComponent = withHistory(
      <Provider store={store}>
        <LoadingComponent />
      </Provider>
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
