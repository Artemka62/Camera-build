import { Provider } from 'react-redux';
import { store } from '../../store/store-index';
import { withHistory } from '../mock-component/mock-component';
import { render, screen } from '@testing-library/react';
import { ModalWindowDeleteProductComponent } from './modal-window-delete-product';

describe('component: ModalWindowDeleteProductComponent', () => {
  it('should render correctly', () => {
    const expectedText = 'Удалить этот товар?';

    const preparedComponent = withHistory(
      <Provider store={store}>
        <ModalWindowDeleteProductComponent/>
      </Provider>
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
