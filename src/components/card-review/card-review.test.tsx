import { render, screen} from '@testing-library/react';
import { withHistory } from '../mock-component/mock-component';
import { Provider } from 'react-redux';
import { store } from '../../store/index';
import { CardReviewComponent } from './card-review';
import { mockReview } from '../../mock-test/mock-review/mock-review';

describe('component: CardReviewProduct', () => {
  it('should render correctly', () => {
    const expectData = 'card-review';
    const expectedText = 'Достоинства:';

    const preparedComponent = withHistory(
      <Provider store={store}>
        <CardReviewComponent review={mockReview}/>
      </Provider>
    );

    render(preparedComponent);

    expect(screen.getByTestId(expectData)).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
