import { Provider } from 'react-redux';
import { store } from '../../store/store-index';
import { withHistory } from '../mock-component/mock-component';
import { render, screen } from '@testing-library/react';
import { EmptyMessageComponent } from './evpty-message';

describe('component: CardList', () => {

  it('should render correctly', () => {
    const expectedText = 'По вашему запросу ничего не найдено';
    const preparedComponent = withHistory(
      <Provider store={store}>
        <EmptyMessageComponent/>
      </Provider>
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
