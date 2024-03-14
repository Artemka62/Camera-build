import { Provider } from 'react-redux';
import { store } from '../../store/index';
import { withHistory } from '../mock-component/mock-component';
import { render, screen } from '@testing-library/react';
import { ToastifyComponent } from './toastify';

describe('component: ToastifyComponent', () => {
  it('should render correctly', () => {
    const expectedData = 'toastify-component';

    const preparedComponent = withHistory(
      <Provider store={store}>
        <ToastifyComponent/>
      </Provider>
    );

    render(preparedComponent);

    expect(screen.getByTestId(expectedData)).toBeInTheDocument();
  });
});
