import { render, screen} from '@testing-library/react';
import { withHistory } from '../mock-component/mock-component';
import { ButtonChangePage } from './button-change-page';
import { DEFAULT_UNIT } from '../../src-const';

describe('component: ButtonChange', () => {
  it('should render correctly', () => {
    const expectedText = 'button-change-page';
    const preparedComponent = withHistory(
      <ButtonChangePage
        lastPage={DEFAULT_UNIT}
        nameButton={'back'}
      />);

    render(preparedComponent);

    expect(screen.getByTestId(expectedText)).toBeInTheDocument();
  });
});


