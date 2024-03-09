import { Provider } from 'react-redux';
import { store } from '../../store/store-index';
import { withHistory } from '../mock-component/mock-component';
import { render, screen } from '@testing-library/react';
import { ModalWindowOrderComponent } from './modal-window-order';

describe('component: ModalWindowOrderComponent', () => {
  it('should render correctly', () => {
    const expectedText = 'Вернуться к покупкам';

    const preparedComponent = withHistory(
      <Provider store={store}>
        <ModalWindowOrderComponent/>
      </Provider>
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
