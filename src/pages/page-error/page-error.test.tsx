import { Provider } from 'react-redux';
import { store } from '../../store/store-index';
import { render, screen } from '@testing-library/react';
import { withHistory } from '../../components/mock-component/mock-component';
import { ErrorPage } from './page-error';

describe('component: ErrorPage', () => {
  it('should render correctly', () => {
    const expectedData = 'error-page';
    const preparedComponent = withHistory(
      <Provider store={store}>
        <ErrorPage title={''}/>
      </Provider>
    );

    render(preparedComponent);

    expect(screen.getByTestId(expectedData)).toBeInTheDocument();
  });
});
