import { Provider } from 'react-redux';
import { store } from '../../store/index';
import { render, screen } from '@testing-library/react';
import { ProductPage } from './page-product';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../src-const';

describe('component: ProductPage', () => {
  it('should render correctly', () => {
    const expectedData = 'product-page';

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`${AppRoute.Product}/2/description`]}>
          <Routes>
            <Route path={`${AppRoute.Product}/:id/:tab`} element ={<ProductPage title={''} />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId(expectedData)).toBeInTheDocument();
  });
});
