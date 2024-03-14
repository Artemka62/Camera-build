import { Provider } from 'react-redux';
import { store } from '../../store/index';
import { render, screen } from '@testing-library/react';
import { withHistory } from '../../components/mock-component/mock-component';
import { MainPage } from './page-main';


describe('component: MainPage', () => {
  it('should render correctly', () => {
    const expectedData = 'main-page';
    const preparedComponent = withHistory(
      <Provider store={store}>
        <MainPage title={''}/>
      </Provider>
    );

    render(preparedComponent);

    expect(screen.getByTestId(expectedData)).toBeInTheDocument();
  });
});
