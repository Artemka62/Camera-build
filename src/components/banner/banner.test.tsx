import { render, screen} from '@testing-library/react';
import { BannerComponent } from './banner';
import { withHistory } from '../mock-component/mock-component';
import { Provider } from 'react-redux';
import { store } from '../../store';

describe('component: Banner', () => {
  it('should render correctly', () => {
    const expectedText = 'banner';
    const preparedComponent = withHistory(
      <Provider store={store}>
        <BannerComponent/>
      </Provider>
    );

    render(preparedComponent);

    expect(screen.getByTestId(expectedText)).toBeInTheDocument();
  });
});

