import { Provider } from 'react-redux';
import { store } from '../../store';
import { withHistory } from '../mock-component/mock-component';
import { render, screen } from '@testing-library/react';
import { StarsRatingComponent } from './stars-rating';
import { DEFAULT_UNIT } from '../../const';


describe('component: StarsRatingComponent', () => {
  it('should render correctly', () => {
    const expectedData = 'stars-rating';
    const preparedComponent = withHistory(
      <Provider store={store}>
        <StarsRatingComponent rating={DEFAULT_UNIT} reviewCount={DEFAULT_UNIT}/>
      </Provider>
    );

    render(preparedComponent);

    expect(screen.getByTestId(expectedData)).toBeInTheDocument();
  });
});
