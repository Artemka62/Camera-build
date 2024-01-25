
import { render, screen} from '@testing-library/react';
import { withHistory } from '../mock-component/mock-component';
import { ButtonChangePage } from './button-change-page';
import { DEFAULT_NULL, DEFAULT_UNIT } from '../../const';

function handleClickButton(numberPage: number) {
  return numberPage;
}

describe('component: ButtonChange', () => {
  it('should render correctly', () => {
    const expectedText = 'button-change-page';
    const preparedComponent = withHistory(<ButtonChangePage callbackPaginate={() => handleClickButton(DEFAULT_UNIT - DEFAULT_NULL)} currentPage={DEFAULT_UNIT} nameButton={'back'}/>);

    render(preparedComponent);

    expect(screen.getByTestId(expectedText)).toBeInTheDocument();
  });
});

