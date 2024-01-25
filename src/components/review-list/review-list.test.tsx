import { Provider } from 'react-redux';
import { store } from '../../store';
import { withHistory } from '../mock-component/mock-component';
import { render, screen } from '@testing-library/react';
import { ReviewListComponent } from './review-list';

describe('component: ReviewList', () => {
  it('should render correctly', () => {
    const expectedText = 'Оставить свой отзыв';
    const preparedComponent = withHistory(
      <Provider store={store}>
        <ReviewListComponent/>
      </Provider>
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
