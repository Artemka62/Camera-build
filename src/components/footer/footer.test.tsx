import { Provider } from 'react-redux';
import { store } from '../../store/index';
import { withHistory } from '../mock-component/mock-component';
import { render, screen } from '@testing-library/react';
import { FooterComponent } from './footer';

describe('component: Footer', () => {
  it('should render correctly', () => {
    const expectedText = 'Интернет-магазин фото- и видеотехники';

    const preparedComponent = withHistory(
      <Provider store={store}>
        <FooterComponent />
      </Provider>
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
