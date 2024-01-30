import { Provider } from 'react-redux';
import { store } from '../../store/store-index';
import { withHistory } from '../mock-component/mock-component';
import { render, screen } from '@testing-library/react';
import { ModalWindowComponent } from './modal-window-list';

describe('component: ModalWindow', () => {
  it('should render correctly', () => {
    const expectedData = 'modal-window';
    const preparedComponent = withHistory(
      <Provider store={store}>
        <ModalWindowComponent/>
      </Provider>
    );

    render(preparedComponent);

    expect(screen.getByTestId(expectedData)).toBeInTheDocument();
  });
});
