import { render, screen} from '@testing-library/react';
import { LogotypeComponent } from './logotype';
import { withHistory } from '../mock-component/mock-component';

describe('component: Logotype', () => {
  it('should render correctly', () => {
    const expectedText = 'logotype';
    const preparedComponent = withHistory(<LogotypeComponent/>);

    render(preparedComponent);

    expect(screen.getByTestId(expectedText)).toBeInTheDocument();
  });
});
